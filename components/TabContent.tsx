import * as motion from 'motion/react-client'
import { MoveRight } from 'lucide-react'
import Link from 'next/link'

const TabContent = ({ content }) => {
  console.log('content', content.image)
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-8 px-4 sm:px-8 lg:px-12 xl:px-24 py-12 ">
      {/* Image Section */}
      <div className="w-full lg:w-1/2">
        <img
          className="w-full h-auto rounded-lg"
          alt="Delivery system preview"
          src={content.image}
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
          experience and kickstart your team is success.
        </p>
        <Link
          href="/about"
          className="cursor-pointer  text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] text-[#FF0B5C] dark:text-[#F09B00] font-medium hover:underline"
          passHref
        >
          <motion.div
            whileHover={{ x: 5 }} // slide slightly right on hover
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="flex items-center gap-2 "
          >
            <div>{content.aboutText}</div>
            <motion.div
              initial={{ x: 0 }}
              whileHover={{ x: 4 }} // arrow moves right
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <MoveRight size={20} />
            </motion.div>
          </motion.div>
        </Link>
      </div>
    </div>
  )
}
export default TabContent
