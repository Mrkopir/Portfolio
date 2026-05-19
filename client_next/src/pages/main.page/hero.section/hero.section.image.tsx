"use client"

import { useRef } from "react";

import { motion, useScroll, useTransform } from "framer-motion"


export default function HeroSectionImage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const moveDown = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  return (
    <motion.div
        ref={ref}
        style={{y: moveDown, opacity: opacity}}
    >
      <div className= "HeroSectionImage">
        <picture>
          <img src = "/myPhoto.png" alt = "MyImage" />
        </picture>
      </div>
    </motion.div>
  )
}
