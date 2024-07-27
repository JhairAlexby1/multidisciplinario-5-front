import Link from "next/link"

export const Graphic = () => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md text-black">
      <Link href="/graphics" className="text-[#333] hover:text-[#FFA500]">
                  ver
        </Link>
    </div>
  )
}

