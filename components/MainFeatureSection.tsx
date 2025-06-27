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
      <div className="text-white">
        <div className="font-montserrat text-[52px] font-bold">
          Food delivery. Redefined.
        </div>
        <div>
          Unlike other SaaS products(UberEats, DoorDash), we keep things local
          and make sure we are always a benefit to restaurants in the area,
          never a detriment, their success is just as important as ours.
        </div>
      </div>
      <div>
        <img className="w-full" src="/images/dummy.png" alt="dummy" />
      </div>

      <div className="flex flex-col items-center">
        <div className="text-white text-center w-2/3">
          <div className="font-montserrat font-bold text-[32px]">
            Core capabilities and ways to accelerate innovation and growth to a
            local driven community.
          </div>
          <div>
            Maximize your productivity and save time with our revolutionary
            product, app/& web portal as it has a powerful set of features.
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8 text-white">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-6 bg-[#18181B] rounded-lg shadow-lg"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-white rounded-3xl bg-[#4C1D95] flex gap-8 p-16">
        <div className="w-1/3 flex flex-col justify-between mb-8">
          <div className="font-montserrat font-bold text-[36px]">
            Flexible plans for locals, adapt to your needs.
          </div>
          <div>
            Check out personalized pricing designed around your unique needs,
            ensuring you get the best value.
          </div>
          <div className="bg-[#6E31DE] font-semibold w-32 rounded-lg text-center py-4">
            Down bellow
          </div>
        </div>
        <div className="w-2/3">
          <img className="w-full" src="/images/journal.png" alt="journal" />
        </div>
      </div>

      <div className="bg-[#18181B] text-white mt-8 p-8 rounded-3xl text-center space-y-8">
        <div className="font-montserrat font-bold text-[36px]">
          Join our local community of users!
        </div>
        <div>
          Become part of the thousands of locals working together and achieving
          their best with BigskyEats
        </div>

        <div className="space-x-8">
          <input
            type="email"
            name="localUser"
            id="localUser"
            placeholder="Enter your email"
            className="bg-black p-2 w-64 rounded-lg"
          />
          <input
            type="submit"
            value="Sign up as a local"
            className="bg-[#6E31DE] rounded-lg px-6 py-2 text-[16px]"
          />
        </div>
      </div>
    </div>
  )
}
