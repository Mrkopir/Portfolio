import MainEnterMotion from "@/src/components/enter.motion/main.enter.motion"
import Navigation from "@/src/components/nav/nav"
import HeroSection from "./hero.section/hero.section"
import AboutSection from "./about.section/about.section"

export default function MainPage() {
    return (
        <div className="MainPage">
            <MainEnterMotion text = "Home" />
            <div className="MainPageTop">
                <Navigation />
                <HeroSection />
            </div>
            <div className="MainPageAbout">
                <AboutSection />
            </div>
        </div>
    )
}