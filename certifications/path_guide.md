# Guía de Path — AWS Certifications

## Tu diagnóstico inicial

**Resultado**: No necesitás empezar por Cloud Practitioner (CLF-C02).

Tu background técnico ya supera ese examen. Tenés:
- Arquitecturas distribuidas complejas (Celery + Redis, CQRS, circuit breaker)
- PostgreSQL, Redis, MongoDB en producción
- Docker + K8s operacional (lab 5G SA)
- SageMaker usado en producción
- Comprensión de redes (5G SA, iptables)

Lo único que te falta es **profundidad en los servicios específicos de AWS** y familiaridad con las interfaces.

---

## Path recomendado

```
[Ahora]              [+8 sem]            [+6 sem]            [+10 sem]
SAA-C03         →   DVA-C02         →   MLS-C01
Architect           Developer           ML Specialty
Associate           Associate
```

### 1. SAA-C03 — Solutions Architect Associate (PRIMER OBJETIVO)

**Por qué primero:**
- Es la certificación más demandada en el mercado
- Mapea directo a tu fortaleza de system design
- Te da el vocabulario AWS completo para el resto de las certs
- Las empresas la piden para roles cloud, backend senior, y plataforma

**Qué ya sabés** (ventajas sobre otros candidatos):
- System design: entendés por qué necesitás Multi-AZ, no solo que existe
- Bases de datos: MVCC, replicación, async — RDS y Aurora te vienen natural
- Redes: VPC es como tu docker network pero con subnets reales
- Messaging: SQS/SNS es tu Celery + Redis, managed

**Qué tenés que aprender principalmente:**
- La nomenclatura y servicios específicos de AWS
- Los límites y casos de uso de cada servicio
- Los trade-offs que pregunta el examen (costo vs performance vs disponibilidad)
- IAM en profundidad (policies, roles, SCPs — la parte más importante del examen)

**Formato del examen:**
- 65 preguntas (multiple choice + multiple response)
- 130 minutos
- Score mínimo: 720/1000
- Precio: USD 150

---

### 2. DVA-C02 — Developer Associate

**Por qué segundo:**
- Complementa SAA con profundidad en desarrollo (Lambda, DynamoDB, CodePipeline)
- 60-65% overlap con SAA — estudiás mucho menos
- Te da el badge de "Developer" que piden muchos roles backend en AWS

**Qué ya sabés:**
- FastAPI → Lambda + API Gateway (mismo patrón, serverless)
- Celery → Step Functions y SQS event-driven
- SQLAlchemy → DynamoDB patterns (NoSQL pero con los mismos conceptos de consistency)

---

### 3. MLS-C01 — Machine Learning Specialty

**Por qué tercero (y por qué hacerlo):**
- Muy pocos tienen: backend strong + ML + cloud = perfil rarísimo
- Te da acceso a roles que pagan 30-50% más
- Tu experiencia con SageMaker, PySpark, anomaly detection te da ventaja real
- Diferenciador para roles en startups de AI o big tech

**Requiere:** Haber hecho SAA primero (o tener práctica sólida en AWS).

---

## CLF-C02 — Cloud Practitioner

**Recomendación: skip.**

Si querés usarlo como "warm-up" de 2 semanas para familiarizarte con la interfaz AWS antes de SAA, adelante. Pero no es necesario y el ROI de tiempo es bajo.

---

## Cronograma sugerido (si empezás ahora)

| Semana | Actividad |
|--------|-----------|
| 1-2 | Diagnóstico + repaso de servicios core (EC2, S3, VPC, IAM) |
| 3-4 | Dominios 1 y 2 de SAA-C03 (Secure + Resilient) |
| 5-6 | Dominios 3 y 4 de SAA-C03 (Performance + Cost) |
| 7 | Practice exams (objetivo: >80% consistente) |
| 8 | Repaso de puntos débiles + examen |

**Ritmo realista**: 1-1.5 horas/día en días de semana.

---

## Recursos recomendados (en orden de prioridad)

1. **Adrian Cantrill** — el mejor curso de SAA-C03, very deep, muy arquitectónico (tu estilo)
2. **Stephane Maarek (Udemy)** — más rápido, más directo al examen
3. **AWS Skill Builder** — practice exams oficiales (gratis con cuenta)
4. **Jon Bonso practice exams (Tutorials Dojo)** — los más parecidos al examen real
5. **AWS Free Tier** — imprescindible, hacé los labs a mano

---

## Qué NO hacer

- No estudiar solo teoría sin abrir la consola AWS
- No memorizar ARNs y límites — el examen pregunta comprensión, no memoria
- No ignorar IAM — es 30% del examen y la mayoría de la gente lo subestima
- No saltearte los practice exams — son el diferencial entre aprobar y reprobar
