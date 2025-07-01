import Head from 'next/head'

export default function FaqPage() {
  const faqs = [
    {
      question: 'What is BigSkyEats?',
      answer:
        'BigSkyEats is a food blog that shares rustic recipes, hearty meals, and outdoor-inspired cooking tips inspired by the spirit of the American West.',
    },
    {
      question: 'Who writes the recipes?',
      answer:
        'Our team of passionate home cooks and food lovers create and test every recipe to ensure it’s approachable, delicious, and perfect for both everyday meals and special occasions.',
    },
    {
      question: 'Do you offer vegetarian or vegan recipes?',
      answer:
        "Yes! While we love classic comfort food, we also believe in variety. You'll find vegetarian, vegan, and gluten-free options throughout our blog.",
    },
    {
      question: 'Can I submit a recipe or guest post?',
      answer:
        'We love collaborating! If you’re interested in contributing to BigSkyEats, send us a message via our Contact page with your idea.',
    },
    {
      question: 'Are the recipes beginner-friendly?',
      answer:
        'Absolutely. Most of our recipes include step-by-step instructions, tips, and common ingredient alternatives so anyone can follow along.',
    },
  ]

  return (
    <div className="bg-white dark:bg-[#09090B] text-black dark:text-white ">
      <Head>
        <title>FAQ | BigSkyEats</title>
        <meta
          name="description"
          content="Got questions about BigSkyEats? We’ve got answers. Find out more about our recipes, contributors, and cooking philosophy here."
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
