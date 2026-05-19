import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link";

export default function HeroSectionText() {
  const { scrollYProgress } = useScroll();

  const moveRight = useTransform(scrollYProgress, [0, 1], [0, 100])
  const moveLeft = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  return (
    <div className= "HeroSectionText">
        <motion.div
          style={{x: moveRight, opacity: opacity}}
        >
          <h1>Volodymyr C.</h1>
        </motion.div>
        <motion.div
          style={{x: moveLeft, opacity: opacity}}
        >
          <h2>Fullstack Developer,</h2>
            <h2>Security & SecDevOps Enthusiast</h2>
        </motion.div>
        <motion.div
          style={{x: moveRight, opacity: opacity}}
        >
          <p>Building secure and scalable web applications, working with backend systems, deployment and server infrastructure.</p>
        </motion.div>
        <motion.div
          style={{x: moveLeft, opacity: opacity}}
        >
            <Link className="HeroSectionButton" href="/skills">
                My Skills
            </Link>
        </motion.div>
    </div>
  )
}
