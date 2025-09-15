import Image from 'next/image'

const roles = ['customer', 'partner', 'restaurant_owner'] as const
type UserRole = (typeof roles)[number]

const featureContent: Record<
  UserRole,
  { title: string; image: string; points: string[] }
> = {
  customer: {
    title: 'For Customers',
    image: '/images/bigskyeats.png',
    points: [
      'Browse and order from local restaurants easily',
      'Track your deliveries in real-time',
      'Earn loyalty points and rewards',
    ],
  },
  partner: {
    title: 'For Partners',
    image: '/images/bigskyresort.png',
    points: [
      'Grow your reach through our platform',
      'Analytics and insights for performance',
      'Flexible commission-based model',
    ],
  },
  restaurant_owner: {
    title: 'For Restaurant Owners',
    image: '/images/bigskyshop.png',
    points: [
                  'Seamless POS integration with Zuppler, Square, and Toast',
      'Manage menus and orders with ease',
      'Onboarding support and dedicated tools',
    ],
  },
}

const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white dark:bg-[#09090B] text-black dark:text-white">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
        About Us
      </h1>
      <p className="text-base sm:text-lg text-center mb-14 max-w-2xl mx-auto">
        BigSkyEats is an on-demand delivery system being built for efficiency,
        transparency, and growth — designed to serve locals, tourists, partners, and
        restaurants in Big Sky, Montana.
      </p>

      {roles.map((role, index) => {
        const { title, image, points } = featureContent[role]
        const isEven = index % 2 === 0

        return (
          <div
            key={role}
            className={`flex flex-col lg:flex-row ${
              !isEven ? 'lg:flex-row-reverse' : ''
            } items-center gap-8 mb-16`}
          >
            <div className="w-full lg:w-1/2">
              <Image
                src={image}
                alt={title}
                width={600}
                height={400}
                className="w-full h-auto rounded-xl shadow-md object-cover"
                priority
              />
            </div>
            <div className="w-full lg:w-1/2 px-2 sm:px-4 lg:px-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                {title}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-base sm:text-lg">
                {points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default AboutPage
