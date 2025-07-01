"use client";

import { useState } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

// Usuarios de prueba
const mockUsers = [
  { id: 1, email: 'admin@granja.com', password: 'admin123', name: 'Administrador' },
  { id: 2, email: 'user@granja.com', password: 'user123', name: 'Usuario' },
  { id: 3, email: 'test@test.com', password: 'test', name: 'Test User' }
];

export const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));

    // Buscar usuario en la lista de usuarios de prueba
    const user = mockUsers.find(u => u.email === email && u.password === password);

    if (user) {
      // Guardar usuario en localStorage
      localStorage.setItem('currentUser', JSON.stringify({
        id: user.id,
        email: user.email,
        name: user.name,
        token: `mock_token_${user.id}`
      }));

      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        html: `
          <p>Bienvenido/a, ${user.name}!</p>
          <br>
          <p>Usuarios de prueba:</p>
          <ul style="text-align: left; margin-top: 10px;">
            <li>admin@granja.com / admin123</li>
            <li>user@granja.com / user123</li>
            <li>test@test.com / test</li>
          </ul>
        `,
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
        html: `
          <p>Credenciales incorrectas. Por favor, intente con:</p>
          <ul style="text-align: left; margin-top: 10px;">
            <li>admin@granja.com / admin123</li>
            <li>user@granja.com / user123</li>
            <li>test@test.com / test</li>
          </ul>
        `,
      });
    }
  };

  // Función para llenar credenciales de demo
  const fillDemoCredentials = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
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

          {/* Botones de credenciales de demo */}
          <div className="space-y-2">
            <p className="text-center text-sm text-gray-600">Credenciales de demo:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                  type="button"
                  onClick={() => fillDemoCredentials('admin@granja.com', 'admin123')}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded"
              >
                Admin
              </button>
              <button
                  type="button"
                  onClick={() => fillDemoCredentials('user@granja.com', 'user123')}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded"
              >
                User
              </button>
              <button
                  type="button"
                  onClick={() => fillDemoCredentials('test@test.com', 'test')}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded"
              >
                Test
              </button>
            </div>
          </div>

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