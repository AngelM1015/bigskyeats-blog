import { Carousel } from 'components/Carousel'
import * as motion from 'motion/react-client'
import { useRef } from 'react'

export const MainFeatureSection = () => {
  const features = [
    {
      title: 'AI-Enhanced Ordering',
      description:
        'Smart order management and route optimization ensures your Big Sky food delivery arrives fresh and fast, powered by intelligent algorithms.',
      icon: '🤖',
    },
    {
      title: 'Real-Time Tracking',
      description:
        'Track your order from Big Sky restaurants in real-time with live SMS and push notifications, supporting local business growth.',
      icon: '📈',
    },
    {
      title: 'Local Integration',
      description:
        'Seamlessly integrated with Big Sky restaurants using Google Maps, local logistics partners, and mobile platforms for the best experience.',
      icon: '🔗',
    },
    {
      title: 'Local Data Security',
      description:
        'Your data stays secure on our Big Sky-based servers, ensuring privacy while providing valuable insights to improve local restaurant service.',
      icon: '📊',
    },
    {
      title: 'Community Support',
      description:
        'Local customer service team available to help with orders, restaurant questions, and ensuring your Big Sky dining experience is perfect.',
      icon: '⏰',
    },
    {
      title: 'Restaurant Partnerships',
      description:
        'Direct partnerships with Big Sky restaurants and local logistics ensure smooth delivery while supporting the mountain community.',
      icon: '🧩',
    },
  ]
  const Carousels = [
    {
      title: 'Join BigSkyEats as a Tourist!',
      label: 'Tourist Customer',
      userType: 'tourist_customer',
      description: 'Perfect for visitors to Big Sky, MT',
    },
    {
      title: 'Join our local community!',
      label: 'Local Customer',
      userType: 'local_customer',
      description: 'For Big Sky residents (requires admin approval)',
    },
    {
      title: 'Partner with BigSkyEats!',
      label: 'Restaurant Owner',
      userType: 'restaurant_owner',
      description: 'Expand your restaurant reach in Big Sky',
    },
  ]
  const targetRef = useRef<HTMLElement | null>(null)
  const scrollToSection = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }
  return (
    <div>
      <div className="rounded-3xl dark:bg-[#F09B00] bg-[#FF0B5C] flex flex-col lg:flex-row gap-8 p-8 sm:p-12 md:p-16 my-12 sm:my-16">
        {/* Left Content */}
        <div className="w-full lg:w-1/3 flex flex-col justify-between mb-8">
          <div className="font-montserrat font-bold text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] text-white dark:text-black leading-tight">
            Tailored for Big Sky locals and visitors alike.
          </div>
          <div className="text-[16px] sm:text-[18px] md:text-[20px] text-white dark:text-black mt-4">
            Discover personalized delivery options designed for mountain living,
            from quick village runs to resort deliveries.
          </div>
          <button
            onClick={scrollToSection}
            className="dark:hover:bg-[#f1c97f] dark:bg-[#644920] hover:bg-[#dd5784] bg-[#b32453] font-semibold w-44 rounded-lg text-center py-4 mt-6 cursor-pointer select-none"
          >
            Down below
          </button>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-2/3">
          <div 
            className="w-full h-auto rounded-lg overflow-hidden"
            style={{
              backgroundColor: 'white',
              padding: '.5px',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
            }}
          >
            <div 
              style={{
                width: '100%',
                height: 'auto',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <img
                src="/images/Animated_Illustration_Clean_Mobile.webp"
                alt="Animated food delivery illustration"
                style={{ 
                  backgroundColor: 'white',
                  border: 'none',
                  outline: 'none',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  width: '100%',
                  height: 'auto',
                  transform: 'scaleX(1.45)',
                  transformOrigin: 'center'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="bg-gradient-to-r dark:from-[#09090B] from-white via-gray-600 dark:via-gray-600 to-white dark:to-[#09090B] h-0.5 w-1/3  my-12"></div>
      </div>
      <motion.section
        ref={targetRef}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="px-4 sm:px-8 md:px-12 xl:px-24 py-12">
          <div className="flex flex-col items-center text-center">
            <h2 className="font-montserrat font-bold text-[32px] sm:text-[40px] md:text-[48px] lg:text-[52px] text-black dark:text-white leading-snug">
              Big Sky dining. Reimagined.
            </h2>
            <p className="text-[16px] sm:text-[18px] md:text-[20px] text-gray-700 dark:text-gray-300 max-w-2xl py-6 sm:py-8">
              Unlike corporate delivery services, BigSkyEats keeps everything
              local. We support Big Sky restaurants first, ensuring their
              success while providing the mountain community with fresh,
              reliable food delivery.
            </p>
          </div>
          <div className="w-full mx-auto mt-8 rounded-xl overflow-hidden shadow-2xl border-2  border-[#09090B]">
            <video className="w-full h-auto" autoPlay loop muted>
              <source src="/video/intro.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </motion.section>
      <div className="flex justify-center">
        <div className="bg-gradient-to-r dark:from-[#09090B] from-white via-gray-600 dark:via-gray-600 to-white dark:to-[#09090B] h-0.5 w-1/3  my-12"></div>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center text-center px-4 sm:px-8 md:px-12 xl:px-24 py-12 mx-auto">
          <div className="font-montserrat font-bold text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] max-w-3xl text-black dark:text-white leading-tight">
            Empowering Big Sky&apos;s food community with technology that works for
            everyone.
          </div>
          <div className="text-[16px] sm:text-[18px] md:text-[20px] text-gray-700 dark:text-gray-300 max-w-xl mt-6">
            Our platform connects hungry locals and visitors with Big Sky&apos;s
            amazing restaurants, featuring powerful tools that benefit the
            entire mountain community.
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8 ">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-6 bg-white border-2 dark:border-[#18181B]  dark:bg-[#18181B] rounded-lg shadow-lg"
            >
              <div className="text-[40px] mb-4">{feature.icon}</div>
              <h3 className="text-[28px] font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-center text-[20px]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <Carousel slides={Carousels} />
    </div>
  )
}
