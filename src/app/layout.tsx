import './globals.css'
import type { Metadata } from 'next'
import { headers } from 'next/headers'

import { cookieToInitialState } from 'wagmi'

import { config } from '@/config'
import Web3ModalProvider from '@/context'

import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Daily Enigma',
  description: 'Decentralized Programming Challenges'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))
  return (
    <html lang="en">
      <body>
        <Web3ModalProvider initialState={initialState}>
          <Nav />
          {children}
        </Web3ModalProvider>
      </body>
    </html>
  )
}
