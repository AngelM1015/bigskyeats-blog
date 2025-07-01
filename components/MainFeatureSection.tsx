const features = [
  {
    title: 'AI-Enhanced',
    description:
      'Experience advanced operations automation with intelligent algorithms to boost efficiency and streamline each order.',
    icon: '🤖',
  },
  {
    title: 'Usage Optimization',
    description:
      'Maintaining the life cycle of an order, live SMS/Push notifications on demand, and local helping build local growth.',
    icon: '📈',
  },
  {
    title: 'Integrations',
    description:
      'We utilize google maps api, itscheckmate(logistics), github, Apple Play, etc.',
    icon: '🔗',
  },
  {
    title: 'Historical Data',
    description:
      'Server is in-house here in the local town of Big Sky, with secure scrabbling raw data while maintaining association of given data to make informed decisions.',
    icon: '📊',
  },
  {
    title: '24/7 Support',
    description:
      'Experience advanced operations automation with intelligent algorithms to boost efficiency and streamline each order.',
    icon: '⏰',
  },
  {
    title: 'Community Plugins',
    description:
      'We are direct partnership with itscheckmate & local restaurant business orders in order to ensure smoothly food delivery process.',
    icon: '🧩',
  },
]
export const MainFeatureSection = () => {
  return (
    <div>
      <div className="px-4 sm:px-8 md:px-12 xl:px-24 py-12">
        <div className="flex flex-col items-center text-center">
          <h2 className="font-montserrat font-bold text-[32px] sm:text-[40px] md:text-[48px] lg:text-[52px] text-black dark:text-white leading-snug">
            Food delivery. Redefined.
          </h2>
          <p className="text-[16px] sm:text-[18px] md:text-[20px] text-gray-700 dark:text-gray-300 max-w-2xl py-6 sm:py-8">
            Unlike other SaaS products (UberEats, DoorDash), we keep things
            local and make sure we are always a benefit to restaurants in the
            area — never a detriment. Their success is just as important as
            ours.
          </p>
        </div>

        <div className="mt-8">
          <img
            className="w-full h-auto rounded-md"
            src="/images/dummy.png"
            alt="dummy"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="bg-gradient-to-r dark:from-[#09090B] from-white via-gray-600 dark:via-gray-600 to-white dark:to-[#09090B] h-0.5 w-1/3  my-12"></div>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center text-center px-4 sm:px-8 md:px-12 xl:px-24 py-12 mx-auto">
          <div className="font-montserrat font-bold text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] max-w-3xl text-black dark:text-white leading-tight">
            Core capabilities and ways to accelerate innovation and growth to a
            local driven community.
          </div>
          <div className="text-[16px] sm:text-[18px] md:text-[20px] text-gray-700 dark:text-gray-300 max-w-xl mt-6">
            Maximize your productivity and save time with our revolutionary
            product, app/&amp; web portal as it has a powerful set of features.
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

      <div className="rounded-3xl dark:bg-[#F09B00] bg-[#FF0B5C] flex flex-col lg:flex-row gap-8 p-8 sm:p-12 md:p-16 my-12 sm:my-16">
        {/* Left Content */}
        <div className="w-full lg:w-1/3 flex flex-col justify-between mb-8">
          <div className="font-montserrat font-bold text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] text-white dark:text-black leading-tight">
            Flexible plans for locals, adapt to your needs.
          </div>
          <div className="text-[16px] sm:text-[18px] md:text-[20px] text-white dark:text-black mt-4">
            Check out personalized pricing designed around your unique needs,
            ensuring you get the best value.
          </div>
          <div className="dark:bg-[#f0be62] bg-[#ee5d8d] font-semibold w-44 rounded-lg text-center py-4 mt-6 cursor-pointer select-none">
            Down bellow
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-2/3">
          <img
            className="w-full h-auto rounded-lg"
            src="/images/journal.png"
            alt="journal"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-[#18181B] border-2 border-black dark:border-[#18181B] mt-8 p-6 sm:p-8 rounded-3xl text-center space-y-6">
        <div className="font-montserrat font-bold text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] text-black dark:text-white leading-tight">
          Join our local community of users!
        </div>
        <div className="text-[16px] sm:text-[18px] md:text-[20px] text-gray-700 dark:text-gray-300">
          Become part of the thousands of locals working together and achieving
          their best with BigskyEats
        </div>

        <form className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8">
          <input
            type="email"
            name="localUser"
            id="localUser"
            placeholder="Enter your email"
            className="border-2 border-black dark:border-gray-700 bg-white dark:bg-black p-2 rounded-lg w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-[#FF0B5C] dark:focus:ring-[#F09B00] transition"
          />
          <input
            type="submit"
            value="Sign up as a local"
            className="dark:bg-[#F09B00] bg-[#FF0B5C] rounded-lg px-6 py-2 text-[16px] font-semibold cursor-pointer hover:brightness-110 transition"
          />
        </form>
      </div>
    </div>
  )
}
