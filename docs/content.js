// AWS Cert Prep — Study Notes Content
// Populated automatically during /prof and /peer sessions.

window.CONTENT_DATA = {

  certs: [
    {
      id: "saa-c03",
      name: "SAA-C03",
      domains: [
        {
          id: "d1",
          name: "D1 — Secure Architectures",
          subtopics: [
            {
              id: "iam",
              name: "IAM",
              fullName: "IAM — Identity & Access Management",
              lastStudied: "2026-06-11",
              sections: [

                {
                  type: "analogy",
                  title: "Analogía",
                  content: "IAM policies = Pydantic validators para permisos. Definís la forma válida de un request (qué acción, sobre qué recurso, bajo qué condición) y AWS deniega todo lo que no cumple. El <code>Effect: Deny</code> explícito es como un <code>raise ValueError</code> que nunca se puede sobrescribir."
                },

                {
                  type: "concepts",
                  title: "Conceptos clave",
                  items: [
                    {
                      term: "Jerarquía",
                      body: "Account → Root User (solo billing/recovery) → IAM Users / Groups / Roles. En producción casi nunca usás Users directamente — usás Roles.",
                      code: `AWS Account\n└── Root User\n    ├── IAM Users   (personas / apps con credenciales permanentes)\n    ├── IAM Groups  (colecciones de users, no anidable)\n    └── IAM Roles   (identidades temporales — asumidas por servicios o cuentas)`
                    },
                    {
                      term: "Policy evaluation",
                      body: "La regla más importante del examen: un Deny explícito gana siempre, sin importar cuántos Allow haya.",
                      code: `Explicit DENY  →  DENIED  (gana siempre)\nExplicit ALLOW →  ALLOWED\nNinguna regla  →  DENIED  (implicit deny por defecto)\n\nCon SCPs (Organizations):\n  Permiso efectivo = SCP ∩ Identity Policy  (lo más restrictivo gana)`
                    },
                    {
                      term: "Identity-based vs Resource-based",
                      body: "Identity-based: attached al principal (\"yo puedo hacer X\"). Resource-based: attached al recurso (\"quién puede hacer X en mí\"). Solo las resource-based policies permiten acceso cross-account sin asumir un role.",
                      code: `Identity-based            Resource-based\n──────────────────        ──────────────────────\nAttached al principal     Attached al recurso\n"Yo puedo hacer X"        "Quién puede hacer X en mí"\n\nEj: IAM Role de Lambda    Ej: S3 Bucket Policy\n    con permisos a S3          con account ID externo`
                    },
                    {
                      term: "STS AssumeRole",
                      body: "STS es el servicio que emite credenciales temporales. Cuando una Lambda \"tiene\" un role, en realidad llama a STS. Las credenciales expiran (1h por defecto) — si alguien las roba, tienen ventana limitada.",
                      code: `App / Servicio AWS\n  → sts:AssumeRole(RoleARN)\n  → STS verifica el trust policy del role\n  → Devuelve: AccessKeyId + SecretAccessKey + SessionToken (TTL: 1h)\n  → SDK rota automáticamente via Instance Metadata Service\n     http://169.254.169.254/latest/meta-data/iam/security-credentials/`
                    },
                    {
                      term: "Permission Boundary",
                      body: "No otorga permisos — es un techo. Permiso efectivo = Identity Policy ∩ Permission Boundary. Caso de uso: evitar privilege escalation cuando un developer puede crear roles.",
                      code: `Permission efectivo = Identity Policy ∩ Permission Boundary\n\nSi la identity policy permite s3:* pero el boundary no menciona S3\n→ No puede tocar S3, aunque la policy lo diga`
                    },
                    {
                      term: "SCPs (Service Control Policies)",
                      body: "Se aplican a nivel de cuenta dentro de AWS Organizations. No otorgan permisos — solo recortan lo que es posible. Si el SCP no permite S3, nadie en esa cuenta puede tocar S3.",
                      code: `Organization\n└── OU: Production\n    └── Cuenta A  ← SCP aplicado\n        └── Cualquier IAM policy en esta cuenta\n            queda limitada por el SCP`
                    }
                  ]
                },

                {
                  type: "conditions",
                  title: "Condiciones útiles",
                  items: [
                    { key: "aws:MultiFactorAuthPresent: true", use: "Forzar MFA en operaciones sensibles" },
                    { key: "aws:SourceIp", use: "Restringir acceso por IP (ej: solo desde tu VPN)" },
                    { key: "aws:RequestedRegion", use: "Limitar a una región específica" },
                    { key: "iam:PassedToService", use: "Controlar qué servicios pueden recibir un role" },
                    { key: "s3:prefix", use: "Restringir a una carpeta específica dentro de un bucket" }
                  ]
                },

                {
                  type: "exam",
                  title: "Tips de examen",
                  items: [
                    "EC2 o Lambda necesita acceder a S3 → IAM Role + Instance Profile. Nunca access keys hardcodeadas.",
                    "SCP no otorga permisos, solo recorta. Un SCP que \"permite\" algo no da permisos nuevos.",
                    "Least privilege: si hay dos opciones, la que usa ARN específico gana sobre la que usa *.",
                    "Cross-account sin asumir role → solo via resource-based policy (ej: S3 bucket policy con el account ID de origen).",
                    "Usuarios externos (clientes de tu app) → Cognito User Pools. No IAM Users.",
                    "Developer puede crear solo roles limitados → Permission Boundary para evitar privilege escalation.",
                    "Federar con Active Directory corporativo → IAM Identity Center (SSO) con SAML."
                  ]
                },

                {
                  type: "antipatterns",
                  title: "Anti-patrones (distractores en el examen)",
                  items: [
                    "❌ Crear IAM Users para aplicaciones — usá roles",
                    "❌ Compartir access keys entre personas — cada uno su User o role",
                    "❌ SCP que \"permite\" acciones — los SCPs solo restringen",
                    "❌ Inline policies para reusar — usá managed policies"
                  ]
                },

                {
                  type: "linux-map",
                  title: "Mapeo Linux → IAM",
                  items: [
                    { linux: "useradd santi", aws: "IAM User" },
                    { linux: "Grupos (wheel, docker)", aws: "IAM Group" },
                    { linux: "/etc/sudoers", aws: "IAM Policy" },
                    { linux: "su - postgres (cambiar identidad)", aws: "sts:AssumeRole" },
                    { linux: "Service account (www-data)", aws: "IAM Role" },
                    { linux: "PAM module que bloquea syscalls", aws: "SCP" },
                    { linux: "chown / chmod en el archivo", aws: "Resource-based Policy" }
                  ]
                },

                {
                  type: "lab",
                  title: "Lab 1 — Least privilege con boto3",
                  result: "pass",
                  date: "2026-06-12",
                  objective: "Crear un IAM Role que solo permita s3:GetObject en un bucket específico y verificar que least privilege funciona de verdad.",
                  output: "GET object: b'hola desde el lab'\nPutObject bloqueado: AccessDenied\nListBuckets bloqueado: AccessDenied",
                  learnings: [
                    "El trust policy define QUIÉN puede asumir el role — si falta el principal, STS lanza AccessDenied en AssumeRole, no en la operación S3.",
                    "Las credenciales temporales van al boto3.client(), no a cada operación individual.",
                    "IAM necesita ~10s para propagar cambios de policy — sin sleep, AssumeRole puede devolver creds con permisos viejos.",
                    "Resource ARN específico (arn:aws:s3:::bucket/*) vs * — la diferencia es real y verificable."
                  ]
                }

              ]
            },

            {
              id: "vpc-security",
              name: "VPC Security",
              fullName: "VPC Security — NACLs & Security Groups",
              lastStudied: "2026-06-12",
              sections: [

                {
                  type: "analogy",
                  title: "Analogía",
                  content: "<strong>Security Groups = iptables con conntrack (stateful)</strong> — si abrís el puerto, la respuesta vuelve sola.<br><strong>NACLs = iptables sin conntrack (stateless)</strong> — necesitás reglas explícitas para ambas direcciones, incluyendo puertos efímeros."
                },

                {
                  type: "concepts",
                  title: "Conceptos clave",
                  items: [
                    {
                      term: "Security Groups — capa de instancia (ENI)",
                      body: "Stateful, solo Allow, todas las reglas se evalúan. La feature más importante: podés referenciar otros SGs en vez de IPs — si el ALB escala, la regla sigue válida.",
                      code: `ALB SG  → acepta 443 desde 0.0.0.0/0\nEC2 SG  → acepta 8080 solo desde el SG del ALB   ← referencia por SG, no IP\nRDS SG  → acepta 5432 solo desde el SG de EC2`
                    },
                    {
                      term: "NACLs — capa de subnet",
                      body: "Stateless, Allow + Deny, primera regla que matchea gana. Dejá gaps en los números (100, 200) para poder insertar reglas después.",
                      code: `Regla 100: Allow TCP 443 desde 0.0.0.0/0\nRegla 200: Allow TCP 80  desde 0.0.0.0/0\nRegla 300: Deny  TCP 22  desde 0.0.0.0/0\nRegla *  : Deny  todo   (implícito)`
                    },
                    {
                      term: "El gotcha de los puertos efímeros",
                      body: "Con NACLs stateless, las respuestas al cliente usan puertos efímeros (1024-65535). Sin una regla outbound que los permita, las respuestas se bloquean aunque la request entró bien.",
                      code: `NACL outbound de la subnet del servidor:\n  Regla 100: Allow TCP 1024-65535 → 0.0.0.0/0  ← respuestas a clientes`
                    },
                    {
                      term: "Patrón 3 capas",
                      body: "El más común en el examen. La subnet de RDS no tiene route a internet — aunque alguien comprometiera el SG, no hay salida.",
                      code: `Internet → ALB (public subnet)  → EC2/ECS (private subnet) → RDS (private, sin internet)`
                    }
                  ]
                },

                {
                  type: "exam",
                  title: "Tips de examen",
                  items: [
                    "Bloquear una IP específica → NACL (SG no tiene Deny explícito).",
                    "NACL permite pero no funciona → olvidaron la regla outbound de puertos efímeros (1024-65535).",
                    "RDS no recibe conexiones → SG de RDS no referencia el SG de EC2.",
                    "EC2 no puede conectarse a internet → verificar route table, IGW, y SG outbound.",
                    "Múltiples instancias necesitan el mismo acceso → referencia entre SGs, no copiar reglas por IP."
                  ]
                },

                {
                  type: "conditions",
                  title: "SG vs NACL — decisión rápida",
                  items: [
                    { key: "Bloquear IP maliciosa", use: "NACL" },
                    { key: "Control por instancia individual", use: "Security Group" },
                    { key: "Control por subnet entera", use: "NACL" },
                    { key: "Allow de respuestas automático", use: "Security Group (stateful)" },
                    { key: "Auditar tráfico entre subnets", use: "NACL + VPC Flow Logs" }
                  ]
                }

              ]
            },
            {
              id: "kms",
              name: "KMS",
              fullName: "KMS & Encryption at rest/transit",
              lastStudied: null,
              sections: []
            },
            {
              id: "shield-waf",
              name: "Shield / WAF",
              fullName: "Shield, WAF, Macie, GuardDuty",
              lastStudied: null,
              sections: []
            },
            {
              id: "s3-policies",
              name: "S3 Policies",
              fullName: "S3 bucket policies & pre-signed URLs",
              lastStudied: null,
              sections: []
            }
          ]
        },
        {
          id: "d2",
          name: "D2 — Resilient Architectures",
          subtopics: [
            { id: "multi-az", name: "Multi-AZ / Multi-Region", fullName: "Multi-AZ vs Multi-Region", lastStudied: null, sections: [] },
            { id: "elb", name: "ELB", fullName: "ELB (ALB vs NLB vs GLB)", lastStudied: null, sections: [] },
            { id: "asg", name: "Auto Scaling", fullName: "Auto Scaling Groups", lastStudied: null, sections: [] },
            { id: "sqs-sns", name: "SQS / SNS", fullName: "SQS, SNS, EventBridge", lastStudied: null, sections: [] },
            { id: "route53", name: "Route 53", fullName: "Route 53 routing policies", lastStudied: null, sections: [] },
            { id: "rds", name: "RDS", fullName: "RDS Multi-AZ & read replicas", lastStudied: null, sections: [] }
          ]
        },
        {
          id: "d3",
          name: "D3 — High-Performing Architectures",
          subtopics: [
            { id: "ec2", name: "EC2", fullName: "EC2 instance types & use cases", lastStudied: null, sections: [] },
            { id: "rds-perf", name: "RDS / Aurora / DynamoDB", fullName: "RDS, Aurora, DynamoDB performance", lastStudied: null, sections: [] },
            { id: "elasticache", name: "ElastiCache", fullName: "ElastiCache (Redis vs Memcached)", lastStudied: null, sections: [] },
            { id: "cloudfront", name: "CloudFront", fullName: "CloudFront distributions", lastStudied: null, sections: [] },
            { id: "s3-perf", name: "S3 Performance", fullName: "S3 Transfer Acceleration, Multipart", lastStudied: null, sections: [] },
            { id: "lambda", name: "Lambda", fullName: "Lambda performance & concurrency", lastStudied: null, sections: [] }
          ]
        },
        {
          id: "d4",
          name: "D4 — Cost-Optimized Architectures",
          subtopics: [
            { id: "pricing", name: "Pricing models", fullName: "On-Demand vs Reserved vs Spot", lastStudied: null, sections: [] },
            { id: "s3-storage", name: "S3 Storage classes", fullName: "S3 storage classes (lifecycle)", lastStudied: null, sections: [] },
            { id: "serverless", name: "Serverless tradeoffs", fullName: "Serverless vs container tradeoffs", lastStudied: null, sections: [] },
            { id: "cost-tools", name: "Cost tools", fullName: "Cost Explorer & Budgets", lastStudied: null, sections: [] },
            { id: "data-transfer", name: "Data transfer costs", fullName: "Data transfer costs", lastStudied: null, sections: [] }
          ]
        }
      ]
    }
  ]

};
