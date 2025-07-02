import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ButtonProps {
  onClick: () => void
}

export const PrevButton: React.FC<ButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-black/40 hover:bg-black/80 border border-black dark:border-white p-2 rounded-full shadow transition"
    aria-label="Previous Slide"
  >
    <ChevronLeft />
  </button>
)

export const NextButton: React.FC<ButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-black/40  hover:bg-black/80  border  border-black dark:border-white  p-2 rounded-full shadow transition"
    aria-label="Next Slide"
  >
    <ChevronRight />
  </button>
)

interface DotProps {
  selected: boolean
  onClick: () => void
}

export const DotButton: React.FC<DotProps> = ({ selected, onClick }) => (
  <button
    className={`w-3 h-3 rounded-full transition ${
      selected ? 'dark:bg-[#F09B00] bg-[#FF0B5C]' : 'bg-gray-300'
    }`}
    onClick={onClick}
    aria-label="Slide dot"
  />
)
