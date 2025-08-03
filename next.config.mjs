/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimizaciones para producción
  output: 'standalone',
  
  // Configuración para despliegue
  trailingSlash: false,
  
  // Optimizaciones de imagen
  images: {
    unoptimized: true, // Para evitar problemas en EC2 básico
  },
  
  // Variables de entorno
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Headers de seguridad
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
