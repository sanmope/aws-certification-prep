# VPC Cheatsheet — SAA-C03

## Estructura de una VPC bien diseñada

```
VPC: 10.0.0.0/16  (65,534 hosts disponibles)
│
├── us-east-1a
│   ├── Public  Subnet: 10.0.1.0/24  → Route: 0.0.0.0/0 → IGW
│   └── Private Subnet: 10.0.2.0/24  → Route: 0.0.0.0/0 → NAT GW
│
└── us-east-1b
    ├── Public  Subnet: 10.0.3.0/24  → Route: 0.0.0.0/0 → IGW
    └── Private Subnet: 10.0.4.0/24  → Route: 0.0.0.0/0 → NAT GW
```

**Regla**: NAT GW va en la PUBLIC subnet pero sirve a las PRIVATE subnets.

## Componentes — cuándo usar qué

| Componente | Para qué | Costo |
|-----------|---------|-------|
| IGW | Entrada/salida a internet | Gratis |
| NAT Gateway | Salida a internet desde subnets privadas | ~$0.045/h + $0.045/GB |
| NAT Instance (legacy) | Idem pero gestionado por vos | Costo de EC2 |
| Bastion Host | SSH a instancias privadas | Costo de EC2 |
| VPC Endpoint Gateway | Acceso privado a S3 y DynamoDB | Gratis |
| VPC Endpoint Interface | Acceso privado a otros servicios AWS | ~$0.01/h |
| VPC Peering | Conectar dos VPCs | Solo transfer cost |
| Transit Gateway | Hub central para múltiples VPCs | $0.05/h + $0.02/GB |
| VPN Gateway | Conectar on-premises via internet (IPSec) | $0.05/h |
| Direct Connect | Conexión dedicada a AWS | Setup cost + puerto |

## Security Group vs NACL

```
Security Group (instancia):        NACL (subnet):
┌─────────────────────┐           ┌─────────────────────┐
│ Stateful             │           │ Stateless            │
│ Solo Allow           │           │ Allow + Deny         │
│ Todas las reglas     │           │ Primera que matchea  │
│ Default: deny in     │           │ Default: allow all   │
│         allow out    │           │                      │
└─────────────────────┘           └─────────────────────┘
```

**Trick**: NACL tiene números en las reglas (100, 200...) — la regla más baja que matchea gana. Siempre agregá reglas con números con espacio (100, 200, no 101).

## Flujo de decisión (seguridad):

```
¿Bloquear IP específica?     → NACL (SG no tiene deny)
¿Control por instancia?      → Security Group
¿Control por subnet entera?  → NACL
¿Allow HTTP desde ALB?       → SG (stateful, no necesitás regla de vuelta)
```

## Patrones comunes en el examen

### Patrón 1: Web App de 3 capas
```
Internet → ALB (public subnet) → EC2/ECS (private subnet) → RDS (private subnet, sin internet)
```
- ALB: SG que acepta 80/443 desde 0.0.0.0/0
- EC2: SG que acepta 8080 solo desde el SG del ALB
- RDS: SG que acepta 5432 solo desde el SG de EC2

### Patrón 2: Lambda en VPC accede a RDS y a internet
```
Lambda (private subnet)
  ├── RDS (private subnet) → directo, no necesita internet
  └── API externa → NAT Gateway en public subnet
```

### Patrón 3: Acceso privado a S3 desde EC2 en subnet privada
```
EC2 (private) → VPC Endpoint Gateway para S3 → S3
(sin internet, sin NAT Gateway, gratis)
```
Route table de la subnet privada: `pl-xxxxx (S3 prefix list) → vpce-xxxxx`

## CIDRs reservados por AWS en cada subnet

AWS se queda con 5 IPs de cada subnet:
- `.0` — network address
- `.1` — VPC router
- `.2` — DNS
- `.3` — reservado para uso futuro
- `.255` — broadcast

Una /28 (16 hosts) → solo 11 disponibles.

## VPC Peering

- No es transitivo: A↔B y B↔C NO significa A↔C
- Sin CIDR overlap permitido
- Cross-account y cross-region posible
- Necesitás actualizar route tables en ambos lados

## Lo que más pregunta el examen

1. **¿Puede acceder a internet?**: public subnet + IGW en route table + public IP asignada
2. **Private subnet necesita actualizar paquetes**: NAT Gateway
3. **Costo de datos**: tráfico entre AZs de la misma región = $0.01/GB; VPC Endpoint evita este costo para S3
4. **Site-to-site VPN vs Direct Connect**: VPN es rápido de configurar pero latencia variable; DX es latencia consistente y ancho de banda dedicado
5. **VPC Endpoint Interface** crea una ENI en tu subnet — tiene IP privada, necesita SG
