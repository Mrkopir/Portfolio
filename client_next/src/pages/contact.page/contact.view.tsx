"use client"

import { useState } from "react";

import Navigation from "@/src/components/nav/nav";
import MainEnterMotion from "@/src/components/enter.motion/main.enter.motion";
import ContactPageForm from "./contact.page.form";
import ContactPageData from "./contact.page.data";
import ContactPageMainText from "./contact.page.main.text";

export default function ContactPage () {
    const [loading, setLoading] = useState(false)


    const getResponceStatus = (status: boolean) => {
        setLoading(status)
    }
    return (
        <div className="ContactPage">
            <MainEnterMotion text = {"CONTACT"} />
            <Navigation />
            <div className="loader" style={{display: loading ? "block" : "none"}}></div>
            <div className="ContactPageMain" style={{filter: loading ? "blur(5px)" : "none"}}>
                <div className="ContactPageLeft">
                    <ContactPageMainText />
                    <ContactPageData />
                </div>
                <div className="ContactPageRight">
                    <ContactPageForm status={getResponceStatus}/>
                </div>
            </div>
        </div>
    )
}