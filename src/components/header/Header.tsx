"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '@/utils/auth';

export const Header = () => {
  const [userName, setUserName] = useState<string>('');
  const { logout, getCurrentUser } = useAuth();

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setUserName(user.name || 'Usuario');
    }
  }, []);

  return (
      <header className="bg-white py-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center">
            <Image
                className="h-12 w-12 rounded-full shadow-lg"
                src="/images/logo-avii.png"
                width={500}
                height={500}
                alt="Avii logo"
            />
            <h1 className="ml-4 text-2xl font-extrabold text-[#333] bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] bg-clip-text text-transparent">
              Granja Avii
            </h1>
          </div>
          <div className="flex items-center space-x-6">
            {userName && (
                <span className="text-sm text-[#333] hidden sm:inline">
              Bienvenido, {userName}
            </span>
            )}
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link href="/homePage" className="text-[#333] hover:text-[#FFA500]">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="/settings" className="text-[#333] hover:text-[#FFA500]">
                    Información
                  </Link>
                </li>
                <li>
                  <button
                      onClick={logout}
                      className="text-[#333] hover:text-[#FFA500] cursor-pointer"
                  >
                    Salir
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
  );
};