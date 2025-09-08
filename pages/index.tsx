import { Footer } from 'components/Footer'
import { HeroSection } from 'components/HeroSection'
import IndexPage from 'components/IndexPage'
import { KeyCapabilitiesSection } from 'components/KeyCapabilitiesSection'
import { MainFeatureSection } from 'components/MainFeatureSection'
import { Navbar } from 'components/Navbar'
import PreviewIndexPage from 'components/PreviewIndexPage'
import { ScrollToTopButton } from 'components/ScrollToTopButton'
import Tabs from 'components/Tabs'
import { readToken } from 'lib/sanity.api'
import { getAllPosts, getClient, getSettings } from 'lib/sanity.client'
import { Post, Settings } from 'lib/sanity.queries'
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
import { GetStaticProps } from 'next'
import Link from 'next/link'
import type { SharedPageProps } from 'pages/_app'
import { useEffect, useState } from 'react'

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
      <div className="px-4 md:px-24">
        <HeroSection />
        <KeyCapabilitiesSection />
        <MainFeatureSection />
        <ScrollToTopButton />
      </div>
    </div>
  )
}
