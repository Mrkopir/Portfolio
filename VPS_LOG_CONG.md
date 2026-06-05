# Logging Configuration

I configured basic logging on the server using `systemd-journald`, `rsyslog`, and `logrotate`.

During this step, I configured possible log storage limits in `journald`, checked the `rsyslog` configuration for collecting and storing system logs, and reviewed `logrotate` settings to make sure old logs are rotated automatically and do not take too much disk space.

As a result, the server has basic log collection, storage control, and automatic log rotation configured.
