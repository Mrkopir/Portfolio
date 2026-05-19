import { useEffect, useMemo, useState } from "react";
import { projects } from "./info";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["FRONTEND", "BACKEND", "FULLSTACK"] as const;

interface WorksPageTableProps {
  sendImgPath: (path: string) => void;
}

export default function WorksPageTable({ sendImgPath }: WorksPageTableProps) {
  const [activeCategory, setActiveCategory] = useState<string>("frontend");
  const [projectIndex, setProjectIndex] = useState<number>(0);

  const filteredProjects = useMemo(
    () => projects.filter((proj) => proj.category.toLowerCase() === activeCategory),
    [activeCategory]
  );

  // Викликаємо sendImgPath коли змінюється проект
  useEffect(() => {
    const currentProject = filteredProjects[projectIndex];
    if (currentProject) {
      sendImgPath(currentProject.shortname);
    }
  }, [projectIndex, filteredProjects, sendImgPath]);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category.toLowerCase());
    setProjectIndex(0);
  };

  const handleNextProject = () => {
    setProjectIndex((prev) =>
      prev < filteredProjects.length - 1 ? prev + 1 : 0
    );
  };

  const handlePrevProject = () => {
    setProjectIndex((prev) =>
      prev > 0 ? prev - 1 : filteredProjects.length - 1
    );
  };

  const currentProject = filteredProjects[projectIndex];
  const hasProjectContent = Boolean(
    currentProject?.title || currentProject?.description || currentProject?.technologies.length || currentProject?.link
  );

  return (
    <div className="WorksPageTable">
      <div className="WorksPageTableCategories">
        {categories.map((category) => (
          <div
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={
              activeCategory === category.toLowerCase() ? "active-category" : ""
            }
          >
            <h3>{category}</h3>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
          <div key={`${activeCategory}_${projectIndex}`} className="WorkPageInfo">
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{ x: "70%", opacity: 0 }}
              transition={{ duration: 1 }}
            >
              {currentProject?.title ? (
                <h1>{currentProject.title}</h1>
              ) : (
                <div className="ContentPlaceholder WorkPageInfoTitlePlaceholder Skeleton" />
              )}
            </motion.div>

            <motion.div
              style={{ textAlign: "center" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              {currentProject?.description ? (
                <p className="WorkPageInfoDescription">
                  {currentProject.description}
                </p>
              ) : (
                <div className="WorkPageInfoDescriptionPlaceholder">
                  <span className="ContentPlaceholder Skeleton" />
                  <span className="ContentPlaceholder Skeleton" />
                  <span className="ContentPlaceholder Skeleton" />
                </div>
              )}
              {currentProject?.technologies.length ? (
                <h3 className="WorkPageInfoTechnologies">
                  {currentProject.technologies.join(" | ")}
                </h3>
              ) : (
                <div className="ContentPlaceholder WorkPageInfoTechPlaceholder Skeleton" />
              )}
              <div className="WorkPageInfoLinkWrap">
                {currentProject?.link ? (
                  <a
                    className="WorkPageInfoLink"
                    href={currentProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {currentProject.link}
                  </a>
                ) : (
                  <div className={hasProjectContent ? "WorkPageInfoLinkSpacer" : "ContentPlaceholder WorkPageInfoLinkPlaceholder Skeleton"} />
                )}
              </div>
            </motion.div>

            <div className="WorkPageInfoButtons">
              <button onClick={handlePrevProject}>Prev</button>
              <button onClick={handleNextProject}>Next</button>
            </div>
          </div>
      </AnimatePresence>
    </div>
  );
}
