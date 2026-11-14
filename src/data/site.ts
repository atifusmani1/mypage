// All factual detail comes from content/Atif_Usmani_UCI_DS_AI_ML.pdf.
type ResumeEntry = { name: string; role: string; summary: string; href?: string; external?: boolean }

export const resumeSections: { title: string; entries: ResumeEntry[] }[] = [
  { title: 'Education', entries: [
    { name: 'UC Irvine', role: 'B.S. Data Science', summary: 'Expected June 2027' },
  ] },
  { title: 'Work', entries: [
    { name: 'Entegris', role: 'Digital Manufacturing Systems Engineer Co-op', summary: 'AI infra + edge computing + ML', href: '/work' },
    { name: 'Caliber Boards', role: 'Machine Learning Engineer Intern', summary: 'XGBoost + risk modeling', href: '/work' },
    { name: 'CUSM', role: 'Data Analyst Intern', summary: 'Analytics + dashboards + ETL', href: '/work' },
  ] },
  { title: 'Leadership', entries: [
    { name: 'MTC UCI', role: 'Founder', summary: 'Space for building and growth', href: 'https://www.instagram.com/mtcuci', external: true },
  ] },
  { title: 'Projects', entries: [
    { name: 'Solar Shield', role: 'Solar Cyber Risk Engine', summary: 'Geospatial analysis + cyber risk', href: '/projects' },
    { name: 'Parallax AI', role: 'Multi-Agent Decision Debate', summary: 'Agentic AI + streaming systems', href: '/projects' },
  ] },
  { title: 'Research', entries: [
    { name: 'BIAS Lab', role: 'Sensorimotor AI', summary: 'Causal learning + AI agents', href: '/research' },
    { name: 'Cell Universe Lab', role: 'Computational biology', summary: 'PCA + cell colony prediction', href: '/research' },
  ] },
]

export type ResumeDetail = {
  category: 'experience' | 'projects' | 'research'
  slug: string
  title: string
  role: string
  period: string
  location: string
  points: string[]
  description?: string
  video?: { id: string; title: string }
}

export const resumeDetails: ResumeDetail[] = [
  {
    category: 'experience', slug: 'entegris', title: 'Entegris',
    role: 'Digital Manufacturing Systems Engineer Co-op', period: 'July 2026–Present', location: 'Bedford, MA',
    points: [
      'Led an edge-to-cloud manufacturing data pilot supporting 1,000+ process-variable sensor readings per second.',
      'Deployed a Dockerized edge stack to a segmented network and designed northbound integration with GCP.',
      'Configured OPC UA connectivity to SCADA and standardized process data through Digital Twin asset models.',
      'Developed an edge parameter optimization model reaching an R² of 0.93.',
      'Built a Grafana performance dashboard covering 6 KPIs from live time-series data through Prometheus.',
    ],
  },
  {
    category: 'experience', slug: 'caliber-boards', title: 'Caliber Boards',
    role: 'Machine Learning Engineer Intern', period: 'March–June 2026', location: 'Irvine, CA',
    points: [
      'Implemented an XGBoost model for candidate risk assessment, improving AUC by 33% over baseline.',
      'Populated PostgreSQL with 493 candidate profiles, joining raw data on 1,200+ platform users.',
      'Developed a data pipeline resolving UUID discrepancies and merging 725 records into a training dataset.',
    ],
  },
  {
    category: 'experience', slug: 'cusm', title: 'California University of Science and Medicine',
    role: 'Data Analyst Intern', period: 'June–August 2025', location: 'Colton, CA',
    points: [
      'Built a Power BI dashboard analyzing 105,000+ visitors and 4,000+ item requests across 4 databases.',
      'Designed interactive visuals and measures demonstrating a greater than 2× increase in location traffic.',
      'Automated end-to-end data refresh through a scheduled ETL pipeline, cutting manual update time by 90%.',
    ],
  },
  {
    category: 'projects', slug: 'solar-shield', title: 'Solar Shield', role: 'Solar Cyber Risk Engine',
    period: '', location: '',
    video: { id: 'QmdkmZo6SoU', title: 'Solar Shield demo' },
    description: 'A solar cyber risk engine combining geospatial analysis, address lookup, and solar vulnerability data to assess risk across ZIP codes and vendors.',
    points: [
      'Clustered 32,958 ZIP codes into 5 solar cyber risk tiers using K-means on property, income, and cyber data.',
      'Developed a FastAPI backend with property lookup through the Melissa API and deck.gl for address analysis.',
      'Curated 57 solar CVEs from the NIST NVD and scored 9 solar inverter vendors on exploit severity.',
    ],
  },
  {
    category: 'projects', slug: 'parallax-ai', title: 'Parallax AI', role: 'Multi-Agent Decision Debate',
    period: '', location: '',
    video: { id: '8roUg4E-9MI', title: 'Parallax AI demo' },
    description: 'A multi-agent debate system that models cognitive biases through LLM-powered agents, with asynchronous streaming of their debates.',
    points: [
      'Integrated LLM APIs into a multi-agent backend service modeling cognitive biases in decision-making.',
      'Built an asynchronous FastAPI backend with streaming SSE responses for real-time agent debates.',
      'Deployed a containerized AI service with Docker and Railway, supporting live API traffic.',
    ],
  },
  {
    category: 'research', slug: 'bias-lab', title: 'BIAS Lab', role: 'Sensorimotor AI', period: '', location: 'UC Irvine',
    points: [
      'Developed a causal sensorimotor framework to train AI agents to learn environmental dynamics through actions and sensory feedback.',
      'Modeled an action-conditioned prediction pipeline.',
    ],
  },
  {
    category: 'research', slug: 'cell-universe-lab', title: 'Cell Universe Lab', role: 'Computational biology', period: '', location: 'UC Irvine',
    points: [
      'Engineered a PCA-based algorithm predicting cell colony behavior with 95%+ biological accuracy.',
      'Optimized the pipeline for 6× spatial resolution and 40% less computational overhead.',
    ],
  },
]
