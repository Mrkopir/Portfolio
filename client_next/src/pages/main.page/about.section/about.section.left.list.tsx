import { motion, useScroll, useTransform } from "framer-motion";

export default function AboutSectionLeftList() {
    const { scrollYProgress } = useScroll();

    const moveLeft = useTransform(scrollYProgress, [0, 1], [100, 0])
    const moveRight = useTransform(scrollYProgress, [0, 1], [-100, 0])
    const moveDown = useTransform(scrollYProgress, [0, 1], [100, 0])
    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
    return (
        <div className="AboutSectionLeftList">
            <motion.div style={{x: moveRight, opacity: opacity}}><p>Able to learn</p></motion.div>
            <motion.div style={{y: moveDown, opacity: opacity}}><p>Communicable</p></motion.div>
            <motion.div style={{x: moveLeft, opacity: opacity}}><p>Purposeful</p></motion.div>
        </div>
    )
}