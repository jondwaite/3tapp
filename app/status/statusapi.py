#!/usr/bin/env python

import os
import flask
from flask_cors import CORS
import subprocess
import socket
import time
from ping3 import ping
from dotenv import load_dotenv

# pip3 install list:
# - Flask
# - ping3
# - python-dotenv

# Class to check the status of a systemd service unit:
class ServiceMonitor(object):

    def __init__(self, service):
        self.service = service

    def is_active(self):
        cmd = '/bin/systemctl status %s.service' % self.service
        proc = subprocess.Popen(cmd, shell=True,stdout=subprocess.PIPE,encoding='utf8')
        stdout_list = proc.communicate()[0].split('\n')
        for line in stdout_list:
            if 'Active:' in line:
                if '(running)' in line:
                    return True
        return False

# Returns True if the given host can be connected on the given port
def checktcpconnection(host, port):
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(1)
    result = sock.connect_ex((host,port))
    if result == 0:
        return True
    else:
        return False

# Returns uptime of the system formatted nicely:
def uptime():
    status,result = subprocess.getstatusoutput("uptime -p")
    return result

# Ping test - NOTE: only waits for 100ms (1/10th second) for response - may not work in all networks
def pingcheck(host):
    delay = ping(host, timeout=0.1, unit='ms')
    if delay:
        if (delay < 1):
            return "<1 ms"
        elif (delay < 1000):
            return str(int(delay)) + ' ms'
        else:
            return str(int(delay/1000)) + ' s'
    else:
        return False

# Test if hostname resolves:
def hostname_resolves(hostname):
    try:
        socket.gethostbyname(hostname)
        return True
    except socket.error:
        return False

def reset_dns_cache():
    cmd = '/usr/bin/systemd-resolve --flush-caches'
    proc = subprocess.Popen(cmd, shell=True,stdout=subprocess.PIPE,encoding='utf8')

port = os.environ['PORT']

app = flask.Flask(__name__)
app.config["DEBUG"] = False
CORS(app)

# Use .env file to get hostnames for each component:
load_dotenv()
db_host = os.getenv('DB_HOSTNAME')
app_host = os.getenv('APP_HOSTNAME')
web_host = os.getenv('WEB_HOSTNAME')

# Make sure all our hosts are available in DNS before proceeding:
while not (hostname_resolves(db_host)):
    time.sleep(5)
    reset_dns_cache()

while not (hostname_resolves(app_host)):
    time.sleep(5)
    reset_dns_cache()

while not (hostname_resolves(web_host)):
    time.sleep(5)
    reset_dns_cache()

@app.route('/', methods=['GET'])
def home():

    respvalues = {}

    respvalues["role"] = 'app'
    respvalues["uptime"] = uptime()
    respvalues["3tapp_app_running"] = True if ServiceMonitor('3tapp-app').is_active() else False
    respvalues["app_3002_open"] = checktcpconnection(app_host,3002)
    respvalues["db_3306_open"] = checktcpconnection(db_host,3306)
    respvalues["web_80_open"] = checktcpconnection(web_host,80)
    respvalues["web_3000_open"] = checktcpconnection(web_host,3000)
    db_ping = pingcheck(db_host)
    respvalues["db_ping"] = db_ping if db_ping else False
    app_ping = pingcheck(app_host)
    respvalues["app_ping"] = app_ping if app_ping else False
    web_ping = pingcheck(web_host)
    respvalues["web_ping"] = web_ping if web_ping else False

    response = flask.make_response(
        flask.jsonify(
            {"status": respvalues}
        ),200
    )
    response.headers["Content-Type"] = "application/json"
    return response

app.run(host='0.0.0.0', port=port)
