import Link from 'next/link'
import { memo } from 'react'

export default memo(function IntroTemplate() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {/* Email Link */}
          <Link
            href="mailto:angelmelendez@bigskyeats.co"
            className="text-gray-600 hover:text-blue-500"
          >
            <span className="sr-only">Email</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </Link>
        </div>

        <div className="mt-8 md:order-1 md:mt-0">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Link href="/" className="text-xl font-bold text-gray-900">
              BigSkyEats
            </Link>
            <nav className="flex space-x-6 text-sm">
              <Link href="/about" className="text-gray-600 hover:text-blue-500">
                About
              </Link>
              <Link href="/recipes" className="text-gray-600 hover:text-blue-500">
                Recipes
              </Link>
              <Link href="/blog" className="text-gray-600 hover:text-blue-500">
                Blog
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-500">
                Contact
              </Link>
            </nav>
            <p className="text-center text-xs text-gray-500">
              &copy; {new Date().getFullYear()} BigSkyEats. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
})