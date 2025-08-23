const projects = [
  {
    id: 1,
    title: "Sistema de Citas Médicas",
    category: "web",
    sector: "healthcare",
    description:
      "Plataforma completa para gestión de citas médicas con autenticación, notificaciones y panel administrativo.",
    technologies: ["React", "Node.js", "PostgreSQL", "JWT", "Socket.io"],
    features: [
      "Autenticación segura",
      "Notificaciones en tiempo real",
      "Panel administrativo",
      "Gestión de historiales",
    ],
    demoUrl: "https://demo-citas.com",
    githubUrl: "https://github.com/user/citas-medicas",
    image: "/assets/projects/citas-medicas.png",
    challenges:
      "Gestión de concurrencia en reservas y sincronización en tiempo real",
    solutions:
      "Implementación de locks optimistas y WebSockets para actualizaciones instantáneas",
  },
  {
    id: 2,
    title: "Contigo Voy",
    category: "web",
    sector: "general",
    description:
      "Chatbot conversacional con procesamiento de lenguaje natural e integración con APIs externas.",
    technologies: ["Next.js", "OpenAI API", "Prisma", "TypeScript", "Tailwind"],
    features: [
      "NLP avanzado",
      "Contexto conversacional",
      "Integración multi-API",
      "Análisis de sentimientos",
    ],
    demoUrl: "https://demo-chatbot.com",
    githubUrl: "https://github.com/user/chatbot",
    image: "/assets/projects/contigovoy.png",
    challenges:
      "Mantener contexto conversacional y manejar múltiples intenciones",
    solutions:
      "Sistema de memoria conversacional y clasificación de intenciones con ML",
  },
  {
    id: 3,
    title: "Chatbot Inteligente",
    category: "web",
    sector: "general",
    description:
      "Chatbot conversacional con procesamiento de lenguaje natural e integración con APIs externas.",
    technologies: ["Next.js", "OpenAI API", "Prisma", "TypeScript", "Tailwind"],
    features: [
      "NLP avanzado",
      "Contexto conversacional",
      "Integración multi-API",
      "Análisis de sentimientos",
    ],
    demoUrl: "https://demo-chatbot.com",
    githubUrl: "https://github.com/user/chatbot",
    image: "/assets/projects/chatbot.png",
    challenges:
      "Mantener contexto conversacional y manejar múltiples intenciones",
    solutions:
      "Sistema de memoria conversacional y clasificación de intenciones con ML",
  },
  {
    id: 4,
    title: "Centro de Difusión de Tecnología",
    category: "web",
    sector: "general",
    description:
      "Plataforma para la difusión de conocimientos tecnológicos con recursos interactivos.",
    technologies: ["Next.js", "OpenAI API", "Prisma", "TypeScript", "Tailwind"],
    features: [
      "NLP avanzado",
      "Contexto conversacional",
      "Integración multi-API",
      "Análisis de sentimientos",
    ],
    demoUrl: "https://demo-chatbot.com",
    githubUrl: "https://github.com/user/chatbot",
    image: "/assets/projects/centro-difusion-tecnologica.png",
    challenges:
      "Mantener contexto conversacional y manejar múltiples intenciones",
    solutions:
      "Sistema de memoria conversacional y clasificación de intenciones con ML",
  },
  {
    id: 5,
    title: "AgriTrack Mobile",
    category: "mobile",
    sector: "agriculture",
    description:
      "Aplicación móvil para seguimiento de cultivos con geolocalización, registro de actividades y análisis de rendimiento en tiempo real.",
    technologies: ["React Native", "Firebase", "Node.js", "MongoDB", "GPS"],
    features: [
      "Geolocalización GPS",
      "Cámara integrada",
      "Notificaciones push",
      "Sincronización offline",
    ],
    demoUrl: "https://play.google.com/store/apps/details?id=com.agritrack",
    githubUrl: "https://github.com/user/agritrack-mobile",
    image: "/assets/projects/mobile/agritrack-mobile.png",
    challenges:
      "Sincronización offline y optimización de batería con GPS constante",
    solutions:
      "Implementación de cache local y algoritmos de optimización de batería",
  },
  {
    id: 6,
    title: "Predicción de Rendimiento Agrícola",
    category: "data",
    sector: "agriculture",
    description:
      "Sistema de análisis predictivo para optimizar rendimientos de cultivos usando datos climáticos y del suelo.",
    technologies: ["Python", "Scikit-learn", "Pandas", "Plotly", "FastAPI"],
    features: [
      "ML predictivo",
      "Análisis climático",
      "Visualizaciones interactivas",
      "API REST",
    ],
    demoUrl: "https://demo-agri.com",
    githubUrl: "https://github.com/user/agri-prediction",
    image: "/api/placeholder/600/400",
    challenges: "Calidad de datos heterogéneos y predicción a largo plazo",
    solutions: "Pipeline de limpieza de datos y ensemble de modelos ML",
  },
  {
    id: 7,
    title: "Monitor de Seguridad IoT",
    category: "cybersecurity",
    sector: "agriculture",
    description:
      "Sistema de monitoreo de seguridad para dispositivos IoT en entornos agrícolas.",
    technologies: ["Python", "Wireshark", "Elasticsearch", "Kibana", "Docker"],
    features: [
      "Detección de anomalías",
      "Análisis de tráfico",
      "Alertas automáticas",
      "Dashboard de seguridad",
    ],
    githubUrl: "https://github.com/user/iot-security",
    image: "/api/placeholder/600/400",
    challenges:
      "Análisis de protocolos IoT diversos y detección de falsos positivos",
    solutions:
      "Modelo de ML para detección de anomalías y rules engine personalizado",
  },
  {
    id: 8,
    title: "Dashboard de Análisis Hospitalario",
    category: "data",
    sector: "healthcare",
    description:
      "Plataforma de inteligencia de negocios para análisis de métricas hospitalarias y optimización de recursos.",
    technologies: ["React", "D3.js", "Python", "PostgreSQL", "Redis"],
    features: [
      "Visualizaciones interactivas",
      "KPIs en tiempo real",
      "Análisis predictivo",
      "Exportación de reportes",
    ],
    demoUrl: "https://demo-hospital.com",
    githubUrl: "https://github.com/user/hospital-dashboard",
    image: "/api/placeholder/600/400",
    challenges: "Procesamiento de grandes volúmenes de datos médicos sensibles",
    solutions: "Arquitectura de microservicios y encriptación end-to-end",
  },
  {
    id: 9,
    title: "Auditoría de Seguridad Web",
    category: "cybersecurity",
    sector: "general",
    description:
      "Herramienta automatizada para auditoría de seguridad web con detección de vulnerabilidades OWASP.",
    technologies: [
      "Python",
      "Selenium",
      "BeautifulSoup",
      "SQLAlchemy",
      "Flask",
    ],
    features: [
      "Escaneo OWASP Top 10",
      "Reportes detallados",
      "Análisis automatizado",
      "Integración CI/CD",
    ],
    githubUrl: "https://github.com/user/web-security-audit",
    image: "/api/placeholder/600/400",
    challenges: "Detección precisa de vulnerabilidades sin falsos positivos",
    solutions:
      "Múltiples técnicas de validación y sistema de scoring inteligente",
  },
];

export default projects;
