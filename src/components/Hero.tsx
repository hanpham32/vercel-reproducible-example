export default function Hero() {
  return (
    <div className="h-screen">
      <div className="hero bg-[url('/hero-bg.png')] h-1/2 bg-cover bg-center pt-2">
        <div className="pl-8">
          <h1 className="mt-12 text-4xl font-bold pl-8">Decentralized Coding Platform!</h1>
        </div>
        <div className="mt-32 text-center text-xl">
          Connect Your Wallet to Get Started
        </div>
      </div>
    </div>
  )
}
