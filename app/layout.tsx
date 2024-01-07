import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import getConfig from 'next/config';
import './globals.css'
import AppHeader from '@/components/app/AppHeader';

const opensans = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'paperworkplayground',
  description: 'Lorem ipsum dolor site amet.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { publicRuntimeConfig } = getConfig();
  const version = publicRuntimeConfig?.version
  return (
    <html lang="en">
      <body className={opensans.className} style={{ backgroundColor: '#F7F7F7' }}>
        <AppHeader version={version} />
        <div className='px-12 py-8'>
          {children}</div></body>
    </html>
  )
}
