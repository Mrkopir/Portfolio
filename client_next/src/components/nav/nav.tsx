"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
const text: string[] = [
    "Volodymyr Chetvertynivskyi",
    "FullStack Developer",
    "Security & SecDevOps Enthusiast"
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % text.length);
    }, 9000);

    return () => clearInterval(textInterval);
  }, []);

  const onMenuClick = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="Navigation">
      <AnimatePresence mode="wait">
        <motion.div
          key={textIndex}
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          exit={{ x: "40%", opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <p>
            <Link href="/">{text[textIndex]}</Link>
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="Right-Side">
        <p>
          <Link href="/skills">My Skills</Link>
        </p>
        <p>
          <Link href="/works">Works</Link>
        </p>
        <p>
          <Link href="/contact">Contact</Link>
        </p>

        <button
          className={menuOpen ? "nav-icon HiddenBurger open" : "nav-icon HiddenBurger"}
          onClick={onMenuClick}
        >
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </button>
      </div>

      {menuOpen && <div className="Overlay" onClick={handleCloseMenu}></div>}

        <div className={menuOpen ? "PhoneMenu menu-items active" : "PhoneMenu"}>
        <button className="CloseButton" onClick={handleCloseMenu}>×</button>
            <ul>
                <li><a href="/client/public" onClick={handleCloseMenu}>Home</a></li>
                <li><a href="/skills" onClick={handleCloseMenu}>My Skills</a></li>
                <li><a href="/works" onClick={handleCloseMenu}>Works</a></li>
                <li><a href="/contact" onClick={handleCloseMenu}>Contact</a></li>
            </ul>
        </div>
    </div>
  );
}
