#  Live Log Analyzer

A real-time, event-driven log monitoring system built with Node.js.

It continuously watches a log file, detects important patterns like SQL injections or failed logins, alerts on spikes of errors, and saves high-priority events to a persistent alert log — just like production-grade observability systems (Logstash, Datadog, Splunk).

---

##  Features

✅ Real-time log monitoring using Node streams
✅ Pattern detection for:
  - SQL injection attempts
  - Login failures
  - Suspicious paths (e.g., `/admin`, `/etc/passwd`)
✅ Error spike detection: 10+ `[ERROR]` logs within 60 seconds
✅ Persistent alert logging to `alerts/security.log`
✅ Modular, scalable structure
✅ DEMO mode for instant simulation

---

##  Tech Stack

- Node.js (built-in modules: `fs`, `readline`, `events`, `path`)
- Event-driven architecture
- Regex-based rule engine
- File streaming + time-window detection

---

##  Project Structure

![image](https://github.com/user-attachments/assets/c6449f8a-d2af-431e-a697-e62134d29be0)


---

## 💻 How to Run

```bash
npm install
node server.js


Append some lines to logs/system.log manually:
[INFO] App started
[ERROR] login failed
[INFO] SELECT * FROM users

---

##  DEMO Mode (Recommended for Reviewers)
```bash
node server.js --demo
