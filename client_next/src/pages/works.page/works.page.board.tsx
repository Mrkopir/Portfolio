import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

export default function WorksPageBoard ({getImgPath}: {getImgPath: string}) {
    const [imageState, setImageState] = useState({ path: getImgPath, index: 0 })
    const [loadedImageKey, setLoadedImageKey] = useState("")
    const imgIndex = imageState.path === getImgPath ? imageState.index : 0
    const hasImage = Boolean(getImgPath?.trim())
    const imageKey = `${getImgPath}_${imgIndex}`
    const imageLoaded = loadedImageKey === imageKey

    const onImgClickNext = () => {
        setImageState((prev) => ({
            path: getImgPath,
            index: prev.path === getImgPath ? prev.index + 1 : 1,
        }))
    }

    const onImgClickPrev = () => {
        setImageState((prev) => ({
            path: getImgPath,
            index: prev.path === getImgPath && prev.index > 0 ? prev.index - 1 : 0,
        }))
    }

    return(
        <AnimatePresence>
            <div className="WorksPageBoard">
                    <motion.div
                        className="WorksPageBoardImage"
                        key={`${imgIndex}_${getImgPath}`}
                        initial = {{y: "0%", opacity: 0}}
                        animate = {{y: "5%", opacity: 1}}
                        exit = {{y: "10%", opacity: 0}}
                        transition={{duration: 1}}
                    >
                        {!imageLoaded && <div className="WorksPageImagePlaceholder Skeleton" />}
                        {hasImage && (
                            <img
                                className={imageLoaded ? "WorksPageBoardImg is-loaded" : "WorksPageBoardImg"}
                                src={`https://partfolio-jeft.onrender.com/api/img/${getImgPath}_${imgIndex}.jpg`}
                                alt="partfolio"
                                onLoad={() => setLoadedImageKey(imageKey)}
                                onError={(() => {
                                    setLoadedImageKey("")
                                    setImageState((prev) => (
                                        prev.path === getImgPath && prev.index === 0
                                            ? prev
                                            : { path: getImgPath, index: 0 }
                                    ))
                                })}
                            />
                        )}
                    </motion.div>
                <div className="WorksPageBoardButtons">
                    <p onClick={onImgClickPrev}><i className="left"></i></p>
                    <p onClick={onImgClickNext}><i className="right"></i></p>
                </div>
            </div>
        </AnimatePresence>
    )
}
