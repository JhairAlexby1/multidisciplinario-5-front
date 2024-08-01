import Link from "next/link";

export const Graphic = () => {
    return (
        <div className="rounded-lg bg-white p-6 shadow-md text-black">
            <div className="mb-4 w-full h-64 flex items-center justify-center overflow-hidden">
                <img src="https://static.vecteezy.com/system/resources/previews/006/746/819/non_2x/colorful-design-icon-of-temperature-humidity-vector.jpg" alt="Gráfica" className="max-w-full max-h-full" />
            </div>
            <div className="flex justify-center">
                <Link href="/graphics" legacyBehavior>
                    <a className="bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] text-white py-2 px-4 rounded hover:opacity-75 transition duration-300">
                        Ver Gráficas
                    </a>
                </Link>
            </div>
        </div>
    );
};