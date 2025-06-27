import { MoveRight } from 'lucide-react'
import Tabs from './Tabs'
const textTabContent = (
  <div className="text-white flex justify-between gap-16">
    <div className="w-3/5">
      <img className="w-full" alt="" src="/images/dummy.png" />
    </div>
    <div className="w-2/5 flex flex-col gap-4 justify-between mb-8">
      <div className="font-montserrat font-extrabold text-[48px]">
        Core capabilities and ways to accelerate on demand food delivery
        processes
      </div>
      <div>
        Explore our innovative solutions designed to revolutionize your
        experience and kickstart your team's success.
      </div>
      <div className="flex space-x-4 items-center">
        <div>Learn about becoming a customer</div>
        <MoveRight size={20} />
      </div>
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
    </>
  )
}
