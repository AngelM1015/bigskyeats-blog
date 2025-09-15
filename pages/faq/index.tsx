import Head from 'next/head'

export default function FaqPage() {
  const faqs = [
    {
      question: 'What is BigSkyEats?',
      answer:
        'BigSkyEats is a comprehensive food delivery platform being built for Big Sky, Montana. We\'re developing innovative solutions to connect customers with local restaurants, offering convenient delivery services with real-time tracking and transparent pricing.',
    },
    {
      question: 'How will the delivery service work?',
      answer:
        'Once launched, customers will be able to browse participating restaurants, place orders through our app or website, and track deliveries in real-time. Our local drivers will pick up orders and deliver them fresh to your door.',
    },
    {
      question: 'What restaurants will be available on BigSkyEats?',
      answer:
        'We\'re building partnerships with local Big Sky restaurants including Thai Basil, BlindSide Burger, Wrap Shack, Pink G\'s, Café 191, and TipsUp. Our platform is designed to seamlessly integrate with popular POS systems like Zuppler, Square, Toast, and SpotOn.',
    },
    {
      question: 'How much does delivery cost?',
      answer:
        'Delivery fees vary based on distance and demand. We offer transparent pricing with no hidden fees. You can see the exact delivery cost before placing your order.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit cards, debit cards, and digital payment methods through our secure Stripe integration. All payments are processed safely and securely.',
    },
    {
      question: 'How can I become a delivery driver?',
      answer:
        'We\'re building our driver network and will be looking for reliable local drivers soon! You can express interest through our platform or contact us directly. We plan to offer competitive compensation and flexible scheduling for our driver partners.',
    },
  ]

  return (
    <div className="bg-white dark:bg-[#09090B] text-black dark:text-white ">
      <Head>
        <title>FAQ | BigSkyEats</title>
        <meta
          name="description"
          content="Got questions about BigSkyEats delivery platform? We've got answers. Find out more about our upcoming delivery service, planned restaurant partnerships, and how to get involved here."
        />
      </Head>

      <section className="max-w-4xl mx-auto px-6 py-12 ">
        <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index}>
              <h2 className="text-xl font-semibold mb-2">{faq.question}</h2>
              <p className="text-lg ">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
