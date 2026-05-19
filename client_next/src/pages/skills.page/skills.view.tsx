"use client"

import MainEnterMotion from "@/src/components/enter.motion/main.enter.motion"
import Navigation from "@/src/components/nav/nav"

import SkillsPageMainText from "./skills.page.main.text"
import SkillsPageList from "./skills.page.list"
import SkillsPageBoard from "./skills.page.board"

import { useState } from "react"


export default function SkillsPage () {
    const [activeSkill, setActiveSkill] = useState<string>("frontend")

    const getActiveSkill = (skill: string) =>{
        setActiveSkill(skill)
    }

    return (
        <div className="SkillsPage">
            <MainEnterMotion text = "SKILLS" />
            <Navigation />
            <div className="SkillsPageMain">
                <div className="SkillsPageMainLeft">
                    <SkillsPageMainText />
                    <SkillsPageBoard activeSkill = {activeSkill} />
                </div>
                <div className="SkillsPageMainRight">
                    <SkillsPageList activeSkill = {getActiveSkill} />
                </div>
            </div>
        </div>
    )
}