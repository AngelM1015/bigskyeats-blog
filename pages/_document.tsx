import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google Identity Services for Auto-Detection */}
        <script src="https://accounts.google.com/gsi/client" async defer></script>
      </Head>
      <body className="bg-white text-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
