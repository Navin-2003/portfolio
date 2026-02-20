// ============================================================
//  PORTFOLIO CONFIG — Edit everything here, nothing else!
//  Hosted at: config.js
// ============================================================

window.PORTFOLIO_CONFIG = {

  // ── PERSONAL INFO ─────────────────────────────────────────
  name:        "Navin Suresh",
  initials:    "NS",
  tagline:     "Cybersecurity Analyst | SOC | Digital Forensics",
  bio:         "Cybersecurity & Digital Forensics graduate with hands-on experience in threat detection, vulnerability analysis, network security, and incident response. Passionate about protecting systems, analyzing attacks, and building secure solutions for real-world environments.",
  location:    "Kakkanad, Kerala, India",
  email:       "navinsuresh2003@gmail.com",
  cvPath:      "./assets/docs/Navin_Suresh_CV.pdf",  // put your CV here
  available:   true,   // set false to show "Not available"
  openTo:      ["SOC Analyst", "Digital Forensics Investigator", "Cybersecurity Analyst", "Threat Intelligence Analyst"],

  // ── SOCIAL LINKS ──────────────────────────────────────────
  social: {
    github:   "https://github.com/Navin-2003",
    linkedin: "https://www.linkedin.com/in/navinsuresh2003/",
    discord:  "https://discord.com/users/870572186233081927",
    // twitter: "https://twitter.com/yourhandle",  // uncomment to add
    // email is auto-generated from above
  },

  // ── SEO / OPEN GRAPH ──────────────────────────────────────
  seo: {
    title:       "Navin Suresh | Cybersecurity Portfolio",
    description: "Cybersecurity Analyst, SOC Specialist & Digital Forensics Investigator. Projects on threat detection, network security and AI-based analysis.",
    url:         "https://navinsuresh.dev",    // ← change to your live URL
    ogImage:     "./assets/img/og-image.png", // 1200×630px recommended
    keywords:    "Navin Suresh, Cybersecurity, SOC Analyst, Digital Forensics, Network Security, Threat Detection, Ethical Hacking, Kerala",
  },

  // ── CONTACT FORM (Formspree) ──────────────────────────────
  // 1. Go to https://formspree.io → Create account → New Form
  // 2. Copy the endpoint URL and paste below
  formspreeEndpoint: "https://formspree.io/f/YOUR_FORM_ID",  // ← replace this

  // ── SERVICES ──────────────────────────────────────────────
  services: [
    {
      num:   "01",
      icon:  "🔍",
      title: "Vulnerability Assessment",
      desc:  "Identification, analysis, and detailed reporting of vulnerabilities in systems, applications, and network infrastructure.",
    },
    {
      num:   "02",
      icon:  "📡",
      title: "SOC & Threat Monitoring",
      desc:  "Real-time monitoring, log analysis, and advanced threat detection using SIEM techniques and behavioral analysis.",
    },
    {
      num:   "03",
      icon:  "🔬",
      title: "Digital Forensics",
      desc:  "Collection, preservation, and forensic analysis of digital evidence from compromised devices, systems, and networks.",
    },
    {
      num:   "04",
      icon:  "🛡️",
      title: "Network Security",
      desc:  "Firewall configuration, IDS/IPS deployment, encryption protocols, and secure network architecture design.",
    },
  ],

  // ── PROJECTS ──────────────────────────────────────────────
  // terminal: fake terminal lines shown inside project card screen
  projects: [
    {
      id:     "001",
      title:  "AI Threat & Toxic Comment Detection",
      desc:   "NLP-powered system that analyzes YouTube comments to detect abusive content, threats, and cyber-hate speech using machine learning classification.",
      stack:  ["Python", "NLP", "scikit-learn", "Flask", "Pandas"],
      repo:   "https://github.com/Navin-2003",          // ← replace with real repo
      live:   "",                                         // ← add live demo URL or leave ""
      terminal: [
        "> LOADING MODEL...",
        "> ANALYZING COMMENTS [████████] 98%",
        "> THREAT_LEVEL: HIGH :: 47 FLAGGED",
        "> TOXIC_SCORE: 0.89 — ACTION: BLOCK",
      ],
      features: [
        "Real-time comment analysis",
        "Multi-class toxic classification",
        "Threat score generation",
        "REST API endpoint",
      ],
      status: "COMPLETED",
    },
    {
      id:     "002",
      title:  "Python Network Vulnerability Scanner",
      desc:   "Python-based tool to discover open ports, running services, and weak configurations across network infrastructure with automated reporting.",
      stack:  ["Python", "Nmap", "Socket", "Requests", "ReportLab"],
      repo:   "https://github.com/Navin-2003",          // ← replace
      live:   "",
      terminal: [
        "> SCANNING 192.168.1.0/24...",
        "> PORT 22: OPEN [SSH]",
        "> PORT 80: OPEN [HTTP]",
        "> WEAK CONFIG DETECTED ⚠",
      ],
      features: [
        "Port & service enumeration",
        "Weak config detection",
        "CVE correlation",
        "PDF report export",
      ],
      status: "COMPLETED",
    },
    {
      id:     "003",
      title:  "Digital Forensics Case Investigation",
      desc:   "Forensic analysis of compromised systems including memory dumps, log analysis, timeline reconstruction, and digital evidence artifact recovery.",
      stack:  ["Autopsy", "Volatility", "FTK Imager", "Wireshark", "Python"],
      repo:   "https://github.com/Navin-2003",          // ← replace
      live:   "",
      terminal: [
        "> MOUNTING DISK IMAGE...",
        "> RECOVERING ARTIFACTS [██████] 79%",
        "> LOG ANALYSIS: 2,341 ENTRIES",
        "> EVIDENCE CHAIN: INTACT ✓",
      ],
      features: [
        "Memory forensics",
        "Log timeline analysis",
        "Artifact recovery",
        "Evidence chain documentation",
      ],
      status: "COMPLETED",
    },
    // ── ADD MORE PROJECTS LIKE THIS: ──────────────────────────
    // {
    //   id:     "004",
    //   title:  "Your New Project",
    //   desc:   "Description here.",
    //   stack:  ["Tool1", "Tool2"],
    //   repo:   "https://github.com/Navin-2003/your-repo",
    //   live:   "https://yourproject.live",
    //   terminal: ["> LOADING...", "> DONE"],
    //   features: ["Feature 1", "Feature 2"],
    //   status: "IN PROGRESS",  // or "COMPLETED"
    // },
  ],

  // ── QUALIFICATIONS / EDUCATION ────────────────────────────
  education: [
    {
      year:   "2021 – 2025",
      degree: "B.Sc. Cybersecurity & Digital Forensics",
      school: "University — Kerala, India",
      desc:   "Specialized in threat detection, vulnerability analysis, digital evidence handling, network defense, and incident response.",
    },
    {
      year:   "2019 – 2021",
      degree: "Higher Secondary Education (Science)",
      school: "Kerala State Board",
      desc:   "Computer Science, Mathematics, Physics stream.",
    },
    // ── ADD MORE: ─────────────────────────────────────────────
    // { year: "2023", degree: "...", school: "...", desc: "..." },
  ],

  // ── CERTIFICATIONS ────────────────────────────────────────
  certifications: [
    { year: "2023", name: "SOC Analyst Fundamentals",          org: "Security Operations Center Training" },
    { year: "2022", name: "Network Security & Ethical Hacking", org: "Professional Certification" },
    { year: "2022", name: "Python for Cybersecurity",           org: "Coursera / Udemy" },
    { year: "2023", name: "Digital Forensics Fundamentals",     org: "Professional Development" },
    // { year: "2024", name: "CompTIA Security+",                org: "CompTIA" },
  ],

  // ── SKILLS (with proficiency 0–100) ───────────────────────
  skills: [
    { name: "Threat Detection & Analysis", pct: 90 },
    { name: "Digital Forensics",           pct: 85 },
    { name: "Vulnerability Assessment",    pct: 82 },
    { name: "Network Security",            pct: 80 },
    { name: "Incident Response",           pct: 78 },
    { name: "Python Scripting",            pct: 80 },
    { name: "SIEM / Log Analysis",         pct: 75 },
    { name: "Ethical Hacking / PenTest",   pct: 72 },
    { name: "NLP / Machine Learning",      pct: 65 },
  ],

  // ── TOOLS (grouped by category) ───────────────────────────
  tools: [
    { cat: "Forensics",  items: ["Autopsy", "Volatility", "FTK Imager", "Binwalk", "Foremost"] },
    { cat: "Network",    items: ["Wireshark", "Nmap", "Snort", "Netcat", "tcpdump"] },
    { cat: "Pentest",    items: ["Metasploit", "Burp Suite", "Nessus", "Nikto", "Hydra"] },
    { cat: "Scripting",  items: ["Python", "Bash", "PowerShell"] },
    { cat: "ML / AI",    items: ["scikit-learn", "NLTK", "TensorFlow"] },
    { cat: "SIEM",       items: ["Splunk", "ELK Stack", "QRadar"] },
    { cat: "OS",         items: ["Kali Linux", "Ubuntu", "Windows", "REMnux"] },
  ],

};
