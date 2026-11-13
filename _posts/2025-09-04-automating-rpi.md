---
date: 2025-08-26
published: true
author: Richard
tags:
  - Raspberry Pi
  - Automation
  - Startup Script
  - systemd
  - crontab
  - rc.local
  - Linux
  - Python
  - Node.js
  - Tutorial
  - How-to
  - systemctl
  - Scripting
  - Terminal
  - Service Manager
key_points:
  - "There are multiple methods to automate a Raspberry Pi to run a program automatically upon boot, including using systemd, crontab, and rc.local."
  - "Systemd is a service manager that allows you to create a service to run your program automatically at startup, with the ability to manage it using the 'systemctl' command."
  - "The 'crontab' utility enables scheduling your program to run at specific times, allowing you to define when and how your script should be executed."
  - "The '/etc/rc.local' file can be used to run your program automatically at startup by adding the command to execute your script before the 'exit 0' line."
  - "Automating a script with systemd involves creating a service file, configuring it to execute your script, enabling it to start on boot, and managing it using the 'systemctl' command."
title: "How to Run a Script Automatically When Your Raspberry Pi Boots"
image: /assets/images/raspberrypi.png
image_alt: "Cover image for How to Run a Script Automatically When Your Raspberry Pi Boots"
series: "Raspberry Pi Setup"
series_part: 3
category: "IoT & Hardware"
---
There are several ways to automate a Raspberry Pi to run a program automatically without needing to start it manually from the terminal. Whether you're using Python, Node.js, or another language, the following methods can help you ensure that your script runs whenever your Raspberry Pi boots up.

### Methods to Automate Script Execution

1. **Using systemd:**

- `systemd` is a service manager that allows you to create a service to run your program automatically at startup.
- You'll need to create a service file in the `/etc/systemd/system` directory and configure it to execute your script.
- Once the service file is set up, you can manage it using the `systemctl` command to start, stop, and check the status of the service.

2. **Using crontab:**

- The `crontab` utility allows you to schedule your program to run at specific times.
- You can edit the `crontab` file and add an entry that defines when and how your script should be executed.

3. **Using rc.local:**

- You can use the `/etc/rc.local` file to run your program automatically at startup.
- Simply add the command to execute your script before the `exit 0` line in the `rc.local` file.

### Example: Automating a Script with systemd

Let's look at an example of how you can automate a Node.js or Python script using a `systemd` service file.

#### Step 1: Create a Service File

Create a new service file with the following command:

```bash
sudo nano /etc/systemd/system/myscript.service
```

#### Step 2: Add the Following Content to the Service File

Replace the paths and script names as needed for your setup. Paste this inside the nano editor.

```ini
[Unit]
Description=My Script Service

[Service]
ExecStart=/usr/bin/node /path/to/your/script.js
# Or for Python:
# ExecStart=/usr/bin/python3 /path/to/your/script.py
Restart=always
User=root

[Install]
WantedBy=multi-user.target
```

To exit nano after pasting use `ctrl+x` choose **yes (Y)** when asked to save modified buffer. Hit the **Enter** key to confirm the file name and you should be back in the terminal.

#### Step 3: Reload systemd Configuration

Reload the `systemd` configuration to apply your changes:

```bash
sudo systemctl daemon-reload
```

#### Step 4: Enable the Service

Enable the service to start on boot:

```bash
sudo systemctl enable myscript.service
```

#### Step 5: Start the Service

Start the service manually to test it:

```bash
sudo systemctl start myscript.service
```

### Monitoring and Managing Your Service

Now your script should start automatically when the Raspberry Pi boots up and will continue running in the background. You can use the following commands to manage your service:

- Check the status:

```bash
  sudo systemctl status myscript.service
```

- Stop the service:

```bash
  sudo systemctl stop myscript.service
```

- Restart the service:

```bash
  sudo systemctl restart myscript.service
```
