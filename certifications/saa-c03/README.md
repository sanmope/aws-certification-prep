# SAA-C03 — Solutions Architect Associate

## Estado actual

| Dominio | Peso | Progreso |
|---------|------|----------|
| Design Secure Architectures | 30% | 0% |
| Design Resilient Architectures | 26% | 0% |
| Design High-Performing Architectures | 24% | 0% |
| Design Cost-Optimized Architectures | 20% | 0% |

**Progreso general: 0%** (actualizar con `/progress`)

---

## Dominios

- [`domains/01-secure-architectures.md`](domains/01-secure-architectures.md) — IAM, VPC, KMS, Shield, WAF
- [`domains/02-resilient-architectures.md`](domains/02-resilient-architectures.md) — HA, DR, SQS/SNS, Route 53
- [`domains/03-high-performing-architectures.md`](domains/03-high-performing-architectures.md) — EC2, RDS, ElastiCache, CloudFront
- [`domains/04-cost-optimized-architectures.md`](domains/04-cost-optimized-architectures.md) — Pricing, S3 tiers, Serverless

## Cheatsheets

- [`cheatsheets/iam.md`](cheatsheets/iam.md)
- [`cheatsheets/vpc.md`](cheatsheets/vpc.md)
- [`cheatsheets/s3.md`](cheatsheets/s3.md)
- [`cheatsheets/ec2.md`](cheatsheets/ec2.md)
- [`cheatsheets/rds.md`](cheatsheets/rds.md)
- [`cheatsheets/sqs-sns.md`](cheatsheets/sqs-sns.md)

---

## Tips para el examen

1. **Lee toda la pregunta** — el contexto suele eliminar 2 opciones automáticamente
2. **"Most cost-effective"** = busca Serverless o Spot primero
3. **"Highly available"** = Multi-AZ, no Multi-Region (a menos que diga disaster recovery)
4. **"Decouple"** = SQS casi siempre
5. **"Secure"** = menos privilegios posibles (IAM deny > allow, SCP > policy)
6. IAM es el dominio más importante — dominalo primero

## Formato del examen

- 65 preguntas
- 130 minutos (~2 min/pregunta)
- Score de aprobación: 720/1000
- 15 preguntas no cuentan (beta) — no sabés cuáles son
- Precio: USD 150 (con practice exam incluido si fallás = free retake con voucher)
