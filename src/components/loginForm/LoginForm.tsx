"use client";

import { useState } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Swal from 'sweetalert2';

export const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/usuarios/login', {
        email,
        password
      }, {
        withCredentials: true
      });

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          text: 'Redirigiendo a la página principal...',
          timer: 2000,
          showConfirmButton: false
        });
        setTimeout(() => {
          router.push('/homePage');
        }, 2000);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo iniciar sesión. Por favor, verifique sus credenciales.',
        });
        console.error('Login failed:', response.data);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error durante el inicio de sesión. Inténtelo de nuevo más tarde.',
      });
      console.error('Error during login:', error);
    }
  };

  return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-[#FF6B6B] to-[#FFA500]">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <div className="flex justify-center">
            <Image
                className="h-12 w-12 rounded-full shadow-lg"
                src="/images/logo-avii.png"
                width={500}
                height={500}
                alt="Avii logo"
            />
          </div>
          <h2 className="text-center text-3xl font-extrabold text-[#333] bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] bg-clip-text text-transparent">
            Bienvenido de vuelta
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Correo electrónico
                </label>
                <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-[#FF6B6B] px-3 py-2 text-[#333] placeholder-[#999] focus:z-10 focus:border-[#FFA500] focus:outline-none focus:ring-[#FFA500] sm:text-sm"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Contraseña
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-[#FF6B6B] px-3 py-2 text-[#333] placeholder-[#999] focus:z-10 focus:border-[#FFA500] focus:outline-none focus:ring-[#FFA500] sm:text-sm"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-[#FF6B6B] text-[#FFA500] focus:ring-[#FFA500]"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-[#333]">
                  Recordarme
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-[#FFA500] hover:text-[#FF6B6B]">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>
            <div>
              <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] py-2 px-4 text-sm font-medium text-white hover:bg-gradient-to-r hover:from-[#FFA500] hover:to-[#FF6B6B] focus:outline-none focus:ring-2 focus:ring-[#FFA500] focus:ring-offset-2"
              >
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};
