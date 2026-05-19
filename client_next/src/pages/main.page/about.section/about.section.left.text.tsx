import { useScroll, useTransform, motion } from "framer-motion";

export default function AboutSectionLeftText() {
    const { scrollYProgress } = useScroll();

    const moveLeft = useTransform(scrollYProgress, [0, 1], [100, 0])
    const moveRight = useTransform(scrollYProgress, [0, 1], [-100, 0])
    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
    return (
        <div className="AboutSectionLeftText">
            <motion.div style={{x: moveLeft, opacity: opacity}}>
                <p>I’m a Fullstack Developer, aspiring SecDevOps Engineer, and SOC Analyst with a strong focus on building and understanding secure, scalable systems.</p>
            </motion.div>
            <motion.div style={{x: moveRight, opacity: opacity}}>
                <p>I work across the full stack — backend development, API design, frontend interfaces, and server infrastructure. I also deploy applications using Docker and manage basic server environments, aiming to understand how systems behave in production.</p>
            </motion.div>
            <motion.div style={{x: moveLeft, opacity: opacity}}>
                <p>Alongside development, I have hands-on interest in cybersecurity and SOC analysis — including monitoring, security fundamentals, and understanding how attacks and system behavior are detected and analyzed.</p>
            </motion.div>
            <motion.div style={{x: moveLeft, opacity: opacity}}>
                <p>My tech stack includes Node.js, Express, MongoDB, React, TypeScript, and ASP.NET Core. I’m continuously improving in DevOps practices, infrastructure management, and security engineering.</p>
            </motion.div>
            <motion.div style={{x: moveLeft, opacity: opacity}}>
                <p>My goal is to bridge software development, infrastructure, and cybersecurity into one skill set for building secure and production-ready systems.</p>
            </motion.div>
        </div>
    )

}
