import './globals.css'
import type { Metadata } from 'next'
import { inter } from '@/lib/fonts'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'FriendScope - Scientific Friendship Assessment Tool',
  description: 'Evidence-based friendship evaluation platform providing comprehensive relationship analysis with complete privacy protection. Take our 20-question assessment and get instant insights.',
  keywords: [
    'friendship assessment',
    'relationship analysis', 
    'interpersonal skills',
    'friendship quality test',
    'relationship psychology',
    'social connections',
    'friendship evaluation',
    'relationship improvement',
    'anonymous assessment',
    'privacy-protected evaluation'
  ],
  authors: [{ name: 'FriendScope Development Team' }],
  creator: 'FriendScope',
  publisher: 'FriendScope',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://friendscope.vercel.app',
    title: 'FriendScope - Scientific Friendship Assessment Tool',
    description: 'Evidence-based friendship evaluation with complete privacy protection. Get instant insights into your relationships.',
    siteName: 'FriendScope',
    images: [
      {
        url: 'https://friendscope.vercel.app/friendscope-logo.png',
        width: 1200,
        height: 630,
        alt: 'FriendScope - Scientific Friendship Assessment Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FriendScope - Scientific Friendship Assessment Tool',
    description: 'Evidence-based friendship evaluation with complete privacy protection.',
    images: ['https://friendscope.vercel.app/friendscope-logo.png'],
    creator: '@friendscope',
  },
  icons: {
    icon: '/friendscope-logo.svg',
    apple: '/friendscope-logo.png',
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://friendscope.vercel.app',
  },
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
      <body className={inter.className}>
      <div className="flex flex-col min-h-screen">
          <Header/>
          <main className="flex-grow pt-16">{children}</main>
          <Footer/>
      </div>
      </body>
      </html>
  )
}
