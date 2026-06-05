# Fail2Ban Configuration

This document describes the Fail2Ban configuration applied on my Azure VPS.

## Goal

The goal of this step was to add basic protection against repeated failed SSH login attempts.

Fail2Ban monitors authentication logs and automatically blocks IP addresses that generate too many failed login attempts within a defined time window.

## Why Fail2Ban

Even if SSH key authentication is enabled and password login is disabled, public SSH servers are constantly scanned by bots.

Fail2Ban adds an additional defensive layer by detecting suspicious login behavior and temporarily banning attacking IP addresses.

## Installation

Fail2Ban was installed using the Ubuntu package manager:

```bash
sudo apt update
sudo apt install fail2ban -y
```

The service was enabled and started:

```bash
sudo systemctl enable --now fail2ban
```

## Configuration File

Instead of editing the default `jail.conf` file, a local override file was created:

```bash
sudo nano /etc/fail2ban/jail.local
```

## SSH Jail Configuration

The following configuration was added:

```ini
[DEFAULT]
bantime = 1h
findtime = 10m
maxretry = 3
backend = systemd

[sshd]
enabled = true
port = ssh
logpath = %(sshd_log)s
```

## Configuration Explanation

### bantime

```ini
bantime = 1h
```

Defines how long an IP address will stay banned.

In this configuration, the ban duration is one hour.

### findtime

```ini
findtime = 10m
```

Defines the time window Fail2Ban uses to count failed attempts.

In this configuration, Fail2Ban checks failed attempts within the last 10 minutes.

### maxretry

```ini
maxretry = 3
```

Defines how many failed attempts are allowed before banning an IP address.

In this configuration, an IP address is banned after 3 failed attempts.

### backend

```ini
backend = systemd
```

Configures Fail2Ban to read logs from the systemd journal.

This is useful on modern Ubuntu systems where authentication logs are often handled through `journalctl`.

### sshd jail

```ini
[sshd]
enabled = true
```

Enables the Fail2Ban jail for the OpenSSH server daemon.

The `sshd` jail protects the SSH service by monitoring failed authentication attempts.

## Restarting Fail2Ban

After changing the configuration, Fail2Ban was restarted:

```bash
sudo systemctl restart fail2ban
```

## Checking Fail2Ban Status

General Fail2Ban status:

```bash
sudo fail2ban-client status
```

SSH jail status:

```bash
sudo fail2ban-client status sshd
```

Example output:

```text
Status for the jail: sshd
|- Filter
|  |- Currently failed: 0
|  |- Total failed: 0
`- Actions
   |- Currently banned: 0
   |- Total banned: 0
```

## Checking Fail2Ban Logs

Fail2Ban logs can be checked with:

```bash
sudo tail -f /var/log/fail2ban.log
```

SSH logs can be checked with:

```bash
sudo journalctl -u ssh
```

Live SSH logs:

```bash
sudo journalctl -u ssh -f
```

## Manually Unbanning an IP

If an IP address is banned by mistake, it can be unbanned manually:

```bash
sudo fail2ban-client set sshd unbanip IP_ADDRESS
```

Example:

```bash
sudo fail2ban-client set sshd unbanip 123.123.123.123
```

## Current Status

Fail2Ban is installed, enabled, and configured to protect the SSH service.

Current SSH protection stack:

```text
SSH key authentication
Password login disabled
Root login disabled
UFW firewall enabled
Fail2Ban enabled for sshd
```