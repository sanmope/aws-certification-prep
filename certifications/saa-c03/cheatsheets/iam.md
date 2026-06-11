# IAM Cheatsheet — SAA-C03

## Jerarquía

```
AWS Account
└── Root User (solo para billing y account recovery)
    ├── IAM Users (personas / apps con credenciales permanentes)
    ├── IAM Groups (colecciones de users)
    └── IAM Roles (identidades temporales para servicios o cross-account)
            ↑ asumido por EC2, Lambda, ECS, otro account, SAML federation
```

## Tipos de credenciales

| Tipo | Cuándo usar |
|------|-------------|
| Password | Acceso a consola AWS |
| Access Key ID + Secret | CLI, SDK, IaC (rotar cada 90 días) |
| Temporary credentials (STS) | Roles asumidos — expiran automáticamente |
| MFA token | Consola + operaciones sensibles |

## Policy evaluation

```
Explicit DENY > Explicit ALLOW > Implicit DENY (default)

Con SCPs (Organizations):
  Effective permission = SCP ∩ Identity Policy
  (lo más restrictivo gana)
```

## Patrones críticos del examen

| Escenario | Solución |
|-----------|----------|
| EC2 accede a S3 | IAM Role → Instance Profile |
| Lambda accede a DynamoDB | IAM Role → Execution Role |
| Cross-account access | Role en cuenta destino + trust policy |
| Empresa con múltiples cuentas | AWS Organizations + SCPs |
| Federar con Active Directory | IAM Identity Center (SSO) o SAML federation |
| Aplicación web con usuarios externos | Cognito User Pools |
| Limitar lo que un developer puede crear | Permission Boundary |
| Auditar quién hizo qué | CloudTrail |

## Policy document structure

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",          // Allow | Deny
    "Principal": "*",           // solo en resource-based policies
    "Action": "s3:GetObject",   // o lista, o "*"
    "Resource": "arn:aws:s3:::my-bucket/*",
    "Condition": {
      "StringEquals": {
        "aws:RequestedRegion": "us-east-1"
      }
    }
  }]
}
```

## Condiciones útiles en el examen

| Condición | Uso |
|-----------|-----|
| `aws:MultiFactorAuthPresent: true` | Requiere MFA para la acción |
| `aws:SourceIp` | Restringir por IP |
| `aws:RequestedRegion` | Limitar a región específica |
| `s3:prefix` | Restringir a carpeta específica en S3 |
| `iam:PassedToService` | Controlar qué servicios pueden recibir un role |

## STS AssumeRole flow

```
App en Account A
  → sts:AssumeRole(RoleARN en Account B)
  → Recibe temporary credentials (access key + secret + session token, máx 12h)
  → Usa esas credentials para acceder a recursos en Account B
```

## Instance Profile (EC2)

```
EC2 Instance
└── Instance Profile (IAM Role asociado)
    └── La app corre con esas credenciales (auto-rotadas cada hora)
    └── Accesible en: http://169.254.169.254/latest/meta-data/iam/security-credentials/
```

## Lo que más pregunta el examen

1. **Least privilege**: si hay dos opciones, una con `*` y otra con ARN específico → elegí el ARN
2. **Roles > Users**: si la app está en AWS, siempre role (no access keys hardcodeadas)
3. **SCP no hace nada solo**: una SCP que permite no otorga permisos — solo limita los de la identity policy
4. **Resource-based policy**: S3 bucket policy, SQS queue policy, Lambda resource policy
5. **Cross-account sin roles**: solo via resource-based policy (S3 bucket policy con el account ID de origen)
