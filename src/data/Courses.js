const img = (seed) =>
  `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=1200&q=80`;

export const COURSES = [
  {
    id: "fullstack-web-dev",
    title: "Full-Stack Web Development",
    institution: "KIIT University",
    category: "Computer Science",
    mode: "Hybrid",
    duration: "6 months",
    fees: "₹35,000",
    budget: "Medium",
    level: "Intermediate",
    image: img("photo-1498050108023-c5249f4df085"),
    overview:
      "A career-focused program covering React, Node.js, databases, and modern deployment workflows with industry mentorship.",
    eligibility:
      "12th pass or undergraduate students with basic programming familiarity.",
    highlights: [
      "Live projects",
      "Industry mentors",
      "Placement support",
      "Modern stack",
    ],
  },
  {
    id: "ai-ml-foundations",
    title: "AI & Machine Learning Foundations",
    institution: "IIT Madras",
    category: "Artificial Intelligence",
    mode: "Online",
    duration: "4 months",
    fees: "₹22,000",
    budget: "Medium",
    level: "Beginner",
    image: img("photo-1677442136019-21780ecad995"),
    overview:
      "Build a rigorous foundation in Python, statistics, and machine learning models with hands-on labs and capstone.",
    eligibility:
      "Anyone with high-school mathematics and curiosity for AI.",
    highlights: [
      "Hands-on labs",
      "Capstone project",
      "IIT-certified",
      "Python first",
    ],
  },
  {
    id: "data-science-pro",
    title: "Data Science Professional Track",
    institution: "Coursera",
    category: "Data Science",
    mode: "Online",
    duration: "8 months",
    fees: "₹18,500",
    budget: "Low",
    level: "Intermediate",
    image: img("photo-1551288049-bebda4e38f71"),
    overview:
      "End-to-end data science program covering SQL, Python, ML, and storytelling — built for working professionals.",
    eligibility:
      "Graduates from any discipline. No coding background required.",
    highlights: [
      "Self-paced",
      "Portfolio projects",
      "Industry capstone",
      "Global cohort",
    ],
  },
  {
    id: "ux-design-systems",
    title: "UX & Design Systems",
    institution: "Udemy",
    category: "Design",
    mode: "Online",
    duration: "3 months",
    fees: "₹6,500",
    budget: "Low",
    level: "Beginner",
    image: img("photo-1561070791-2526d30994b8"),
    overview:
      "Design beautiful, accessible interfaces and ship reusable design systems with Figma and modern UX practice.",
    eligibility:
      "Open to all aspiring designers and product builders.",
    highlights: [
      "Figma deep-dive",
      "Real briefs",
      "Portfolio reviews",
      "Mentor feedback",
    ],
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps Engineering",
    institution: "Simplilearn",
    category: "Cloud Computing",
    mode: "Hybrid",
    duration: "5 months",
    fees: "₹42,000",
    budget: "Premium",
    level: "Advanced",
    image: img("photo-1451187580459-43490279c0fa"),
    overview:
      "Master AWS, Docker, Kubernetes, and CI/CD pipelines through real-world production scenarios.",
    eligibility:
      "Engineers with 1+ year of development experience.",
    highlights: [
      "AWS labs",
      "K8s deep dives",
      "Industry cases",
      "Career coach",
    ],
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing & Growth",
    institution: "Google",
    category: "Marketing",
    mode: "Online",
    duration: "2 months",
    fees: "Free",
    budget: "Free",
    level: "Beginner",
    image: img("photo-1432888622747-4eb9a8efeb07"),
    overview:
      "Google-certified curriculum covering SEO, performance marketing, analytics, and brand storytelling.",
    eligibility:
      "Open to everyone. No prior experience needed.",
    highlights: [
      "Google certified",
      "Real campaigns",
      "Analytics",
      "Free",
    ],
  },
  {
    id: "product-management",
    title: "Product Management Essentials",
    institution: "edX",
    category: "Business",
    mode: "Online",
    duration: "4 months",
    fees: "₹28,000",
    budget: "Medium",
    level: "Intermediate",
    image: img("photo-1552664730-d307ca884978"),
    overview:
      "Frameworks, discovery, prioritization, and storytelling — taught with real product case studies.",
    eligibility:
      "Working professionals with 1+ year of experience.",
    highlights: [
      "Case studies",
      "Frameworks",
      "Mentorship",
      "Network",
    ],
  },
  {
    id: "nptel-electronics",
    title: "Electronics & Embedded Systems",
    institution: "NPTEL",
    category: "Engineering",
    mode: "Online",
    duration: "6 months",
    fees: "Free",
    budget: "Free",
    level: "Intermediate",
    image: img("photo-1518770660439-4636190af475"),
    overview:
      "Comprehensive curriculum on circuits, microcontrollers, and embedded design — by India's leading professors.",
    eligibility:
      "Engineering students or self-learners.",
    highlights: [
      "NPTEL certified",
      "Lab kits",
      "Faculty led",
      "Free",
    ],
  },
];

export const CATEGORIES = [
  ...new Set(COURSES.map((course) => course.category)),
];

export const MODES = ["Online", "Hybrid", "On-campus"];

export const BUDGETS = ["Free", "Low", "Medium", "Premium"];

export const DURATIONS = [
  "1-3 months",
  "3-6 months",
  "6+ months",
];

export const INSTITUTIONS = [
  "KIIT University",
  "IIT Madras",
  "NPTEL",
  "Coursera",
  "Google",
  "Simplilearn",
  "Udemy",
  "edX",
];