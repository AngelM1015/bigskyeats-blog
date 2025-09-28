import { Play } from 'lucide-react'
import Image from 'next/image'

export const HeroSection = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between gap-8 pt-8 px-4 md:px-12 xl:px-24">
        {/* Left Content */}
        <div className="w-full lg:w-2/5 flex flex-col justify-between mb-8">
          <div className="font-montserrat font-extrabold text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] leading-tight text-black dark:text-white">
            Big Sky, Montana&apos;s premier food delivery service for locals and
            visitors.
          </div>

          <div className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] mt-4 text-gray-700 dark:text-gray-300">
            Supporting local restaurants while delivering fresh, mountain
            cuisine directly to your door. Experience the taste of Big Sky with
            real-time tracking and community-first service.
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
            <div className="p-2 px-4 text-center bg-[#FF0B5C] dark:bg-[#F09B00] rounded-md border-black border-2 transition-all duration-200 dark:hover:bg-white hover:bg-white dark:text-black font-semibold">
              Order Now
            </div>
            <button className="flex items-center justify-center gap-2 border-black dark:border-white border-2 rounded-md p-2 px-4 dark:hover:bg-[#F09B00] hover:bg-[#FF0B5C] hover:text-white transition-all duration-200 text-sm sm:text-base">
              <Play className="w-5 h-5" />
              <span>See how it works</span>
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-3/5">
          <Image
            className="w-full h-auto rounded-md"
            alt="Demo"
            src="/images/bigskyeats.png"
            width={800}
            height={600}
          />
        </div>
      </div>

      {/* Divider Line */}
      <div className="flex justify-center">
        <div className="bg-gradient-to-r dark:from-[#09090B] from-white via-gray-600 dark:via-gray-600 to-white dark:to-[#09090B] h-0.5 w-11/12 sm:w-4/5 md:w-2/3 mt-16" />
      </div>
    </>
  )
}
