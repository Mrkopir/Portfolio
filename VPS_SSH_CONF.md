# SSH Configuration and Basic Hardening

This document describes the initial SSH configuration performed on my Azure VPS Portfolio.

## Goal

The goal of this step was to configure secure SSH access to the VPS and better understand how SSH authentication works in a real server environment.

## What was configured

I worked with the following SSH-related concepts:

* SSH key-based authentication;
* public and private SSH keys;
* `ssh-agent`;
* SSH connection using a specific identity file;
* basic SSH server hardening;
* editing OpenSSH server configuration;
* testing SSH access after configuration changes.

## SSH Key Authentication

Instead of using password-based login, the server is configured to use SSH public key authentication.

Example connection:

```bash
ssh -i ~/.ssh/<file> <my login>@SERVER_IP
```

The private key stays on the local machine, while the public key is added to the server.

## ssh-agent

I also practiced using `ssh-agent`, which allows storing unlocked private keys in memory during the current session.

Basic commands:

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
ssh-add -l
```

After adding the key to the agent, SSH can use it without manually specifying the key every time.

## SSH Hardening Configuration

A custom SSH hardening configuration was added to improve the default server setup.

Example configuration:

```sshconfig
PasswordAuthentication no
PubkeyAuthentication yes
PermitRootLogin no
MaxAuthTries 3
LoginGraceTime 30
X11Forwarding no
```

## Explanation

### PasswordAuthentication no

Disables password-based SSH login.
This reduces the risk of brute-force password attacks.

### PubkeyAuthentication yes

Enables authentication using SSH keys.

### PermitRootLogin no

Disables direct SSH login as the `root` user.
Administration should be done through a regular user with `sudo` permissions.

### MaxAuthTries 3

Limits the number of authentication attempts per connection.

### LoginGraceTime 30

Limits the amount of time a user has to successfully authenticate.

### X11Forwarding no

Disables X11 forwarding because it is not needed for this server.

## Important Safety Note

Before applying SSH configuration changes, it is important to keep an existing SSH session open and test a new connection from another terminal.

This helps avoid losing access to the server if the SSH configuration contains an error.

## Current Status

SSH access is configured and basic SSH hardening has been applied.
