import { motion, useScroll, useTransform } from "framer-motion";

export default function AboutSectionMainText() {
    const { scrollYProgress } = useScroll();

    const moveLeft = useTransform(scrollYProgress, [0, 1], [-50, 0])
    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
    return (
        <div className="AboutSectionMainText">
            <motion.div style={{y: moveLeft, opacity: opacity}}>
                <h1>ABOUT <span>ME</span></h1>
            </motion.div>
        </div>
    )
}