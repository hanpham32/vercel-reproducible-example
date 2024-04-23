"use client"

import React from "react";
import ConnectButton from "./ConnextBtn";
import Image from 'next/image';
import { useAccount } from "wagmi";
import DisconnectButton from "./DisconnectBtn";

export default function Nav() {
  const { address, isConnected } = useAccount()

  return (
    <div className="bg-gray-600 flex justify-between items-center p-2">
      <div className="flex items-center space-x-2">
        <div className="text-white font-bold">App</div>
      </div>
      {isConnected ?
        <div className="flex items-center">
          <DisconnectButton />
          {
            address ? <div className="text-white font-thin ml-2">{address.slice(0, 7)}...</div> : null
          }
        </div>
        : <ConnectButton />
      }

    </div>
  )
}
