#!/usr/bin/bash

# Script to setup/configure the database server node on Photon OS v4 (minimal install)
# MUST be run with system (root) permissions. Reads env file located in current
# directory for values.

# Example .env file:
# USERNAME=photon               // User to be created to run services
# PASSWORD=<password>           // Password to be assigned to this user
# SSHKEY=<ssh key>              // Public key to be added to this user (optional)
# DBUSER=photon                 // Database username to be created in MariaDB
# DBPASS=<db password>          // Password to be used for the database
# DOMAIN=<DNS Domain>           // DNS Domain to be used for name resolution
# DB_HOSTNAME=<hostname or IP address of DB server>
# APP_HOSTNAME=<hostname or IP address of App server>
# WEB_HOSTNAME=<hostname or IP address of Web server>
# PROJECT=<project name>        // Should be one of 'Production', 'Development' or 'Test' for recognition in app
# DEPLOYMENT=<deployment name>  // Should be the 'root' of the hostname (e.g. 'dev01' if the database server is 'dev01-db')

if [ ! -f ./env ]; then
    echo "You must create a file .env in this directory before running this script."
    echo "See comments in db-node.sh for the required entries in this file."
    echo "Exiting"
    exit 1
fi

echo "db-node.sh starting"

source ./.env

tdnf update -y
tdnf install -y mariadb mariadb-server
tdnf install -y wget git python3-pip

# Add search domain to allow hostname resolution to work
echo "Domains=$DOMAIN" >> /etc/systemd/resolved.conf
/usr/bin/systemctl restart systemd-resolved

# Add user account, set password and disable aging:
/usr/sbin/useradd -b /home -G sudo -m -U -s /bin/bash $USERNAME
echo "$USERNAME:$PASSWORD" | /usr/sbin/chpasswd
/usr/bin/chage -m 0 -M 99999 -I -1 -E -1 $USERNAME

# Add SSH key to user's authorized_keys file:
if [[ $SSHKEY ]]; then
    /usr/bin/mkdir -p /home/$USERNAME/.ssh
    /usr/bin/chown $USERNAME:$USERNAME /home/$USERNAME/.ssh
    /usr/bin/chmod 700 /home/$USERNAME/.ssh
    echo $SSHKEY > /home/$USERNAME/.ssh/authorized_keys
    /usr/bin/chown $USERNAME:$USERNAME /home/$USERNAME/.ssh/authorized_keys
    /usr/bin/chmod 600 /home/$USERNAME/.ssh/authorized_keys  
fi

# MariaDB Configuration
/usr/bin/sed '/bind-address/s/^#//' -i /etc/my.cnf.d/server.cnf
/usr/bin/systemctl enable mariadb.service
/usr/bin/systemctl restart mariadb.service

# Firewall rules
/sbin/iptables -A INPUT -p icmp -j ACCEPT
/sbin/iptables -A OUTPUT -p icmp -j ACCEPT
/sbin/iptables -A INPUT -p tcp -m tcp --dport 3306 -j ACCEPT
/sbin/iptables -A INPUT -p tcp -m tcp --dport 3004 -j ACCEPT
/sbin/iptables-save > /etc/systemd/scripts/ip4save

mkdir -p /home/$USERNAME/3tapp
git clone https://github.com/jondwaite/3tapp /home/$USERNAME/3tapp

# Setup f1 database and grab latest dump from ergast.com
while ! /usr/bin/mysqladmin ping --silent &> /dev/null; do sleep 2; done
/usr/bin/mysql -u root -e "CREATE DATABASE f1db;"
/usr/bin/mysql -u root -e "CREATE USER '${DB_USER}'@'%' IDENTIFIED BY '${DB_PASS}';"
/usr/bin/mysql -u root -e "GRANT ALL PRIVILEGES ON f1db.* TO '${DB_USER}'@'%';"
/usr/bin/mysql -u root -e 'FLUSH PRIVILEGES;'
wget http://ergast.com/downloads/f1db.sql.gz -O /home/$USERNAME/f1db.sql.gz --no-check-certificate
/usr/bin/gunzip /home/$USERNAME/f1db.sql.gz
/usr/bin/mysql -u root f1db < /home/$USERNAME/f1db.sql
/usr/bin/rm /home/$USERNAME/f1db.sql

# Write application .env file
echo "USERNAME=$USERNAME" > /home/$USERNAME/.env
echo "PASSWORD=$PASSWORD" >> /home/$USERNAME/.env
echo "SSHKEY=$SSHKEY" >> /home/$USERNAME/.env
echo "DB_HOSTNAME=$DB_HOSTNAME" >> /home/$USERNAME/.env
echo "APP_HOSTNAME=$APP_HOSTNAME" >> /home/$USERNAME/.env
echo "WEB_HOSTNAME=$WEB_HOSTNAME" >> /home/$USERNAME/.env
echo "PROJECT=$PROJECT" >> /home/$USERNAME/.env
echo "DEPLOYMENT=$DEPLOYMENT" >> /home/$USERNAME/.env
echo "HOST=$(hostname -s)" >> /home/$USERNAME/.env
echo "DB_HOST=$(ip route | grep src | awk '{print $NF; exit}')" >> /home/$USERNAME/.env
echo "DB_USER=$DB_USER" >> /home/$USERNAME/.env
echo "DB_PASS=$DB_PASS" >> /home/$USERNAME/.env

# Setup application services and start
/usr/bin/cp /home/$USERNAME/.env /home/$USERNAME/3tapp/db/status/.env
/usr/bin/find /home/$USERNAME/ -type f -exec chown $USERNAME:$USERNAME {} \;
/usr/bin/chown $USERNAME:$USERNAME /home/$USERNAME -R
/usr/bin/pip3 install Flask
/usr/bin/pip3 install flask-cors
/usr/bin/pip3 install ping3
/usr/bin/pip3 install python-dotenv
/usr/bin/cp /home/$USERNAME/3tapp/configs/systemd/3tapp-db-status.service /usr/lib/systemd/system
/usr/bin/systemctl daemon-reload
/usr/bin/systemctl start 3tapp-db-status.service
/usr/bin/systemctl enable 3tapp-db-status.service

echo "db-node.sh completed with exit code 0"
exit 0