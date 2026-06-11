# Diagnóstico Inicial — SAA-C03

> Respondé estas preguntas honestamente para calibrar tu punto de partida.
> Usá `/diagnose` con Claude para que genere y evalúe el quiz completo.

---

## Pre-assessment: ¿Ya sabés esto?

Marcá lo que podés explicar sin buscar:

### Networking
- [ ] Qué es un CIDR y cómo calcular subnets (/24, /28, etc.)
- [ ] Diferencia entre gateway y router
- [ ] Qué es NAT y para qué se usa
- [ ] Qué es DNS y cómo funciona la resolución
- [ ] Qué es un load balancer y cómo distribuye tráfico

### Compute
- [ ] Diferencia entre VM, container, y serverless
- [ ] Qué significa "stateless" en una aplicación web
- [ ] Qué es un auto scaling group conceptualmente
- [ ] Qué es un health check

### Storage
- [ ] Diferencia entre block storage, file storage, y object storage
- [ ] Qué es un backup y qué es un snapshot
- [ ] Qué es replicación de datos

### Bases de datos
- [ ] Diferencia entre SQL y NoSQL
- [ ] Qué es replicación maestro-réplica
- [ ] Qué es un cache y cuándo usarlo

### Seguridad
- [ ] Qué es el principio de mínimos privilegios
- [ ] Diferencia entre autenticación y autorización
- [ ] Qué es un firewall y cómo funciona

---

## Nivel estimado por área (antes de estudiar)

Completá esto y usalo como baseline:

| Área AWS | Score inicial (0-10) | Nota |
|----------|---------------------|------|
| IAM & Security | | |
| VPC & Networking | | |
| EC2 & Compute | | |
| S3 & Storage | | |
| RDS & Databases | | |
| SQS/SNS/EventBridge | | |
| Lambda & Serverless | | |
| CloudFront & CDN | | |
| Route 53 & DNS | | |
| CloudWatch & Monitoring | | |
| Pricing & Cost | | |

---

## Tu ventaja sobre el candidato promedio

Basado en tu background técnico, ya llegás con estas ventajas:

**Sistema de mensajería**: Celery + Redis → SQS, SNS, Kinesis
- Ya entendés visibiliy timeout (es como Celery `acks_late`)
- Ya entendés DLQ (es tu `max_retries` + CRITICAL log)
- Ya entendés fanout con múltiples workers

**Bases de datos**: PostgreSQL + Redis + Alembic → RDS + ElastiCache + DMS
- Ya entendés replicación, failover, y async sessions
- Ya entendés cache invalidation y TTL
- Ya entendés migrations

**Arquitectura**: CQRS, circuit breaker, repository → los dominios 2 y 3 del SAA-C03
- Ya pensás en desacoplamiento naturalmente
- Ya entendés las diferencias de HA vs DR

**Networking**: Docker networks, iptables, 5G SA → VPC, Security Groups, NACLs
- Ya entendés el modelo de capas de red
- La sintaxis de AWS es diferente pero los conceptos son los mismos

**Lo que genuinamente necesitás estudiar**:
1. La nomenclatura específica de AWS (nombres de servicios y APIs)
2. IAM policies en detalle (el punto más diferente)
3. Los edge cases de pricing (cuándo Reserved vs Spot vs On-Demand)
4. S3 storage classes y lifecycle rules
5. Los servicios que no tienen equivalente directo (Route 53, CloudFront, Shield)
