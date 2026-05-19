import type { Metadata } from "next";
import { Bebas_Neue, Open_Sans } from 'next/font/google';
import "../pages/main.page/main.page.css";
import "../pages/main.page/hero.section/hero.section.css";
import "../pages/main.page/about.section/about.section.css";
import "../pages/skills.page/skills.page.css";
import "../pages/works.page/works.page.css";
import "../pages/contact.page/contact.page.css";
import "../components/nav/nav.css";
import "../components/enter.motion/enter.motion.style/enter.motion.css";
import "./globals.css";

const bebas = Bebas_Neue({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-bebas'
});

const openSans = Open_Sans({
    subsets: ['latin'],
    variable: '--font-open-sans'
});

export const metadata: Metadata = {
    title: "Volodymyr Chetvertynivskyi | Portfolio",
    description: "Full Stack Developer portfolio",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${bebas.variable} ${openSans.variable}`}>
        <body>{children}</body>
        </html>
    );
}
