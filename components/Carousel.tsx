import useEmblaCarousel from 'embla-carousel-react'
import React, { useCallback, useEffect, useState } from 'react'

import { DotButton, NextButton,PrevButton } from './EmblaCarouselButtons'
import { GoogleAutoDetectSignup } from './GoogleAutoDetectSignup'

type CarouselItem = {
  title: string
  label: string
  userType: string
  description?: string
}
interface CarouselProps {
  slides: CarouselItem[]
}

export const Carousel: React.FC<CarouselProps> = ({ slides }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [submittedEmails, setSubmittedEmails] = useState<Set<string>>(new Set())
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleEmailSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    slide: CarouselItem,
  ) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string

    if (!email || submittedEmails.has(email)) return

    setIsSubmitting(true)

    try {
      const response = await fetch(
        process.env.NODE_ENV === 'production' 
          ? 'https://bigskyeats.app/api/v1/email_registrations'
          : 'http://localhost:3000/api/v1/email_registrations',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email_registration: {
              email: email,
              user_type: slide.userType,
              source: 'blog_carousel',
            },
          }),
        },
      )

      if (response.ok) {
        setSubmittedEmails((prev) => new Set(prev).add(email))
        // Reset form
        e.currentTarget.reset()
      }
    } catch (error) {
      console.error('Failed to submit email registration:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

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
                  {slide.description ||
                    'Become part of the thousands of locals working together and achieving their best with BigskyEats'}
                </div>

                <GoogleAutoDetectSignup
                  userType={slide.userType}
                  userLabel={slide.label}
                  onSuccess={() => {
                    setSubmittedEmails((prev) => new Set(prev).add(`${slide.userType}-${index}`))
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="absolute inset-0 flex justify-between items-center px-4 pointer-events-none">
        <div className="pointer-events-auto">
          <PrevButton onClick={scrollPrev} />
        </div>
        <div className="pointer-events-auto">
          <NextButton onClick={scrollNext} />
        </div>
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
