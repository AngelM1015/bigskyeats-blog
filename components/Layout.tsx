import { Footer } from './Footer'
import { Navbar } from './Navbar'

export default function Layout({ children }) {
  return (
    <div className="bg-white dark:bg-[#09090B] text-black dark:text-white">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
