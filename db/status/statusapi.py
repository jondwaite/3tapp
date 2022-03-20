#!/usr/bin/env python

import os
import flask
import subprocess
import socket
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
    return delay if delay else False

port = os.environ['PORT']

app = flask.Flask(__name__)
app.config["DEBUG"] = False

# Use .env file to get hostnames for each component:
load_dotenv()
db_host = os.getenv('DB_HOSTNAME')
app_host = os.getenv('APP_HOSTNAME')
web_host = os.getenv('WEB_HOSTNAME')

@app.route('/', methods=['GET'])
def home():

    respvalues = {}

    respvalues["uptime"] = uptime()
    respvalues["db_running"] = True if ServiceMonitor('mariadb').is_active() else False
    respvalues["tcp_3306_open"] = checktcpconnection(db_host,3306)
    db_ping = pingcheck(db_host)
    respvalues["db_ping_ms"] = db_ping if db_ping else False
    app_ping = pingcheck(app_host)
    respvalues["app_ping_ms"] = app_ping if app_ping else False
    web_ping = pingcheck(web_host)
    respvalues["web_ping_ms"] = web_ping if web_ping else False

    response = flask.make_response(
        flask.jsonify(
            {"status": respvalues}
        ),200
    )
    response.headers["Content-Type"] = "application/json"
    return response

app.run(host='0.0.0.0', port=port)
