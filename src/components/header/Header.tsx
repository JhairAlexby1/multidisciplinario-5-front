import Image from 'next/image'
import Link from 'next/link'

export const Header = () => {
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
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/homePage" className="text-[#333] hover:text-[#FFA500]">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/settings" className="text-[#333] hover:text-[#FFA500]">
                Informacion
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-[#333] hover:text-[#FFA500]">
                Salir
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
  )
}
