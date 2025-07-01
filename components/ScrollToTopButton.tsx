import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <div className="text-white">
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50  bg-[#FF0B5C] hover:bg-[#ac4763] dark:bg-[#F09B00] dark:hover:bg-[#97783e] text-white p-4 rounded-full shadow-md transition-all"
      >
        <ArrowUp />
      </button>
    </div>
  )
}
