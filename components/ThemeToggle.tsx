import { useTheme } from 'context/ThemeContext'
import { MoonStar } from 'lucide-react'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={`rounded-full w-12 h-12 bg-white dark:bg-[#6E31DE] flex justify-center items-center ${theme === 'light' ? 'text-black' : 'text-white'}`}
    >
      <MoonStar />
    </button>
  )
}
