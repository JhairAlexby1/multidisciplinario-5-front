import Link from "next/link"
import { Header } from "../header/Header"
import { Footer } from "../footer/Footer"

export const PageSettings = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-r from-[#FF6B6B] to-[#FFA500]">
    
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-2xl font-extrabold text-[#333] bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] bg-clip-text text-transparent">
            Configuración
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-extrabold text-[#333] bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] bg-clip-text text-transparent">
                Ajustes de Temperatura
              </h3>
              <div className="flex items-center justify-between">
                <div className="text-4xl font-extrabold text-[#333]">24°C</div>
                <div className="rounded-full bg-[#FF6B6B] p-3 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <label htmlFor="temp-range" className="text-[#999]">
                  Rango de Temperatura:
                </label>
                <input type="range" id="temp-range" min="10" max="40" defaultValue="24" className="w-full" />
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-extrabold text-[#333] bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] bg-clip-text text-transparent">
                Ajustes de Humedad
              </h3>
              <div className="flex items-center justify-between">
                <div className="text-4xl font-extrabold text-[#333]">70%</div>
                <div className="rounded-full bg-[#FFA500] p-3 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <label htmlFor="humidity-range" className="text-[#999]">
                  Rango de Humedad:
                </label>
                <input type="range" id="humidity-range" min="0" max="100" defaultValue="70" className="w-full" />
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-extrabold text-[#333] bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] bg-clip-text text-transparent">
                Ajustes de Notificaciones
              </h3>
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="temp-alert" className="text-[#999]">
                    Alerta de Temperatura:
                  </label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="temp-alert"
                      className="mr-2 h-4 w-4 rounded border-gray-300 bg-gray-100 text-[#FF6B6B] focus:ring-[#FF6B6B]"
                    />
                    <span className="text-[#333]">Activado</span>
                  </div>
                </div>
                <div>
                  <label htmlFor="humidity-alert" className="text-[#999]">
                    Alerta de Humedad:
                  </label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="humidity-alert"
                      className="mr-2 h-4 w-4 rounded border-gray-300 bg-gray-100 text-[#FFA500] focus:ring-[#FFA500]"
                    />
                    <span className="text-[#333]">Activado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      
    </div>
  )
}
