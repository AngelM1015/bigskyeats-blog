import { useState } from 'react'
import { AnimatePresence } from 'motion/react'
import * as motion from 'motion/react-client'
import TabContent from './TabContent'
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
                ? 'dark:text-gray-300 text-gray-800'
                : 'text-gray-500 hover:text-gray-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        <AnimatePresence mode="wait">
          {tabs.map((tab) =>
            activeTab === tab.id ? (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-white"
              >
                <TabContent content={tab.content} />
              </motion.div>
            ) : null,
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
export default Tabs
