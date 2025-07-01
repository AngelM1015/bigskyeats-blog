import { MoonStar } from 'lucide-react'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md px-24 flex justify-between items-center  dark:bg-gradient-to-b dark:from-[#36363f]  dark:to-[#09090B] ">
      <Link
        href="/"
        className="font-baloo font-extrabold text-[32px] text-dark dark:text-white  py-4"
      >
        BigSkyEats-Blog.
      </Link>
      <div className="space-x-24 text-sm font-medium  text-black dark:text-[#848485] text-[20px] flex items-center  py-4">
        <Link
          href="/"
          className="hover:text-[#848485] dark:hover:text-white transition"
        >
          Home
        </Link>
        <Link
          href="/blog"
          className="hover:text-[#848485] dark:hover:text-white transition"
        >
          Blog
        </Link>
        <Link
          href="/about"
          className="hover:text-[#848485] dark:hover:text-white transition"
        >
          About Us
        </Link>
        <Link
          href="/faq"
          className="hover:text-[#848485] dark:hover:text-white transition"
        >
          F.A.Q
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  )
}
