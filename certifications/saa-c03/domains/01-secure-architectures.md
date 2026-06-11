# Dominio 1: Design Secure Architectures (30%)

> El dominio más pesado del examen. Dominarlo es la diferencia entre aprobar y no aprobar.

---

## 1.1 IAM — Identity & Access Management

### Conceptos clave

**Users, Groups, Roles, Policies** — la jerarquía es:
- **User**: identidad permanente (persona o aplicación)
- **Group**: colección de users — las policies se aplican al grupo, no al user
- **Role**: identidad temporal asumida (por un servicio, otra cuenta, o un user)
- **Policy**: documento JSON que define permisos (allow/deny en actions sobre resources)

**Analogía**: como los permisos de Linux (rwx) pero con granularidad de operación + recurso + condición.

### Tipos de policies

| Tipo | Qué es | Cuándo usarlo |
|------|---------|---------------|
| **Identity-based** | Attached a user/group/role | La mayoría de los casos |
| **Resource-based** | Attached al recurso (S3 bucket, SQS queue) | Cross-account access |
| **SCP (Service Control Policy)** | Attached a la OU en AWS Organizations | Governance corporativa |
| **Permission boundary** | Límite máximo de permisos de un identity | Delegación segura |
| **Session policy** | Se pasa al asumir un role | Restricción temporal |

### Reglas de evaluación de permisos

```
1. Explicit DENY siempre gana (en cualquier policy)
2. Si hay Allow explícito → permitido
3. Default → DENY implícito
```

Con Organizations + SCP: **SCP AND Identity policy** = el permiso efectivo es la intersección.

### Trust policy vs Permission policy

- **Trust policy** (en roles): quién puede ASUMIR el role
- **Permission policy** (en roles): qué puede HACER el role

```json
// Trust policy — permite a EC2 asumir este role
{
  "Effect": "Allow",
  "Principal": { "Service": "ec2.amazonaws.com" },
  "Action": "sts:AssumeRole"
}
```

### Least privilege — patrón del examen

El examen siempre pregunta cuál es la opción con **mínimos permisos**:
- Nunca `*` en actions si podés especificar
- Nunca `*` en resources si podés especificar el ARN
- Prefiere roles sobre users con credenciales a largo plazo
- Prefiere instance profiles sobre credenciales embebidas en código

### IAM Best Practices (AWS)

1. Nunca uses la cuenta root (solo para billing y account recovery)
2. Habilita MFA en root y todos los usuarios con acceso a consola
3. Usa roles para EC2/Lambda — nunca credentials en el código
4. Rota las credenciales de acceso regularmente
5. Usa AWS Config para auditar políticas IAM

---

## 1.2 VPC — Virtual Private Cloud

### Anatomía de una VPC

```
VPC (10.0.0.0/16)
├── Availability Zone A
│   ├── Public Subnet (10.0.1.0/24)   → Internet Gateway → Internet
│   └── Private Subnet (10.0.2.0/24) → NAT Gateway → Internet (outbound only)
└── Availability Zone B
    ├── Public Subnet (10.0.3.0/24)
    └── Private Subnet (10.0.4.0/24)
```

**Analogía**: tu docker-compose con bridge network, pero con subnets reales, routing tables, y controles de acceso granulares.

### Componentes críticos

| Componente | Función | Importante saber |
|-----------|---------|-----------------|
| **IGW** (Internet Gateway) | Conecta la VPC a internet | One per VPC, altamente disponible |
| **NAT Gateway** | Salida a internet para recursos privados | Managed, per-AZ, cuesta dinero |
| **Security Group** | Firewall stateful a nivel de instancia | Default: deny all inbound |
| **NACL** | Firewall stateless a nivel de subnet | Reglas con número de orden, evalúa todas |
| **Route Table** | Define a dónde va el tráfico | Cada subnet tiene una |
| **VPC Peering** | Conecta dos VPCs (misma o diferente cuenta) | No transitivo |
| **Transit Gateway** | Hub para conectar múltiples VPCs | Transitivo, más escalable |
| **VPC Endpoint** | Acceso a servicios AWS sin internet | Gateway (S3/DynamoDB) vs Interface (todo lo demás) |

### Security Group vs NACL

| | Security Group | NACL |
|--|---------------|------|
| Nivel | Instancia | Subnet |
| Estado | Stateful (permite return traffic automático) | Stateless (necesitás reglas de entrada Y salida) |
| Reglas | Solo Allow | Allow y Deny |
| Evaluación | Todas las reglas | Por número de orden (primero que matchea) |
| Default | Deny all inbound, allow all outbound | Allow all |

