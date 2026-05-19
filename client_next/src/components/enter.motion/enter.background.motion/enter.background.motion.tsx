"use client"

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import EnterProgressMotion from "../enter.text.motion/enter.progress.motion"

export default function EnterBackgroundMotion ({text}: {text: string}) {
    const [showBackground, setShowBackground] = useState(true)

    useEffect(() => {
        const BackgroundInterval = setInterval(() => {setShowBackground(false)}, 2500)
        return () => clearTimeout(BackgroundInterval)
    }, [])

    return(
        <AnimatePresence>
            {showBackground && (
                <motion.div
                    className="motionBackground"
                    initial = {{y: "0%", opacity: 1}}
                    exit={{y: "-100%", opacity: 0}}
                    transition={{duration: 0.9}}
                >
                <EnterProgressMotion text = {text} />
                </motion.div>
            )}
        </AnimatePresence>
    )
}