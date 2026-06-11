# SQS & SNS Cheatsheet — SAA-C03

> Tu analogía: SQS = Redis como broker de Celery, pero managed y serverless. SNS = pub/sub.

---

## SQS — Simple Queue Service

### Tipos de colas

| | Standard | FIFO |
|--|---------|------|
| Orden | Best-effort | Garantizado |
| Duplicados | Posible (entrega at-least-once) | No (exactly-once) |
| Throughput | Unlimited | 3,000 msg/s con batching |
| Casos de uso | Alta escala, orden no crítico | Pedidos, pagos, secuencias |

### Conceptos clave

**Visibility Timeout** (default: 30s, máx: 12h):
- Cuando un consumer recibe un mensaje, se "oculta" del resto
- Si no se borra en ese tiempo → vuelve a aparecer (delivery again)
- Análogo: tu Celery task con `acks_late=True`

**Dead Letter Queue (DLQ)**:
- Después de N intentos fallidos → el mensaje va a la DLQ
- Úsala para debug de mensajes problemáticos
- Análogo: tu `CRITICAL` log después de `max_retries` en Celery

**Long Polling** (siempre preferirlo):
- `WaitTimeSeconds: 20` → la llamada espera hasta 20s por un mensaje
- Reduce costos (menos llamadas a la API) y latencia
- Short polling = polling inmediato, más costoso

**Message retention**: 4 días default, máx 14 días

**Message size**: máx 256KB (para más grande: guardar en S3, mandar ARN en SQS)

### Patrones del examen

| Escenario | Solución |
|-----------|----------|
| Desacoplar productor de consumidor | SQS entre los dos |
| Fan-out (1 evento → N consumidores) | SNS → SQS (múltiples colas) |
| Orden garantizado | FIFO queue |
| Procesar al ritmo del consumidor | SQS Standard (buffer natural) |
| Lambda triggeada por mensajes | SQS como event source para Lambda |
| Mensajes procesados una sola vez | FIFO + MessageGroupId |

---

## SNS — Simple Notification Service

### Modelo: Topic → Subscriptions

```
Publisher → SNS Topic → Subscription 1 (SQS queue)
                      → Subscription 2 (Lambda)
                      → Subscription 3 (HTTP endpoint)
                      → Subscription 4 (Email)
                      → Subscription 5 (SMS)
```

### Casos de uso

- **Fanout pattern**: mismo evento a múltiples sistemas
- **Alertas**: CloudWatch → SNS → Email/Slack
- **Event-driven**: S3 event → SNS → Lambda + SQS

### SNS FIFO

- Igual que SQS FIFO pero para pub/sub
- Solo puede tener SQS FIFO como subscribers
- Para orden + fanout garantizado

---

## Patrones combinados (los más preguntados en el examen)

### Fanout (SNS + SQS)

```
S3 Event → SNS Topic
                ├── SQS Queue A → Worker A (thumbnails)
                ├── SQS Queue B → Worker B (metadata)
                └── Lambda C → Worker C (notify)
```

**Por qué no SNS directo a Lambdas?**: SQS actúa como buffer — si Lambda está throttleada, los mensajes esperan en la cola en vez de perderse.

### Decoupling de microservicios

```
Frontend API → SQS → Backend Processor
     ↑                      ↓
  responde 202          procesa async
  inmediatamente        a su ritmo
```

### Event-driven con DLQ

```
SQS → Lambda
       ↓ (si falla N veces)
      DLQ → CloudWatch Alarm → SNS → Email
```

---

## EventBridge (antes CloudWatch Events)

- Más potente que SNS/SQS para routing de eventos
- Soporta filtros por contenido del evento
- Puede conectar servicios AWS, SaaS (Datadog, Zendesk), y custom apps
- **Regla del examen**: si dice "based on event pattern" o "schedule (cron)" → EventBridge

---

## Kinesis vs SQS (pregunta frecuente)

| | SQS | Kinesis Data Streams |
|--|-----|---------------------|
| Paradigma | Queue (consume y se borra) | Stream (retain, replay) |
| Múltiples consumers | No (a menos que DLQ o SNS) | Sí, independientes |
| Orden | Solo FIFO garantiza | Por partition key |
| Retención | Hasta 14 días | Hasta 365 días |
| Casos de uso | Tareas async, jobs | Analytics en tiempo real, ML |

**Regla**: si dice "replay", "múltiples consumers independientes", o "analytics" → Kinesis. Si dice "decouple" o "buffer" → SQS.
