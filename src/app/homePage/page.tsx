"use client";

import { Footer } from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";
import { Main } from "@/components/main/Main";
import { useAuth } from "@/utils/auth";

export default function Home() {
    useAuth();

    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-r from-[#FF6B6B] to-[#FFA500]">
            <Header />
            <Main />
            <Footer />
        </div>
    );
}