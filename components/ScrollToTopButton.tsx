import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    const toggleVisibility = (): void => {
      if (window.scrollY > 4000) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="text-white">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-[#FF0B5C] hover:bg-[#ac4763] dark:bg-[#F09B00] dark:hover:bg-[#97783e] text-white p-4 rounded-full shadow-md transition-all"
        >
          <ArrowUp />
        </button>
      )}
    </div>
  )
}
