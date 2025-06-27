import Link from 'next/link'

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-[#09090B]  shadow-md px-8 py-4 flex justify-between items-center">
      <div className="font-baloo font-extrabold text-white">
        BigSkyEats-Blog.
      </div>
      <div className="space-x-6 text-sm font-medium text-[#848485]">
        <Link href="/" className="hover:text-white transition">
          Home
        </Link>
        <Link href="/blog" className="hover:text-white transition">
          Blog
        </Link>
        <Link href="/about" className="hover:text-white transition">
          About Us
        </Link>
        <Link href="/faq" className="hover:text-white transition">
          F.A.Q
        </Link>
      </div>
    </nav>
  )
}
