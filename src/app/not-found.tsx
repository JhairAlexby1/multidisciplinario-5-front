import Link from "next/link";

export default function notFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] px-4 sm:px-6 md:px-8 lg:px-10 text-center ">
      <div className="max-w-md space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          Oops! Página no encontrada
        </h1>
        <p className="text-gray-500 text-lg md:text-xl">
          Lo sentimos, la página que estás buscando no se pudo encontrar. Puede
          que se haya movido o eliminado.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-[#FFA500] text-gray-50 font-medium transition-colors hover:bg-[#FFA500]/90 focus:outline-none focus:ring-1 focus:ring-[#FFA500] disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus:ring-gray-300"
          prefetch={false}
        >
          Volver a la página de inicio
        </Link>
      </div>
    </div>
  );
}
