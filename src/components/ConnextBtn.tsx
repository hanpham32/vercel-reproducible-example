"use client"

import { useWeb3Modal } from '@web3modal/wagmi/react'

export default function ConnectButton() {
  const { open } = useWeb3Modal()

  return (
    <>
      <button className="text-white py-2 px-4 bg-blue-400 rounded-full" onClick={() => open({ view: 'Networks' })}>Connect Wallet</button>
    </>
  )
}
