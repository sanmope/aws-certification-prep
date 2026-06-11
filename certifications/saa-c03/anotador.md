# Anotador SAA-C03 — Anclas conceptuales

Frases cortas para activar memoria rápida al repasar.

---

## Domain 1 — Secure Architectures

| Servicio | Ancla |
|----------|-------|
| **IAM** | Pydantic validators pero para permisos — define la forma, deniega todo lo que no matchea |
| **Security Groups** | iptables stateful — solo Allow, la respuesta sale sola |
| **NACL** | iptables puro — stateless, tiene Deny, primera regla que matchea gana |
| **KMS** | Fernet del credential store pero managed — clave nunca sale, rotación automática, auditado en CloudTrail |

---
