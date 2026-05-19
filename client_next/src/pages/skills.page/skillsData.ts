interface Skill {
  title: string;
  short: string;
  long: string;
  tools: string[];
  level: string;
}

const skillsData: Record<string, Skill> = {
  frontend: {
    title: "Frontend",
    short: "Building clean and responsive interfaces.",
    long: "I build modern web interfaces using React and TypeScript, focusing on component-based architecture, performance, and usability. I aim to keep UI simple, fast, and maintainable, with attention to UX and responsiveness.",
    tools: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
    level: "Junior"
  },

  backend: {
    title: "Backend",
    short: "API design and server-side logic.",
    long: "I develop backend systems using Node.js and Express, focusing on secure REST APIs, authentication (JWT), and clean architecture. I work with databases like MongoDB and understand how to structure scalable backend services.",
    tools: ["Node.js", "Express", "TypeScript", "MongoDB", "JWT", "Bcrypt"],
    level: "Junior"
  },

  security: {
    title: "Cybersecurity",
    short: "Blue team fundamentals & SOC path.",
    long: "I’m actively developing skills in cybersecurity with focus on blue team practices: log analysis, network fundamentals, threat detection, and basic incident response. I practice on platforms like TryHackMe and study security fundamentals.",
    tools: ["Linux", "Wireshark", "TryHackMe", "Networking basics", "Log analysis", "Security fundamentals"],
    level: "Beginner → Junior SOC Analyst"
  },

  devops: {
    title: "DevSecOps / Deployment",
    short: "Deploying and securing applications.",
    long: "I deploy fullstack applications on Linux servers using Nginx, PM2, and Docker basics. I understand how to manage services over SSH and maintain uptime, while gradually integrating security practices into deployment workflows.",
    tools: ["Linux", "Nginx", "PM2", "Docker (basic)", "SSH", "Ubuntu Server"],
    level: "Basic–Intermediate"
  },

  projects: {
    title: "Fullstack Projects",
    short: "Building real-world applications.",
    long: "I build fullstack applications to practice real-world architecture: authentication systems, REST APIs, state management, and persistence. Projects like Tamagotchi-style apps help me understand how frontend, backend, and storage work together.",
    tools: ["React", "Node.js", "Express", "REST API", "MongoDB", "TypeScript"],
    level: "Practical experience"
  },

  softSkills: {
    title: "Soft Skills",
    short: "Thinking, learning, adapting.",
    long: "I focus on structured thinking, continuous learning, and clear communication. I’m comfortable working independently, breaking down complex problems, and improving through hands-on practice.",
    tools: ["Problem-solving", "Self-learning", "Focus", "Analytical thinking", "Communication"],
    level: ""
  }
};

export default skillsData;