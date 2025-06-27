import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react'

export const Footer = () => {
  return (
    <div className="text-white flex justify-between py-16">
      <div className="flex gap-4">
        <div>@ 2025 BigSkyEats</div>
        <div>Terms of Service</div>
        <div>Cookie Policy</div>
      </div>
      <div className="flex gap-4">
        <Linkedin />
        <Instagram />
        <Twitter />
        <Facebook />
        <Youtube />
      </div>
    </div>
  )
}
