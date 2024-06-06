import { LoginForm } from "@/components/loginForm/LoginForm";
import { Metadata } from "next";
import style from "./Login.module.css"



export const metadata: Metadata = {
  title: "Login Page",
  description: "Login Page",
};

export default function Login() {

  

    return (
        <>
           <div className={style.login}>
             <LoginForm/>
           </div>
        </>
    )}