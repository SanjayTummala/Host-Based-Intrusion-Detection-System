# 🛡️ Host-Based Intrusion Detection System (HIDS)

A real-world **Host-Based Intrusion Detection System (HIDS)** with an interactive dashboard that visualizes how attacks are simulated, detected at the host level, classified by severity, and escalated for response.

This project focuses on **clarity, realism, and completeness**, showing not only what a HIDS does, but how it behaves inside an organization.

---

## 🌐 Overview

The Host-Based Intrusion Detection System (HIDS) monitors **host-level activities**, including:

- File access and modification  
- Process execution  
- Login and authentication attempts  
- Outbound network connections  

Detected events are analyzed, assigned severity levels, and presented through a **modern, animated security dashboard**.

The system is designed to resemble how a **Security Operations Center (SOC)** views host-based threats in practice.

---

## ✨ Key Features

- 🔐 Host-based attack simulation  
- 📊 Live alert generation  
- 🧭 Visual attack → detection → response flow  
- 🟢🟠🔴 Severity classification (Low / Medium / High)  
- 🗂️ Persistent saved logs  
- 🎥 Animated HIDS traffic visualization  

**Clear separation of components:**
- External attacker  
- Organization hosts  
- HIDS detection system  
- Security admin response  

---

## 🖥️ Dashboard Sections

### 1️⃣ Attack Simulation

Trigger simulated host-level attacks and instantly observe:

- New events  
- Alert counts  
- Severity changes  
- Live alert table updates  

Represents **active monitoring during an attack window**.

---

### 2️⃣ Saved Logs

- Snapshot of historical HIDS logs  
- Logs grouped by severity  
- Mimics post-incident analysis  
- Helps understand attack patterns over time  

---

### 3️⃣ HIDS Animation

A visual explanation of how a Host-Based IDS works:

1. External attacker generates malicious activity  
2. Organization hosts produce host-level events  
3. HIDS sensor analyzes logs  
4. Security admin receives classified alerts  

This section is intentionally visual to make security behavior easy to understand.

---

## ⚙️ Technology Stack

### Frontend

| Technology | Purpose |
|-----------|---------|
| React | UI & component architecture |
| CSS | Custom animations and layout |
| GitHub Pages | Frontend deployment |

### Backend

| Technology | Purpose |
|-----------|---------|
| Python | Core detection logic |
| REST API | Event & alert handling |
| Database | Persistent log storage |
| Render | Backend deployment |

---

## 🧠 Design Philosophy

This project was built with the idea that **security should be understandable**, not hidden behind raw logs.

- Visual explanations over raw numbers  
- Clear flow over complexity  
- Realistic behavior over theoretical examples  

Every section is designed to explain **how HIDS works in practice**.

---

## 👨‍💻 Developed By

**Sanjay Kumar**

This project represents focused effort on:

- Security fundamentals  
- System design  
- Visual clarity  
- Real-world behavior  

---

## ⭐ Support

If you find this project useful:

- ⭐ Star the repository  
- 🍴 Fork and experiment  
- 🧠 Learn from it  
- 🔧 Improve it  
