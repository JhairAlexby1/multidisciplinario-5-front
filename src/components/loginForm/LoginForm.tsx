"use client"
import { useState, useEffect } from 'react';
import style from "./LoginForm.module.css"
import Image from "next/image";
import logo from '../../../public/logo_avii_2.png'

export const LoginForm = () => {


    return (
      <div className={style.containerFormLogin}>
                <div className={style.containerLogo}>
                <Image src={logo} alt="Descripción de la imagen" width={215} height={215} />
                </div>
                <h1 className={style.Frase}>Bienvenido de vuelta</h1>
                <div className={style.containerInputs}>
                    <input className={style.inputEmail} type="email" id="email" required placeholder="CORREO ELECTRONICO"    />
                    <input className={style.inputPassword} type="password" id="password" required placeholder="CONTRASEÑA"  />
                </div>
                <div className={style.containerButtonLogin}>
                <button className={style.buttonLogin} >Iniciar sesion</button>
                </div>
            </div>
    )
  }