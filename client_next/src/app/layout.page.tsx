import type { Metadata } from "next";
import { Bebas_Neue, Open_Sans } from 'next/font/google';
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