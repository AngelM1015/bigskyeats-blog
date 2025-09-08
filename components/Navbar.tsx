import { Menu, MoonStar,X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import ThemeToggle from './ThemeToggle'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md dark:bg-gradient-to-b dark:from-[#36363f] dark:to-[#09090B]">
      <div className="max-w-[1680px] mx-auto px-4 md:px-12 flex justify-between items-center py-4">
        {/* Logo */}
        <Link
          href="/"
          className="font-baloo font-extrabold text-[24px] sm:text-[28px] md:text-[32px] text-dark dark:text-white"
        >
          BigSkyEats-Blog.
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10 xl:space-x-16 text-[18px] xl:text-[20px] font-medium text-black dark:text-[#848485]">
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

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? (
              <X className="text-black dark:text-white" />
            ) : (
              <Menu className="text-black dark:text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 space-y-3 text-black dark:text-[#848485] text-base">
          <Link
            href="/"
            className="block hover:text-[#848485] dark:hover:text-white transition"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/blog"
            className="block hover:text-[#848485] dark:hover:text-white transition"
            onClick={() => setIsOpen(false)}
          >
            Blog
          </Link>
          <Link
            href="/about"
            className="block hover:text-[#848485] dark:hover:text-white transition"
            onClick={() => setIsOpen(false)}
          >
            About Us
          </Link>
          <Link
            href="/faq"
            className="block hover:text-[#848485] dark:hover:text-white transition"
            onClick={() => setIsOpen(false)}
          >
            F.A.Q
          </Link>
          <ThemeToggle />
        </div>
      )}
    </nav>
  )
}
