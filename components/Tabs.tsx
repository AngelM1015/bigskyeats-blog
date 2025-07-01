import { useState } from 'react'

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id)

  return (
    <div className="w-full mx-auto">
      <div className="flex justify-center gap-2 md:gap-36 py-6 text-[20px]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2 px-4 font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'border-b-2 dark:border-gray-300 border-gray-800 dark:text-gray-300 text-gray-800'
                : 'border-b-2 border-transparent text-gray-500 hover:text-gray-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  )
}
export default Tabs
