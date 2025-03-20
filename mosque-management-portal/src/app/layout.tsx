'use client'

import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {UserProvider} from '@auth0/nextjs-auth0/client';
import {I18nextProvider} from "react-i18next";
import i18n from './../i18n';
import DashboardLayoutWrapper from "@/components/common/dashboard/DashboardLayoutWrapper";
import {PUBLIC_NAVIGATION} from "@/config/navigationConfig";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {

    return (
        <html lang = "en" >
            <I18nextProvider i18n={i18n}>
                <UserProvider loginUrl="/api/auth/login" profileUrl="/api/auth/me">
                    <body className = {`${geistSans.variable} ${geistMono.variable}`} >
                        <DashboardLayoutWrapper
                            navigation = {PUBLIC_NAVIGATION}
                            content = {children}
                        />
                    </body >
                </UserProvider >
            </I18nextProvider>
        </html >
    );
}
