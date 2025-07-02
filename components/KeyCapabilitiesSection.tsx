import Tabs from './Tabs'

const tabs = [
  {
    id: 'tab1',
    label: 'Customer',
    content: {
      image: '/images/bigskyeats.png',
      aboutText: 'Learn about becoming a Customer',
    },
  },
  {
    id: 'tab2',
    label: 'Partner',
    content: {
      image: '/images/bigskyshop.png',
      aboutText: 'Learn about becoming a Partner',
    },
  },
  {
    id: 'tab3',
    label: 'Restaurant Owner',
    content: {
      image: '/images/bigskyresort.png',
      aboutText: 'Learn about becoming a Restaurant Owner',
    },
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
