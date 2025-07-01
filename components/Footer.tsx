import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Twitter,
  Youtube,
} from 'lucide-react'
import Link from 'next/link'

export const Footer = () => {
  return (
    <div className="bg-white dark:bg-[#09090B] text-black dark:text-white py-8 px-6 sm:px-12 md:px-24">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 text-sm sm:text-base">
        {/* Left side - copyright and policies */}
        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-center md:text-left">
          <div>
            &copy; {new Date().getFullYear()} BigSkyEats. All rights reserved.
          </div>
          <div className="cursor-pointer hover:underline">Terms of Service</div>
          <div className="cursor-pointer hover:underline">Cookie Policy</div>
        </div>

        {/* Right side - social icons */}
        <div className="flex justify-center md:justify-end gap-6 text-lg">
          <a
            href="http://"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin className="hover:text-[#FF0B5C] dark:hover:text-[#F09B00]" />
          </a>
          <a
            href="http://"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Instagram className="hover:text-[#FF0B5C] dark:hover:text-[#F09B00]" />
          </a>
          <a
            href="http://"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <Twitter className="hover:text-[#FF0B5C] dark:hover:text-[#F09B00]" />
          </a>
          <a
            href="http://"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <Facebook className="hover:text-[#FF0B5C] dark:hover:text-[#F09B00]" />
          </a>
          <a
            href="http://"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <Youtube className="hover:text-[#FF0B5C] dark:hover:text-[#F09B00]" />
          </a>
          <Link
            href="mailto:angelmelendez@bigskyeats.co"
            className="hover:text-[#FF0B5C] dark:hover:text-[#F09B00]"
            aria-label="Email"
          >
            <Mail />
          </Link>
        </div>
      </div>
    </div>
  )
}
