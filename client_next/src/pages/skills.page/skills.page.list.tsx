import { useState } from "react";
import skillsData from "./skillsData";
import { motion } from "framer-motion";

type SkillKey = keyof typeof skillsData;

interface SkillsPageListProps {
    activeSkill: (id: SkillKey) => void;
}

export default function SkillsPageList({ activeSkill }: SkillsPageListProps) {
    const skills = Object.entries(skillsData) as [SkillKey, typeof skillsData[SkillKey]][];
    const [activeSkillId, setActiveSkillId] = useState<SkillKey>("frontend");

    return (
        <div className="SkillsPageList">
            {skills.map(([id, skill]) => {
                const isActive = activeSkillId === id;

                return (
                    <motion.div
                        className="SkillsPageListCarts"
                        key={id}
                        onClick={() => {
                            setActiveSkillId(id);
                            activeSkill(id);
                        }}
                        initial={{ scale: 1 }}
                        animate={{ scale: isActive ? 1.03 : 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="SkillsPageListCartTitle">
                            <h1>{skill.title}</h1>
                        </div>

                        <div className="SkillsPageListCartDescription">
                            <p>{skill.short}</p>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}