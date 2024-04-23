"use client"
import { useRouter } from "next/navigation";
import { useAccountEffect } from "wagmi"
import React, { useState } from 'react'

import * as Client from "@web3-storage/w3up-client"
import { StoreMemory } from "@web3-storage/w3up-client/stores/memory"
import { importDAG } from "@ucanto/core/delegation"
import { CarReader } from "@ipld/car"
import * as Signer from "@ucanto/principal/ed25519"

export default function Page() {
  const router = useRouter()
  const [uploadUrl, setUploadUrl] = useState("")

  const uploadFile = async (file: any): Promise<void> => {
    const privateKey = process.env.NEXT_PUBLIC_IPFS_PRIV_KEY;
    const principal = Signer.parse(privateKey || "private-key");
    const store = new StoreMemory()
    const client = await Client.create({ principal, store })
    const proof = process.env.NEXT_PUBLIC_IPFS_PROOF || "default-proof";
    const parsedProof = await parseProof(proof)
    if (parsedProof === null || parsedProof === undefined) {
      console.error('Invalid or missing proof, cannot proceed.');
      return;
    }
    const space = await client.addSpace(parsedProof)
    await client.setCurrentSpace(space.did())
    // READY to go!

    console.log("Succesfully setup ipfs client!")
    try {
      const Cid = await client.uploadFile(file)
      console.log("Succesfully uploaded file!")
      console.log(`https://${Cid}.ipfs.w3s.link`)
      const newUrl = `https://${Cid}.ipfs.w3s.link`
      setUploadUrl(newUrl)
    } catch (error) {
      console.log('Error uploading file:', error);
    }
  }

  const handleFileUpload = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const inputFile = event.currentTarget.elements.namedItem('filename') as HTMLInputElement | null;

    if (inputFile && inputFile.type === 'file') {
      const file = inputFile.files ? inputFile.files[0] : null;

      if (file) {
        await uploadFile(file);
      } else {
        console.log("No file selected");
      }
    } else {
      console.error("The file input was not found.");
    }
  };
  /** @param {string} data Base64 encoded CAR file */
  async function parseProof(data: string) {
    if (!data) {
      console.error("No proof data provided");
      return; // Stop execution if no data provided
    }
    try {
      const decodedData = Buffer.from(data, 'base64');
      const blocks: any = [];
      const reader = await CarReader.fromBytes(decodedData);
      for await (const block of reader.blocks()) {
        blocks.push(block);
      }
      return importDAG(blocks);
    } catch (error) {
      console.error("Error decoding or reading CAR data:", error);
      return null; // Or handle the error appropriately
    }
  }

  useAccountEffect({
    onDisconnect() {
      router.push('./')
    }
  })

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Upload Your Code</h2>
        <form onSubmit={handleFileUpload} className="flex flex-col space-y-4">
          <input
            type="file"
            id="myFile"
            name="filename"
            className="block w-full text-sm text-gray-700
                               file:mr-4 file:py-2 file:px-4
                               file:rounded-full file:border-0
                               file:text-sm file:font-semibold
                               file:bg-blue-50 file:text-blue-700
                               hover:file:bg-blue-100"
          />
          <input
            type="submit"
            value="Upload"
            className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
          />
        </form>
        {uploadUrl && (
          <p className="mt-4 text-center">
            File uploaded! Access it <a href={uploadUrl} className="text-blue-500 hover:text-blue-600 underline">here</a>.
          </p>
        )}
      </div>
    </div>
  )
}
