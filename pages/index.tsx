import IndexPage from 'components/IndexPage'
import PreviewIndexPage from 'components/PreviewIndexPage'
import Tabs from 'components/Tabs'
import { readToken } from 'lib/sanity.api'
import { getAllPosts, getClient, getSettings } from 'lib/sanity.client'
import { Post, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'
import {
  ArrowUp,
  Facebook,
  Instagram,
  Link2,
  Linkedin,
  LinkIcon,
  MoveRight,
  Play,
  Twitter,
  Youtube,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Navbar } from 'components/Navbar'
import { HeroSection } from 'components/HeroSection'
import { KeyCapabilitiesSection } from 'components/KeyCapabilitiesSection'
import { MainFeatureSection } from 'components/MainFeatureSection'
import { Footer } from 'components/Footer'
import { ScrollToTopButton } from 'components/ScrollToTopButton'

interface PageProps extends SharedPageProps {
  posts: Post[]
  settings: Settings
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const { posts, settings, draftMode } = props

  if (draftMode) {
    return <PreviewIndexPage posts={posts} settings={settings} />
  }

  return (
    <div className="bg-white dark:bg-[#09090B] text-black dark:text-white ">
      <Navbar />
      <div className="px-24">
        <HeroSection />
        <KeyCapabilitiesSection />
        <MainFeatureSection />
        <ScrollToTopButton />
        <Footer />
      </div>
      {/* <IndexPage posts={posts} settings={settings} /> */}
    </div>
  )
}
