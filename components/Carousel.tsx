import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, PrevButton, NextButton } from './EmblaCarouselButtons'

type CarouselItem = {
  title: string
  label: string
}
interface CarouselProps {
  slides: CarouselItem[]
}

export const Carousel: React.FC<CarouselProps> = ({ slides }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  )
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div className="w-full flex-shrink-0" key={index}>
              <div className="bg-white dark:bg-[#18181B] border-2 border-black dark:border-[#18181B] mt-8 p-6 sm:p-8 rounded-3xl text-center space-y-6 ">
                <div className="font-montserrat font-bold text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] text-black dark:text-white leading-tight">
                  {slide.title}
                </div>
                <div className="text-[16px] sm:text-[18px] md:text-[20px] text-gray-700 dark:text-gray-300">
                  Become part of the thousands of locals working together and
                  achieving their best with BigskyEats
                </div>

                <form className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8">
                  <input
                    type="email"
                    name="localUser"
                    id="localUser"
                    placeholder="Enter your email"
                    className="border-2 border-black dark:border-gray-700 bg-white dark:bg-black p-2 rounded-lg w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-[#FF0B5C] dark:focus:ring-[#F09B00] transition"
                  />
                  <input
                    type="submit"
                    value={`Sign up as a ${slide.label}`}
                    className="dark:bg-[#F09B00] bg-[#FF0B5C] rounded-lg px-6 py-2 text-[16px] font-semibold cursor-pointer hover:brightness-110 transition"
                  />
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="absolute inset-0 flex justify-between items-center px-4">
        <PrevButton onClick={scrollPrev} />
        <NextButton onClick={scrollNext} />
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            selected={index === selectedIndex}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </div>
  )
}
