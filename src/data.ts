import { Category } from "./types";
import { BookCopy as BookCode, Blocks, Wrench } from "lucide-react";

export const categories: Category[] = [
  {
    id: "getting-started",
    name: "Getting Started",
    icon: "Compass",
    items: [
      {
        id: "alternate-roadmap",
        name: "Alternate Roadmap",
        icon: "book",
        path: "src/content/getting-started/alternate-roadmap.md",
      },
      {
        id: "languages-technologies",
        name: "Languages & Technologies",
        icon: "book",
        path: "src/content/getting-started/publish-your-docs.md",
      },
      {
        id: "resources",
        name: "Resources",
        icon: "book",
        path: "src/content/getting-started/resources.md",
      },
      {
        id: "ai-bonus",
        name: "Artificial Intelligence (Bonus)",
        icon: "book",
        path: "src/content/getting-started/artificial-intelligence-bonus.md",
      },
    ],
  },
  {
    id: "programming-languages",
    name: "Programming Languages",
    icon: "BookCode",
    items: [
      {
        id: "javascript",
        name: "JavaScript",
        icon: "devicon-javascript-plain colored",
        path: "src/content/programming-languages/javascript.md",
      },
      {
        id: "python",
        name: "Python",
        icon: "devicon-python-plain colored",
        path: "src/content/programming-languages/python.md",
      },
      {
        id: "c-cpp",
        name: "C / C++",
        icon: "devicon-c-plain colored",
        path: "src/content/programming-languages/c-c++.md",
      },
      {
        id: "bash",
        name: "Bash & PowerShell",
        icon: "devicon-bash-plain colored",
        path: "src/content/programming-languages/bash-and-powershell.md",
      },
      {
        id: "git",
        name: "Git & Github",
        icon: "devicon-git-plain colored",
        path: "src/content/programming-languages/git-and-github.md",
      },
      {
        id: "rust",
        name: "Rust",
        icon: "devicon-rust-plain colored",
        path: "src/content/programming-languages/rust.md",
      },
    ],
  },
  {
    id: "web-development",
    name: "Web & Software Development",
    icon: "Monitor",
    items: [
      {
        id: "html-css",
        name: "HTML & CSS",
        icon: "devicon-html5-plain colored",
        path: "src/content/web-and-software-development/html-and-css.md",
      },
      {
        id: "react",
        name: "React.JS",
        icon: "devicon-react-original colored",
        path: "src/content/web-and-software-development/react.js.md",
      },
      {
        id: "node",
        name: "Node.JS",
        icon: "devicon-nodejs-plain colored",
        path: "src/content/web-and-software-development/node.js.md",
      },
      {
        id: "express",
        name: "Express.JS",
        icon: "devicon-express-original colored",
        path: "src/content/web-and-software-development/express.js.md",
      },
      {
        id: "next",
        name: "Next.JS (Optional)",
        icon: "devicon-nextjs-plain colored",
        path: "src/content/web-and-software-development/next.js-optional.md",
      },
      {
        id: "tailwind",
        name: "Tailwind CSS (Optional)",
        icon: "devicon-tailwindcss-plain colored",
        path: "src/content/web-and-software-development/tailwind-css-optional.md",
      },
      {
        id: "typescript",
        name: "TypeScript (Optional)",
        icon: "devicon-typescript-plain colored",
        path: "src/content/web-and-software-development/typescript-optional.md",
      },
    ],
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity & Hacking",
    icon: "Shield",
    items: [
      {
        id: "cybersecurity-hacking",
        name: "Cybersecurity & Hacking",
        icon: "shield",
        path: "src/content/cybersecurity-and-hacking/cybersecurity-and-hacking.md",
      },
      {
        id: "ethical-hacking",
        name: "Ethical Hacking",
        icon: "shield",
        path: "src/content/cybersecurity-and-hacking/ethical-hacking.md",
      },
      {
        id: "bug-bounty",
        name: "Bug Bounty Hunting",
        icon: "shield",
        path: "src/content/cybersecurity-and-hacking/bug-bounty-hunting.md",
      },
      {
        id: "webapp-security",
        name: "Web Application Security (OWASP, Burp Suite)",
        icon: "shield",
        path: "src/content/cybersecurity-and-hacking/web-application-security-owasp-burp-suite.md",
      },
      {
        id: "network-penetration",
        name: "Network Penetration Testing",
        icon: "shield",
        path: "src/content/cybersecurity-and-hacking/network-penetration-testing.md",
      },
      {
        id: "reverse-engineering",
        name: "Reverse Engineering",
        icon: "shield",
        path: "src/content/cybersecurity-and-hacking/reverse-engineering.md",
      },
      {
        id: "malware-analysis",
        name: "Malware Analysis",
        icon: "shield",
        path: "src/content/cybersecurity-and-hacking/malware-analysis.md",
      },
      {
        id: "exploit-development",
        name: "Exploit Development",
        icon: "shield",
        path: "src/content/cybersecurity-and-hacking/exploit-development.md",
      },
    ],
  },
  {
    id: "backend-databases",
    name: "Backend & Databases",
    icon: "Database",
    items: [
      {
        id: "sql",
        name: "SQL (PostgreSQL, MySQL)",
        icon: "database",
        path: "src/content/backend-and-databases/sql-postgresql-mysql.md",
      },
      {
        id: "nosql",
        name: "NoSQL (MongoDB, Redis)",
        icon: "database",
        path: "src/content/backend-and-databases/nosql-mongodb-redis.md",
      },
      {
        id: "authentication",
        name: "Authentication & Security (JWT, OAuth, SSO)",
        icon: "database",
        path: "src/content/backend-and-databases/authentication-and-security-jwt-oauth-sso.md",
      },
    ],
  },
  {
    id: "devops-cloud",
    name: "DevOps & Cloud Security",
    icon: "Cloud",
    items: [
      {
        id: "docker-kubernetes",
        name: "Docker & Kubernetes",
        icon: "devicon-docker-plain colored",
        path: "src/content/devops-and-cloud-security/docker-and-kubernetes.md",
      },
      {
        id: "linux-security",
        name: "Linux Server Security",
        icon: "shield",
        path: "src/content/devops-and-cloud-security/linux-server-security.md",
      },
      {
        id: "cloud-platforms",
        name: "Cloud Platforms (AWS, GCP)",
        icon: "cloud",
        path: "src/content/devops-and-cloud-security/cloud-platforms-aws-gcp.md",
      },
      {
        id: "ci-cd",
        name: "CI/CD & DevSecOps",
        icon: "wrench",
        path: "src/content/devops-and-cloud-security/ci-cd-and-devsecops.md",
      },
    ],
  },
  {
    id: "reverse-engineering-automation",
    name: "Reverse Engineering & Automation",
    icon: "Cpu",
    items: [
      {
        id: "assembly",
        name: "Assembly (x86/x64, ARM)",
        icon: "code",
        path: "src/content/reverse-engineering-and-automation/assembly-x86-x64-arm.md",
      },
      {
        id: "ida-ghidra",
        name: "IDA Pro, Ghidra",
        icon: "code",
        path: "src/content/reverse-engineering-and-automation/ida-pro-ghidra.md",
      },
      {
        id: "python-automation",
        name: "Python Scripting for Automation",
        icon: "devicon-python-plain colored",
        path: "src/content/reverse-engineering-and-automation/python-scripting-for-automation.md",
      },
    ],
  },
  {
    id: "extras",
    name: "Extras (Advanced Topics)",
    icon: "Star",
    items: [
      {
        id: "ai-ml",
        name: "AI & Machine Learning (Optional)",
        icon: "star",
        path: "src/content/extras-advanced-topics/ai-and-machine-learning-optional.md",
      },
      {
        id: "blockchain-security",
        name: "Blockchain Security (Optional)",
        icon: "star",
        path: "src/content/extras-advanced-topics/blockchain-security-optional.md",
      },
      {
        id: "saas-startup",
        name: "SaaS & Startup Development",
        icon: "star",
        path: "src/content/extras-advanced-topics/saas-and-startup-development.md",
      },
    ],
  },
];
