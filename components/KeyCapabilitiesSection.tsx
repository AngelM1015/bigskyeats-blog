import { MoveRight } from 'lucide-react'
import Tabs from './Tabs'
const textTabContent = (
  <div className="flex flex-col lg:flex-row justify-between items-center gap-8 px-4 sm:px-8 lg:px-12 xl:px-24 py-12 ">
    {/* Image Section */}
    <div className="w-full lg:w-1/2">
      <img
        className="w-full h-auto rounded-lg"
        alt="Delivery system preview"
        src="/images/dummy.png"
        loading="lazy"
      />
    </div>

    {/* Text Content */}
    <div className="w-full lg:w-1/2 flex flex-col gap-6 justify-between mt-6 lg:mt-0">
      <h2 className="font-montserrat font-extrabold text-[28px] sm:text-[36px] md:text-[40px] lg:text-[48px] text-black dark:text-white leading-tight">
        Core capabilities and ways to accelerate on-demand food delivery
        processes
      </h2>
      <p className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] text-gray-700 dark:text-gray-300">
        Explore our innovative solutions designed to revolutionize your
        experience and kickstart your team's success.
      </p>
      <a
        href="http://"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] text-[#FF0B5C] dark:text-[#F09B00] font-medium hover:underline"
      >
        <span>Learn about becoming a customer</span>
        <MoveRight size={20} />
      </a>
    </div>
  </div>
)

const tabs = [
  {
    id: 'tab1',
    label: 'Customer',
    content: textTabContent, // JSX content here
  },
  {
    id: 'tab2',
    label: 'Partner',
    content: textTabContent, // JSX content here
  },
  {
    id: 'tab3',
    label: 'Restaurant Owner',
    content: textTabContent, // JSX content here
  },
]
export const KeyCapabilitiesSection = () => {
  return (
    <>
      <Tabs tabs={tabs} />
      <div className="flex justify-center">
        <div className="bg-gradient-to-r dark:from-[#09090B] from-white via-gray-600 dark:via-gray-600 to-white dark:to-[#09090B] h-0.5 w-1/3  my-12"></div>
      </div>
    </>
  )
}
