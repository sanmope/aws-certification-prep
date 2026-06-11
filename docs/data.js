// AWS Certification Prep — Profile Data
// Edit this file to update your dashboard.
// Use /progress <domain> <0-100> in Claude to update automatically.

window.PROFILE_DATA = {

  meta: {
    name: "Santiago Lopez",
    github: "sanmope",
    lastUpdated: "2026-06-11",
    currentFocus: "saa-c03",
    targetRoles: ["Cloud Solutions Architect", "Senior Backend Engineer", "ML Engineer"]
  },

  // ─── PROFESSIONAL SKILLS RADAR ─────────────────────────────────────────────
  // Score 0-100. Update as you grow. Evidence-based only.
  radar: [
    { label: "Python Backend",    score: 88, notes: "FastAPI async, CQRS, circuit breaker, repository pattern" },
    { label: "System Design",     score: 85, notes: "Multi-project arquitecturas documentadas con design decisions" },
    { label: "API / Integration", score: 83, notes: "REST, streaming XML, OpenAPI, threat intel connectors" },
    { label: "Distributed Sys",   score: 80, notes: "Celery, Redis broker, backoff, worker pools" },
    { label: "Databases",         score: 78, notes: "PostgreSQL MVCC, async SQLAlchemy, Alembic, Redis, MongoDB" },
    { label: "ML / Data Eng",     score: 68, notes: "SageMaker, PySpark, LangChain RAG, anomaly detection" },
    { label: "DevOps / Infra",    score: 65, notes: "Docker compose, K8s (5G lab), deployment automation" },
    { label: "Security / Detect", score: 62, notes: "MITRE ATT&CK, threat intel, ML-based anomaly detection" },
    { label: "Networking",        score: 60, notes: "5G SA core, iptables, TCP/IP" },
    { label: "Cloud / AWS",       score: 55, notes: "SageMaker prod, conceptual sólido, interfaces AWS en progreso" }
  ],

  // ─── CAREER ROLE FIT ───────────────────────────────────────────────────────
  roles: [
    { name: "Senior Backend Engineer",  match: 88, color: "#3fb950", gap: "Cloud depth — SAA-C03 resuelve esto" },
    { name: "Integration Engineer",     match: 85, color: "#3fb950", gap: "Enterprise tools (MuleSoft) — no crítico" },
    { name: "ML Engineer",              match: 72, color: "#d29922", gap: "MLOps, feature stores, MLS-C01" },
    { name: "Platform / DevOps Eng",    match: 68, color: "#d29922", gap: "Terraform/IaC, CI/CD pipelines" },
    { name: "Detection Engineer",       match: 65, color: "#d29922", gap: "SIEM, threat hunting, incident response" },
    { name: "Cloud Architect",          match: 62, color: "#d29922", gap: "AWS certs (SAA → SAP), IaC depth" }
  ],

  // ─── CAREER GROWTH AREAS ──────────────────────────────────────────────────
  // Areas to measure and improve for exponential career growth
  growth: [
    {
      area: "AWS Cloud Depth",
      score: 55,
      priority: "critical",
      impact: "Certificaciones multiplican el valor de mercado 30-50%",
      actions: [
        "SAA-C03 en 8 semanas (arranca ya)",
        "Hands-on labs en AWS Free Tier",
        "Build arquitecturas de referencia reales"
      ]
    },
    {
      area: "Infrastructure as Code",
      score: 35,
      priority: "critical",
      impact: "Desbloquea roles Cloud Architect y Platform Engineer",
      actions: [
        "Terraform para el lab 5G en AWS",
        "CDK con Python (te viene natural)",
        "CloudFormation básico para SAA-C03"
      ]
    },
    {
      area: "CI/CD & GitOps",
      score: 45,
      priority: "high",
      impact: "Requerido en todos los roles senior actuales",
      actions: [
        "GitHub Actions pipeline completo para un proyecto tuyo",
        "ArgoCD en el lab K8s",
        "AWS CodePipeline para DVA-C02"
      ]
    },
    {
      area: "Observability & Monitoring",
      score: 50,
      priority: "high",
      impact: "Diferenciador en entrevistas de system design",
      actions: [
        "OpenTelemetry en el proyecto Fever o sanmope",
        "CloudWatch dashboards hands-on",
        "Grafana + Prometheus en K8s lab"
      ]
    },
    {
      area: "Technical Writing (EN)",
      score: 72,
      priority: "high",
      impact: "Portfolio internacional, visibilidad en GitHub global",
      actions: [
        "Reescribí 3 READMEs clave en inglés",
        "Un post técnico en Dev.to o Medium",
        "Architecture decision records (ADRs) en inglés"
      ]
    },
    {
      area: "Open Source Presence",
      score: 30,
      priority: "medium",
      impact: "Credibilidad técnica, networking, oportunidades inbound",
      actions: [
        "1 PR a FastAPI, Celery, o SQLAlchemy",
        "Publicar el detection connector como proyecto público",
        "Star + fork activo en proyectos que usás"
      ]
    },
    {
      area: "System Design Communication",
      score: 75,
      priority: "medium",
      impact: "Crucial para roles senior+ y entrevistas en empresas grandes",
      actions: [
        "Practica el framework: Requirements → HLD → LLD → Tradeoffs",
        "Diagram as code (draw.io, Excalidraw) para cada arquitectura",
        "Mock interviews de system design"
      ]
    },
    {
      area: "Leadership & Mentoring",
      score: 40,
      priority: "medium",
      impact: "Staff/Principal Engineer y roles de architect",
      actions: [
        "Escribí tech talks o posts internos",
        "Mentorea a alguien junior en tu red",
        "Propone RFCs en proyectos actuales"
      ]
    }
  ],

  // ─── AWS CERTIFICATIONS ────────────────────────────────────────────────────
  certifications: [
    {
      id: "clf-c02",
      name: "Cloud Practitioner",
      code: "CLF-C02",
      recommended: false,
      status: "optional",
      note: "Skip recomendado — tu nivel técnico ya supera este examen. Tomarlo es opcional como warm-up.",
      overallProgress: 40,
      estimatedWeeks: 2,
      domains: []
    },
    {
      id: "saa-c03",
      name: "Solutions Architect Associate",
      code: "SAA-C03",
      recommended: true,
      status: "in_progress",
      note: "Primer objetivo — mapea directo a tu background de arquitectura",
      overallProgress: 0,
      estimatedWeeks: 8,
      examDate: null,
      domains: [
        {
          id: "d1",
          name: "Design Secure Architectures",
          weight: 30,
          progress: 0,
          subtopics: [
            { name: "IAM (users, roles, policies, SCPs)", done: false },
            { name: "VPC Security (NACLs, Security Groups)", done: false },
            { name: "KMS & encryption at rest/transit", done: false },
            { name: "Shield, WAF, Macie, GuardDuty", done: false },
            { name: "S3 bucket policies & pre-signed URLs", done: false }
          ]
        },
        {
          id: "d2",
          name: "Design Resilient Architectures",
          weight: 26,
          progress: 0,
          subtopics: [
            { name: "Multi-AZ vs Multi-Region", done: false },
            { name: "ELB (ALB vs NLB vs GLB)", done: false },
            { name: "Auto Scaling Groups", done: false },
            { name: "SQS, SNS, EventBridge", done: false },
            { name: "Route 53 routing policies", done: false },
            { name: "RDS Multi-AZ & read replicas", done: false }
          ]
        },
        {
          id: "d3",
          name: "Design High-Performing Architectures",
          weight: 24,
          progress: 0,
          subtopics: [
            { name: "EC2 instance types & use cases", done: false },
            { name: "RDS, Aurora, DynamoDB performance", done: false },
            { name: "ElastiCache (Redis vs Memcached)", done: false },
            { name: "CloudFront distributions", done: false },
            { name: "S3 Transfer Acceleration, Multipart", done: false },
            { name: "Lambda performance & concurrency", done: false }
          ]
        },
        {
          id: "d4",
          name: "Design Cost-Optimized Architectures",
          weight: 20,
          progress: 0,
          subtopics: [
            { name: "On-Demand vs Reserved vs Spot", done: false },
            { name: "S3 storage classes (lifecycle)", done: false },
            { name: "Serverless vs container tradeoffs", done: false },
            { name: "Cost Explorer & Budgets", done: false },
            { name: "Data transfer costs", done: false }
          ]
        }
      ]
    },
    {
      id: "dva-c02",
      name: "Developer Associate",
      code: "DVA-C02",
      recommended: true,
      status: "not_started",
      note: "Segundo paso — Lambda, DynamoDB, CI/CD AWS nativo",
      overallProgress: 0,
      estimatedWeeks: 6,
      examDate: null,
      domains: [
        { id: "d1", name: "Development with AWS Services", weight: 32, progress: 0, subtopics: [] },
        { id: "d2", name: "Security",                       weight: 26, progress: 0, subtopics: [] },
        { id: "d3", name: "Deployment",                     weight: 24, progress: 0, subtopics: [] },
        { id: "d4", name: "Troubleshooting & Optimization", weight: 18, progress: 0, subtopics: [] }
      ]
    },
    {
      id: "mls-c01",
      name: "Machine Learning Specialty",
      code: "MLS-C01",
      recommended: true,
      status: "not_started",
      note: "Tu diferenciador de mercado — backend + ML + cloud es rarísimo",
      overallProgress: 0,
      estimatedWeeks: 10,
      examDate: null,
      domains: [
        { id: "d1", name: "Data Engineering",                    weight: 20, progress: 0, subtopics: [] },
        { id: "d2", name: "Exploratory Data Analysis",           weight: 24, progress: 0, subtopics: [] },
        { id: "d3", name: "Modeling",                            weight: 36, progress: 0, subtopics: [] },
        { id: "d4", name: "ML Implementation & Operations",      weight: 20, progress: 0, subtopics: [] }
      ]
    }
  ],

  // ─── STUDY LOG ─────────────────────────────────────────────────────────────
  // Auto-populated via /session command. Format: { date, cert, domain, minutes, notes }
  studyLog: []

};
