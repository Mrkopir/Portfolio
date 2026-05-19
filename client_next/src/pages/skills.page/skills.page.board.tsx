import skillsData from "./skillsData"

import { motion } from "framer-motion"

export default function SkillsPageBoard ({activeSkill}: {activeSkill: string}) {
    const skill = skillsData[activeSkill]

    return(
        <motion.div 
            className="SkillsPageBoard"
            key={activeSkill}
            initial = {{scale: 1, opacity: 1}}
            animate = {{x: ["-100%", "0%"], scale: [0, 1], opacity: [0, 1]}}
            transition={{duration: 0.5}}
        >
            {skill ? (
                <>
                    <h1>{skill.title}</h1>
                    <p>{skill.long}</p>
                    <h3>{skill.tools.join(" | ")}</h3>
                    <h2>{skill.level}</h2>
                </>
            ) : (
                <div className="SkillsPageBoardPlaceholder">
                    <div className="ContentPlaceholder SkillsPageBoardTitlePlaceholder Skeleton" />
                    <div className="SkillsPageBoardTextPlaceholder">
                        <span className="ContentPlaceholder Skeleton" />
                        <span className="ContentPlaceholder Skeleton" />
                        <span className="ContentPlaceholder Skeleton" />
                    </div>
                    <div className="ContentPlaceholder SkillsPageBoardToolsPlaceholder Skeleton" />
                    <div className="ContentPlaceholder SkillsPageBoardLevelPlaceholder Skeleton" />
                </div>
            )}
        </motion.div>
    )
}
