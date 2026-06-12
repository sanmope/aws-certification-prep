// AWS Certification Prep — Profile Data
// Edit this file to update your dashboard.
// Use /progress <domain> <0-100> in Claude to update automatically.

window.PROFILE_DATA = {

  meta: {
    name: "Santiago Lopez",
    github: "sanmope",
    lastUpdated: "2026-06-12",
    currentFocus: "saa-c03",
    targetRoles: ["Cloud Solutions Architect", "Senior Backend Engineer", "ML Engineer"]
  },

  // ─── PROFESSIONAL SKILLS RADAR ─────────────────────────────────────────────
  // Score 0-100. Update as you grow. Evidence-based only.
  // radarSnapshot: snapshot anterior para mostrar delta en el gráfico.
  // Actualizar radarSnapshot ANTES de editar radar cuando haya cambios reales.
  radarSnapshot: {
    label: "Baseline jun-2026",
    scores: [88, 85, 83, 80, 78, 68, 65, 62, 60, 55]
  },

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
            { name: "IAM (users, roles, policies, SCPs)",    introProgress: 70, quizScore: 80,   practiced: true },
            { name: "VPC Security (NACLs, Security Groups)", introProgress: 65, quizScore: null, practiced: false },
            { name: "KMS & encryption at rest/transit",      introProgress: 0,  quizScore: null, practiced: false },
            { name: "Shield, WAF, Macie, GuardDuty",         introProgress: 0,  quizScore: null, practiced: false },
            { name: "S3 bucket policies & pre-signed URLs",  introProgress: 0,  quizScore: null, practiced: false }
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

  // ─── TIME TRACKING ─────────────────────────────────────────────────────────
  // Planned vs actual time. Updated by /session and /progress commands.
  timeTracking: {
    planStart: "2026-06-11",
    targetExamDate: null,          // set when scheduled: "YYYY-MM-DD"
    plannedWeeks: 8,
    plannedHoursPerWeek: 7,        // ~1h/día en días de semana

    // Planned hours per study block (ordered by study sequence)
    domainPlan: [
      { id: "d1-secure",    label: "D1 Secure",      cert: "saa-c03", plannedHours: 16, studyWeeks: "1-2" },
      { id: "d2-resilient", label: "D2 Resilient",   cert: "saa-c03", plannedHours: 13, studyWeeks: "3-4" },
      { id: "d4-cost",      label: "D4 Cost",        cert: "saa-c03", plannedHours: 10, studyWeeks: "5"   },
      { id: "d3-perf",      label: "D3 Performance", cert: "saa-c03", plannedHours: 11, studyWeeks: "6"   },
      { id: "practice",     label: "Practice Exams", cert: "saa-c03", plannedHours: 10, studyWeeks: "7-8" }
    ]
  },

  // ─── STUDY LOG ─────────────────────────────────────────────────────────────
  // Auto-populated via /session command.
  // Format: { date, cert, domainId, domain, minutes, notes }
  // domainId must match an id in timeTracking.domainPlan
  studyLog: [
    { "date": "2026-06-11", "cert": "saa-c03", "domainId": "d1-secure", "domain": "D1 Secure Architectures", "minutes": 45, "notes": "IAM deep dive + analogías Linux (users/groups/sudoers → IAM Users/Groups/Policies/Roles)" },
    { "date": "2026-06-11", "cert": "saa-c03", "domainId": "practice",  "domain": "Setup",                   "minutes": 98, "notes": "Dashboard + notes.html: sistema three-stage (introProgress/quizScore/practiced), popovers, radar snapshot" },
    { "date": "2026-06-12", "cert": "saa-c03", "domainId": "d1-secure", "domain": "D1 Secure Architectures", "minutes": 30, "notes": "VPC Security: NACLs, Security Groups, puertos efímeros, patrón 3 capas" },
    { "date": "2026-06-12", "cert": "saa-c03", "domainId": "practice",  "domain": "Lab IAM",                 "minutes": 45, "notes": "Lab boto3: IAM Role + trust policy + least privilege S3. GET ✓, PutObject ✗, ListBuckets ✗" },
    { "date": "2026-06-12", "cert": "saa-c03", "domainId": "d1-secure", "domain": "D1 Secure Architectures", "minutes": 20, "notes": "Quiz IAM 5 preguntas — 4/5 (80%). Débil: cross-account DynamoDB → role assumption, no resource-based policy" },
    { "date": "2026-06-12", "cert": "saa-c03", "domainId": "d1-secure", "domain": "D1 Secure Architectures", "minutes": 30, "notes": "VPC Security profundizado: ENI (NIC virtual, SGs se attachan al ENI), analogía OSI (SG y NACL ambos L3/L4, WAF es L7), SSM Parameter Store, Tags. lab_vpc_security.py creado, pendiente correr." },
    { "date": "2026-06-12", "cert": "saa-c03", "domainId": "practice",  "domain": "Referencia",              "minutes": 15, "notes": "Glosario agregado a notes.html: 32 siglas (ACL, ALB, ARN, ENI, NACL, SCP, STS, VPC, WAF, etc.) ordenadas alfabéticamente." }
  ]

};
