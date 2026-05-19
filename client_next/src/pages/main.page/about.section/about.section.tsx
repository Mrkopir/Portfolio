"use client"

import AboutSectionLeftText from "./about.section.left.text"
import AboutSectionRightImage from "./about.section.right.image"
import AboutSectionMainText from "./about.section.main.text"
import AboutSectionLeftList from "./about.section.left.list"

export default function AboutSection() {
    return (
        <div className="AboutSection">
            <div className="AboutSectionLeft">
                <AboutSectionLeftList/>
                <AboutSectionLeftText />
            </div>
            <div className="AboutSectionRight">
                <AboutSectionMainText />
                <AboutSectionRightImage />
            </div>
        </div>
    )
}