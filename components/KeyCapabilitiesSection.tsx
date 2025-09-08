import Tabs from './Tabs'

const tabs = [
  {
    id: 'tab1',
    label: 'Customer',
    content: {
      image: '/images/bigskyeats.png',
      aboutText: "Join Big Sky's food delivery community as a customer",
    },
  },
  {
    id: 'tab2',
    label: 'Partner',
    content: {
      image: '/images/bigskyshop.png',
      aboutText: 'Become a BigSkyEats delivery partner in the mountains',
    },
  },
  {
    id: 'tab3',
    label: 'Restaurant Owner',
    content: {
      image: '/images/bigskyresort.png',
      aboutText: 'Partner with BigSkyEats to grow your Big Sky restaurant',
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
