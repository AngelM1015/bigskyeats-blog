import { MoveRight } from 'lucide-react'
import Tabs from './Tabs'
const textTabContent = (
  <div className="flex justify-between gap-16">
    <div className="w-1/2">
      <img className="w-full" alt="" src="/images/dummy.png" />
    </div>
    <div className="w-1/2 flex flex-col gap-4 justify-between mb-8">
      <div className="font-montserrat font-extrabold text-[48px]">
        Core capabilities and ways to accelerate on demand food delivery
        processes
      </div>
      <div className="text-[24px]">
        Explore our innovative solutions designed to revolutionize your
        experience and kickstart your team's success.
      </div>
      <a
        href="http://"
        target="_blank"
        rel="noopener noreferrer"
        className="flex space-x-4 items-center text-[24px] text-[#FF0B5C] dark:text-[#F09B00]"
      >
        <div>Learn about becoming a customer</div>
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
