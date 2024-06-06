"use client"
import { useState } from "react"

export const Temperature = () => {
  const [temperature, setTemperature] = useState("25°C")


  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-2xl font-extrabold text-[#333] bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] bg-clip-text text-transparent">
                Temperatura
              </h2>
              <div className="flex items-center justify-between">
                <div className="text-6xl font-extrabold text-[#333]">{temperature}</div>
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
              <p className="mt-4 text-[#999]">La temperatura actual de la granja.</p>
            </div>
  )
}
