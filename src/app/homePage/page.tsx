import { Footer } from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";
import { Main } from "@/components/main/Main";
import { Metadata } from 'next';



export const metadata: Metadata = {
  title: "Home Page",
  description: "Home Page",
};


export default function Home() {
    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-r from-[#FF6B6B] to-[#FFA500]">
       
        <Header />

        <Main />

        <Footer />

    
    </div>
  )
}