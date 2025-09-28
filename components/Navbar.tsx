import { LogOut, Menu, MoonStar, User, Vote,X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext,useState } from 'react'

import { AuthContext } from '../contexts/AuthContext'
import ThemeToggle from './ThemeToggle'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, isAuthenticated, logout } = useContext(AuthContext)!
  const router = useRouter()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = () => {
    logout()
    setIsOpen(false)
    router.push('/')
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
          
          {/* Authentication-aware navigation */}
          {isAuthenticated ? (
            <>
              <Link
                href="/vote"
                className="hover:text-[#FF0B5C] dark:hover:text-[#F09B00] transition flex items-center gap-2"
              >
                <Vote size={18} />
                Vote
              </Link>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <User size={16} />
                  {user?.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="hover:text-[#FF0B5C] dark:hover:text-[#F09B00] transition flex items-center gap-2"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hover:text-[#FF0B5C] dark:hover:text-[#F09B00] transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="hover:text-[#FF0B5C] dark:hover:text-[#F09B00] transition"
              >
                Register
              </Link>
            </>
          )}
          
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-[#36363f] shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link
              href="/"
              className="block py-2 text-black dark:text-[#848485] hover:text-[#848485] dark:hover:text-white transition"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="block py-2 text-black dark:text-[#848485] hover:text-[#848485] dark:hover:text-white transition"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="block py-2 text-black dark:text-[#848485] hover:text-[#848485] dark:hover:text-white transition"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/faq"
              className="block py-2 text-black dark:text-[#848485] hover:text-[#848485] dark:hover:text-white transition"
              onClick={() => setIsOpen(false)}
            >
              F.A.Q
            </Link>
            
            {/* Mobile Authentication-aware navigation */}
             {isAuthenticated ? (
               <>
                 <Link
                   href="/vote"
                   className="block py-2 text-black dark:text-[#848485] hover:text-[#FF0B5C] dark:hover:text-[#F09B00] transition flex items-center gap-2"
                   onClick={() => setIsOpen(false)}
                 >
                   <Vote size={18} />
                   Vote
                 </Link>
                 <div className="py-2 text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                   <User size={16} />
                   {user?.email}
                 </div>
                 <button
                   onClick={handleLogout}
                   className="block py-2 text-black dark:text-[#848485] hover:text-[#FF0B5C] dark:hover:text-[#F09B00] transition flex items-center gap-2 w-full text-left"
                 >
                   <LogOut size={18} />
                   Logout
                 </button>
               </>
             ) : (
               <>
                 <Link
                   href="/login"
                   className="block py-2 text-black dark:text-[#848485] hover:text-[#FF0B5C] dark:hover:text-[#F09B00] transition"
                   onClick={() => setIsOpen(false)}
                 >
                   Login
                 </Link>
                 <Link
                   href="/register"
                   className="block py-2 text-black dark:text-[#848485] hover:text-[#FF0B5C] dark:hover:text-[#F09B00] transition"
                   onClick={() => setIsOpen(false)}
                 >
                   Register
                 </Link>
               </>
             )}
            
            <div className="pt-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
