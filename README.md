


            ┌──────────────────────────┐
            │   External Attacker              │
            │  (Simulated Threats)             │
            └─────────┬────────────────┘
                         │
                         ▼
   ┌────────────────────────────────────────┐
   │        Organization Hosts                          │
   │  • User A   • User B   • User C                    │
   │  • App Server   • Database Server                  │
   │  (Host-level events generated)                     │
   └────────────────┬───────────────────────┘
                         │ Host Logs & Events
                         ▼
   ┌────────────────────────────────────────┐
   │        HIDS Detection Engine                       │
   │  • Event analysis                                  │
   │  • Severity scoring                                │
   │  • Threat classification                           │
   └────────────────┬───────────────────────┘
                         │ Alerts
                         ▼
   ┌────────────────────────────────────────┐
   │        Security Admin Console                      │
   │  • Normal / Suspicious / Critical                  │
   │  • Visual alert dashboard                          │
   └────────────────────────────────────────┘






