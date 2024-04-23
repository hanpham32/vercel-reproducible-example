"use client"

import { useDisconnect } from 'wagmi'

export default function DisconnectButton() {
  const { disconnect } = useDisconnect()

  return (
    <>
      <button className="text-white py-2 px-4 bg-blue-400 rounded-full" onClick={() => disconnect()}>Disconnect Wallet</button>
    </>
  )
}
