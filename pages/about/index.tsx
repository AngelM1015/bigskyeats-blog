import Head from 'next/head'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-[#09090B] text-black dark:text-white ">
      <Head>
        <title>About Us | BigSkyEats</title>
        <meta
          name="description"
          content="Learn more about BigSkyEats — your go-to blog for hearty meals, rustic recipes, and sky-high flavor inspiration."
        />
      </Head>

      <section className="max-w-4xl mx-auto px-6 py-12 ">
        <h1 className="text-4xl font-bold mb-4">About BigSkyEats</h1>

        <p className="mb-6 text-lg leading-relaxed">
          Welcome to <strong>BigSkyEats</strong> — where the flavors are bold,
          the recipes are hearty, and the inspiration comes straight from the
          open skies of the American West.
        </p>

        <p className="mb-6 text-lg leading-relaxed">
          Whether you are a home cook looking to spice up weeknight dinners, or
          an adventurer craving campfire-ready meals, BigSkyEats brings you
          simple, rustic recipes that taste like home (wherever that may be).
        </p>

        <p className="mb-6 text-lg leading-relaxed">
          Our mission is to connect people through food — from smoky Montana BBQ
          to farm-to-table comfort dishes. Each recipe is tested with love,
          written with clarity, and infused with the soul of the outdoors.
        </p>

        <div className="my-8">
          <Image
            src="/images/bigskyeats.png" // make sure this image exists in /public/images
            width={800}
            height={500}
            alt="Campfire cooking under the big sky"
            className="rounded-lg shadow-md"
          />
        </div>

        <p className="mb-6 text-lg leading-relaxed">
          Thanks for stopping by — we’re glad you’re here. Pull up a chair, grab
          your cast iron, and let’s cook something unforgettable.
        </p>

        <p className="text-base ">— The BigSkyEats Team</p>
      </section>
    </div>
  )
}
