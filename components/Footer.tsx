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
    <div className="flex justify-between py-16 px-24 bg-white dark:bg-[#09090B] text-black dark:text-white ">
      <div className="flex gap-4">
        <div>
          &copy; {new Date().getFullYear()} BigSkyEats. All rights reserved.
        </div>
        <div>Terms of Service</div>
        <div>Cookie Policy</div>
      </div>
      <div className="flex gap-4">
        <a href="http://" target="_blank" rel="noopener noreferrer">
          <Linkedin className="hover:text-[#FF0B5C] dark:hover:text-[#F09B00]" />
        </a>
        <a href="http://" target="_blank" rel="noopener noreferrer">
          <Instagram className="hover:text-[#FF0B5C] dark:hover:text-[#F09B00]" />
        </a>
        <a href="http://" target="_blank" rel="noopener noreferrer">
          <Twitter className="hover:text-[#FF0B5C] dark:hover:text-[#F09B00]" />
        </a>
        <a href="http://" target="_blank" rel="noopener noreferrer">
          <Facebook className="hover:text-[#FF0B5C] dark:hover:text-[#F09B00]" />
        </a>
        <a href="http://" target="_blank" rel="noopener noreferrer">
          <Youtube className="hover:text-[#FF0B5C] dark:hover:text-[#F09B00]" />
        </a>
        <Link
          href="mailto:angelmelendez@bigskyeats.co"
          className="hover:text-[#FF0B5C] dark:hover:text-[#F09B00]"
        >
          <Mail />
        </Link>
      </div>
    </div>
  )
}
