app:
    type: Cloud.Machine
    properties:
      image: photonos-4
      flavor: '${input.app_flavor}'
      newName: '${(env.deploymentName)+"-app"}'
      app_pass: null
      db_pass: null
      tags:
        - key: env
          value: '${env.projectName}'
        - key: vmrole
          value: app
        - key: app
          value: '${env.blueprintName}'
        - key: department
          value: '${input.department}'
        - key: deployment
          value: '${env.deploymentName}'
        - key: cost_code
          value: '${input.cost_code}'
        - key: requested_by
          value: '${env.requestedBy}'
      cloudConfig: |
        #cloud-config

        preserve_hostname: false
        hostname: ${(env.deploymentName)+"-app"}
        fqdn: ${(env.deploymentName)+"-app.akl.lab.dpc.datacom.cloud"}
        packages:
          - mariadb
          - git
          - nodejs
          - python3-pip
        users:
          - default
          - name: photon
            shell: /bin/bash
            lock_passwd: False
            ssh_pwauth: True
            sudo: 'ALL=(ALL) NOPASSWD:ALL'
            groups: sudo
            ssh_authorized_keys:
              - ${input.public_ssh_key}
            ssh_quiet_keygen: true
        chpasswd:
          expire: False
          list: |
            photon:${input.password}
        write_files:
          - content: |
              DB_HOSTNAME=${(env.deploymentName)+"-db"}
              APP_HOSTNAME=${(env.deploymentName)+"-app"}
              WEB_HOSTNAME=${(env.deploymentName)+"-web"}
              PROJECT=${env.projectName}
              DEPLOYMENT=${env.deploymentName}
              HOST=${self.newName}
              DB_HOST=${resource.db.address}
              DB_USER=photon
              DB_PASS=${resource.db.db_pass}
              DEPLOY_AT=${env.requestedAt}
              DEPLOY_BY=${env.requestedBy}
              BLUEPRINT_ID=${env.blueprintId}
              BLUEPRINT=${env.blueprintName}
              VERSION=${env.blueprintVersion}
            path: /home/photon/.env
        runcmd:
          - echo "Domains=akl.lab.dpc.datacom.cloud" >> /etc/systemd/resolved.conf
          - systemctl restart systemd-resolved
          - mkdir -p /home/photon/3tapp
          - git clone https://github.com/jondwaite/3tapp /home/photon/3tapp
          - cp /home/photon/3tapp/configs/nginx/app-nginx /etc/nginx/nginx.conf
          - cd /home/photon/3tapp/app/api && npm install -y
          - /usr/bin/pip3 install Flask
          - /usr/bin/pip3 install flask-cors
          - /usr/bin/pip3 install ping3
          - /usr/bin/pip3 install python-dotenv
          - cp /home/photon/.env /home/photon/3tapp/app/api/.env
          - cp /home/photon/.env /home/photon/3tapp/app/status/.env
          - 'find /home/photon/ -type f -exec chown photon:users {} \;'
          - chown photon:users /home/photon -R
          - cp /home/photon/3tapp/configs/systemd/3tapp-app.service /usr/lib/systemd/system
          - cp /home/photon/3tapp/configs/systemd/3tapp-app-status.service /usr/lib/systemd/system
          - systemctl daemon-reload
          - systemctl start 3tapp-app.service
          - systemctl enable 3tapp-app.service
          - systemctl start 3tapp-app-status.service
          - systemctl enable 3tapp-app-status.service
          - /sbin/iptables -A INPUT -p icmp -j ACCEPT
          - /sbin/iptables -A OUTPUT -p icmp -j ACCEPT
          - /sbin/iptables -A INPUT -p tcp -m tcp --dport 3002 -j ACCEPT
          - /sbin/iptables -A INPUT -p tcp -m tcp --dport 3003 -j ACCEPT
          - /sbin/iptables-save > /etc/systemd/scripts/ip4save
          - eject /dev/sr0
      networks:
        - network: '${resource["nsx-t-net"].id}'