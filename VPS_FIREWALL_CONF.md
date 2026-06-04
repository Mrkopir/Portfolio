# UFW Firewall Basic Configuration

This document describes the basic UFW firewall configuration applied on my Azure VPS.

## Goal

The goal of this step was to enable a basic firewall and allow only the necessary public ports for server administration and web traffic.

UFW was used because it provides a simple way to manage firewall rules on Ubuntu Server.

## Commands Used

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable