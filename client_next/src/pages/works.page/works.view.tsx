"use client"

import Navigation from "@/src/components/nav/nav";
import MainEnterMotion from "@/src/components/enter.motion/main.enter.motion";
import WorksPageMainText from "./works.page.main.text";
import WorksPageTable from "./works.page.table";
import WorksPageBoard from "./works.page.board";
import { useState } from "react";

export default function WorksPage () {

    const [imgPath, setImgPath] = useState('')

    const getAndSetImgPath = (path: string) => {
        setImgPath(path)
    }

    return (
        <div className="WorksPage">
            <MainEnterMotion text = "WORKS"/>
            <Navigation />
            <div className="WorksPageMain">
                <div className="WorksPageLeft">
                    <WorksPageMainText />
                    <WorksPageTable sendImgPath = {getAndSetImgPath} />
                </div>
                <div className="WorksPageRight">
                    <WorksPageBoard getImgPath={imgPath}/>
                </div>
            </div>
        </div>
    )
}