# Guía de Personas — Cómo interactuar

Activá cada persona según lo que necesitás en el momento.

---

## `/coach` — El entrenador

**Cuándo usarlo**: al empezar la sesión, cuando no sabés qué estudiar, cuando necesitás motivación o dirección estratégica.

**Ejemplo de uso**:
```
/coach
```

El coach va a:
1. Mostrarte tu progreso actual en SAA-C03
2. Decirte qué dominio trabajar hoy según tu estado
3. Sugerirte cuánto tiempo dedicar
4. Cerrar la sesión preguntando qué estudiar mañana

---

## `/prof <servicio>` — El profesor

**Cuándo usarlo**: cuando querés entender un servicio en profundidad, el WHY detrás del cómo.

**Ejemplos**:
```
/prof IAM
/prof VPC
/prof RDS
/prof Lambda
/prof ElastiCache
```

El profesor va a:
1. Explicar cómo funciona internamente el servicio
2. Conectar con algo que ya conocés (Celery, Redis, PostgreSQL, etc.)
3. Explicar los anti-patrones más comunes
4. Decirte qué esperar del examen sobre ese servicio
5. Dar un ejemplo de arquitectura real

---

## `/peer <dominio>` — El compañero de estudio

**Cuándo usarlo**: para practicar con preguntas reales de examen, debatir opciones, y consolidar lo aprendido.

**Ejemplos**:
```
/peer secure-arch
/peer resilient-arch
/peer performance
/peer cost
/peer general
```

El peer va a:
1. Presentar preguntas en formato de examen (A/B/C/D)
2. Esperar tu respuesta sin darte pistas
3. Después de tu respuesta, explicar por qué cada opción es correcta o incorrecta
4. Ajustar la dificultad según tus respuestas

---

## `/quiz <n>` — Quiz rápido

**Cuándo usarlo**: para hacer N preguntas seguidas sin parar a explicar (modo examen).

**Ejemplo**:
```
/quiz 10
```

---

## `/diagnose` — Diagnóstico inicial

**Cuándo usarlo**: una sola vez al principio para calibrar tu nivel real en SAA-C03.

El diagnóstico:
1. Te hace 20 preguntas de todos los dominios
2. Calcula tu score por dominio
3. Recomienda por dónde empezar

---

## `/improve <área>` — Deep dive carrera

**Cuándo usarlo**: cuando querés trabajar en áreas de crecimiento profesional más allá del examen.

**Ejemplos**:
```
/improve terraform
/improve ci-cd
/improve observability
/improve technical-writing
```

---

## `/progress <dominio> <0-100>` — Actualizar progreso

**Cuándo usarlo**: al terminar de estudiar un dominio.

**Ejemplos**:
```
/progress iam 70
/progress vpc 55
/progress s3 80
/progress d1-secure-arch 65
```

Esto actualiza el dashboard en `docs/data.js`.

---

## `/session` — Registrar sesión

**Cuándo usarlo**: al terminar una sesión de estudio.

```
/session
```

Claude te va a preguntar: dominio, tiempo estudiado, y notas. Luego actualiza el log.

---

## Flujo de sesión ideal (ejemplo)

```
1. /coach                          → ¿qué estudio hoy?
2. /prof IAM                       → entiendo IAM en profundidad
3. /peer secure-arch               → practico con preguntas
4. /progress iam 70                → registro que aprendí IAM al 70%
5. /session                        → registro la sesión de hoy
```
