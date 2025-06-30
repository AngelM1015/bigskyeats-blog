import { Play } from 'lucide-react'

export const HeroSection = () => {
  return (
    <div>
      <div className=" flex justify-between gap-16 pt-8">
        <div className="w-2/5 flex flex-col justify-between mb-8">
          <div className="font-montserrat font-extrabold text-[64px]">
            Finally, an on-demand delivery system for tourist & locals alike.
          </div>
          <div className="text-[24px]">
            Maximize productivity and save time with our revolutionary approach.
            Deliver improved performance and better team coordination. (Not
            done)
          </div>
          <div className="flex space-x-4 rounded-md">
            <div className="p-2 bg-[#FF0B5C] dark:bg-[#F09B00] rounded-md border-black border-2 transition-all duration-200 dark:hover:bg-white hover:bg-white dark:text-black">
              Open To
            </div>
            <button className="flex border-black dark:border-white border-2 rounded-md p-2 dark:hover:bg-[#F09B00] transition-all duration-200 hover:bg-[#FF0B5C] hover:text-white">
              <Play className="" />
              <div>See how it works</div>
            </button>
          </div>
        </div>
        <div className="w-3/5">
          <img className="w-full" alt="" src="/images/dummy.png" />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="bg-gradient-to-r dark:from-[#09090B] from-white via-gray-600 dark:via-gray-600 to-white dark:to-[#09090B] h-0.5 w-2/3  mt-24 "></div>
      </div>
    </div>
  )
}
