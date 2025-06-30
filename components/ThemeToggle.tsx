import { useTheme } from 'context/ThemeContext'
import { MoonStar } from 'lucide-react'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={`rounded-full w-12 h-12 bg-[#FF0B5C] hover:bg-[#aa4b6b] border-2  border-black dark:bg-[#F09B00] transition-all duration-200 dark:hover:bg-[#8f7442] flex justify-center items-center ${theme === 'light' ? 'text-black' : 'text-white'}`}
    >
      <MoonStar />
    </button>
  )
}
