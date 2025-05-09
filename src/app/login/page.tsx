import { LoginForm } from "@/components/loginForm/LoginForm";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Login Page",
  description: "Login Page",
};

export default function Login() {

  

    return (
        <>
           <div>
             <LoginForm/>
           </div>
        </>
    )}