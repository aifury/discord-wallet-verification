import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        {/* Header Section */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Kyle&#39;s Bitches - Diamond Holders Verification
          </h1>
          <p className="text-xl text-gray-300">
            Connect your Discord and Solana wallet to access exclusive features
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-2xl mb-2">🔐</div>
            <h3 className="text-lg font-semibold mb-2">Secure Verification</h3>
            <p className="text-gray-400">
              Safe and secure wallet verification process
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="text-lg font-semibold mb-2">Instant Access</h3>
            <p className="text-gray-400">
              Get immediate access to exclusive channels
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-2xl mb-2">💎</div>
            <h3 className="text-lg font-semibold mb-2">Diamond Benefits</h3>
            <p className="text-gray-400">
              Special perks for diamond holders
            </p>
          </div>
        </div>

        {/* Steps Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">How It Works</h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <div className="flex-1 bg-gray-800 p-4 rounded-lg">
              <div className="font-bold text-blue-400 mb-2">Step 1</div>
              <p>Connect your Discord account</p>
            </div>
            <div className="hidden md:block text-gray-500">→</div>
            <div className="flex-1 bg-gray-800 p-4 rounded-lg">
              <div className="font-bold text-blue-400 mb-2">Step 2</div>
              <p>Link your Solana wallet</p>
            </div>
            <div className="hidden md:block text-gray-500">→</div>
            <div className="flex-1 bg-gray-800 p-4 rounded-lg">
              <div className="font-bold text-blue-400 mb-2">Step 3</div>
              <p>Gain diamond holder access</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-12">
          <Link 
            href="/verify" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
          >
            Start Verification
          </Link>
        </div>

        {/* Footer Note */}
        <p className="text-sm text-gray-400 mt-8">
          Need help? Contact us on Discord
        </p>
      </div>
    </main>
  );
}