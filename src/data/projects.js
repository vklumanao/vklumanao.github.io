import centerPulseImg from "../../img/optimized/projects/center-pulse.webp";
import designSnapEduImg from "../../img/optimized/projects/designsnapedu.webp";
import cgbMotorPoolImg from "../../img/optimized/projects/cgb-motor-pool.webp";
import gwaCalculatorImg from "../../img/optimized/projects/gwa-calculator.webp";
import speechToTextImg from "../../img/optimized/projects/speech-to-text.webp";

export const projects = [
  {
    title: "CenterPulse: Affiliation and Management System",
    category: "Academic",
    stack: [
      "React",
      "Tailwind CSS",
      "JavaScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "CKAN",
    ],
    image: centerPulseImg,
    live: "#",
    github: "#",
    year: "2025",
    role: "Lead Developer",
    status: "Ongoing",
    featured: true,
    description:
      "A centralized web-based affiliation and management system for research centers, built to manage affiliates, departments, and center records through role-based admin workspaces, filtering tools, responsive dashboards, and export-ready reporting.",
  },
  {
    title: "DesignSnap EDU",
    category: "Academic",
    stack: ["HTML", "CSS", "JavaScript", "Bootstrap", "Chrome"],
    image: designSnapEduImg,
    live: "#",
    github: "https://github.com/jeremydanielestrada/DesignSnap-Edu",
    year: "2025",
    role: "Lead Developer",
    status: "Completed",
    featured: false,
    description:
      "An AI-powered Chrome Extension that scans and extracts HTML/CSS from web pages, evaluates design quality, and provides AI-driven feedback for web design improvement.",
  },
  {
    title: "Equipment Management System (Motor Pool)",
    category: "Web App",
    stack: ["Vue", "Vuetify"],
    image: cgbMotorPoolImg,
    live: "https://cgb-motorpol.vercel.app/",
    github: "https://github.com/vklumanao/equipment-management-system",
    year: "2025",
    role: "Frontend Developer",
    status: "Completed",
    featured: false,
    description:
      "An improved version that streamlines equipment tracking, maintenance schedules, and reporting workflows with a cleaner user interface.",
  },
  {
    title: "GWA Calculator",
    category: "Academic",
    stack: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    image: gwaCalculatorImg,
    live: "https://gwa-genie.vercel.app/",
    github: "https://github.com/vklumanao/gwa-calculator",
    year: "2024",
    role: "Full-stack Developer",
    status: "Completed",
    featured: false,
    description:
      "A web-based calculator that helps students compute General Weighted Average (GWA) quickly through a clean and responsive interface.",
  },
  {
    title: "Speech-to-Text",
    category: "Web App",
    stack: ["HTML", "CSS", "JavaScript", "Bootstrap", "Web Speech API"],
    image: speechToTextImg,
    live: "https://vklumanao.github.io/hci.github.io/",
    github: "https://github.com/vklumanao/hci.github.io",
    year: "2024",
    role: "Frontend Developer",
    status: "Completed",
    featured: false,
    description:
      "A browser application that converts spoken words into text using the Web Speech API for an interactive speech input experience.",
  },
];

export const projectCategories = ["All", "Web App", "Academic"];