**En el examen**: si te preguntan por "block specific IP" → NACL (SG no tiene deny). Si te preguntan por "stateful" → SG.

### Patrones de seguridad comunes en el examen

**Bastion host** (aka jump box):
- EC2 en public subnet con SSH abierto
- Las instancias privadas solo aceptan SSH desde el bastion

**Private subnets con internet outbound**:
- NAT Gateway en la public subnet
- Route table de private subnet: `0.0.0.0/0 → NAT Gateway`

**VPC Endpoints** (importante para costo y seguridad):
- Sin VPC Endpoint: EC2 → Internet → S3 (paga transfer + expone a internet)
- Con VPC Endpoint Gateway: EC2 → VPC Endpoint → S3 (gratis, privado)
- Gateway Endpoint: S3 y DynamoDB únicamente
- Interface Endpoint (PrivateLink): todos los demás servicios AWS

---

## 1.3 KMS & Encryption

### Conceptos

- **CMK (Customer Managed Key)**: vos creás y controlás la key
- **AWS Managed Key**: AWS crea y rota automáticamente, vos no podés ver la key
- **Data Key**: key generada por KMS para cifrar datos reales (envelope encryption)

### Envelope Encryption

```
KMS CMK → genera Data Key → cifra tus datos → guarda Data Key cifrada junto con los datos
Para descifrar: KMS descifra la Data Key → Data Key descifra los datos
```

Ventaja: los datos nunca viajan a KMS, solo las keys pequeñas.

### Servicios que integran KMS nativamente

S3, EBS, RDS, DynamoDB, Secrets Manager, SSM Parameter Store, SQS, SNS, CloudTrail

### SSM Parameter Store vs Secrets Manager

| | Parameter Store | Secrets Manager |
|--|----------------|----------------|
| Costo | Gratis (standard) | USD 0.40/secret/mes |
| Rotación automática | No nativa | Sí (Lambda hook) |
| Versionado | Sí | Sí |
| Casos de uso | Config, flags, non-sensitive | Passwords, API keys, DB credentials |

**En el examen**: si dice "automatic rotation" → Secrets Manager.

---

## 1.4 Shield, WAF, Macie, GuardDuty

| Servicio | Protege contra | Nivel |
|---------|---------------|-------|
| **Shield Standard** | DDoS básico | Gratis, todos los recursos |
| **Shield Advanced** | DDoS avanzado + soporte DRT | USD 3,000/mes, ELB/CF/Route53 |
| **WAF** | Inyección SQL, XSS, reglas custom | Layer 7, delante de ALB/CloudFront |
| **GuardDuty** | Amenazas en logs (CloudTrail, VPC Flow, DNS) | ML-based, account level |
| **Macie** | Datos sensibles (PII) en S3 | ML-based, escanea buckets |
| **Inspector** | Vulnerabilidades en EC2/Lambda/containers | CVE scanning |

---

## Preguntas de práctica — Dominio 1

**Q1.** Una aplicación en EC2 necesita acceder a un bucket S3 en la misma cuenta. ¿Cuál es la forma más segura?

A) Crear access keys y configurarlas en el código  
B) Crear un IAM role con la policy necesaria y asignarlo a la instancia  
C) Crear un IAM user y guardar las credenciales en un archivo de configuración  
D) Usar el bucket público con una policy de solo lectura

<details><summary>Respuesta</summary>

**B** — IAM role asignado como instance profile. Las credenciales se rotan automáticamente y nunca están en el código ni en archivos de configuración.

</details>

---

**Q2.** Tu equipo de seguridad necesita bloquear todo el tráfico desde un rango de IPs específico hacia una subnet en producción. ¿Qué usás?

A) Security Group con reglas de deny  
B) IAM policy con condición de IP  
C) Network ACL con regla de deny  
D) WAF rule

<details><summary>Respuesta</summary>

**C** — NACLs soportan reglas de deny. Security Groups no tienen deny explícito (solo allow). WAF es Layer 7 (HTTP), no aplica a todo el tráfico de red.

</details>

---

**Q3.** Una Lambda en una VPC privada necesita acceder a DynamoDB sin pasar por internet. ¿Cuál es la solución más cost-effective?

A) NAT Gateway  
B) VPC Endpoint (Gateway type) para DynamoDB  
C) VPC Peering  
D) Direct Connect

<details><summary>Respuesta</summary>

**B** — VPC Endpoint de tipo Gateway para DynamoDB es gratuito y mantiene el tráfico dentro de la red de AWS. NAT Gateway tiene costo por hora y por GB transferido.

</details>
