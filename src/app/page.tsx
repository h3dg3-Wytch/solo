'use client'

import Link from 'next/link'
import { useUser } from './providers'  // adjust import if needed

export default function HomePage() {
  const user = useUser()

  if (!user) {
    // Signed-out Landing Page
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900">
            Adventure Crafter
          </h1>
          <p className="mt-6 text-lg text-gray-700">
            Adventure Crafter helps you design dynamic adventures with characters, plotlines,
            and turning points — giving your stories structure and spontaneity.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/login"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="px-6 py-3 bg-gray-100 text-gray-800 font-semibold rounded-lg border hover:bg-gray-200 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </main>
    )
  }

  // Signed-in Dashboard
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center py-20 px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900">
          Adventure Crafter
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Build dynamic adventures with characters, plotlines, and turning points.
        </p>
      </section>

      {/* Navigation Cards */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 pb-20">
        <Link
          href="/adventure-sheet"
          className="bg-white shadow-sm rounded-2xl p-6 border hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold text-gray-800">Start New Adventure</h2>
          <p className="mt-2 text-gray-600">
            Create a fresh adventure with plotlines, turning points, and notes.
          </p>
        </Link>

        <Link
          href="#"
          className="bg-white shadow-sm rounded-2xl p-6 border cursor-not-allowed shadow-md"
        >
          <h2 className="text-xl font-semibold text-gray-800">View Adventures</h2>
          <p className="mt-2 text-gray-600">
            Browse and continue your saved adventures.
          </p>
        </Link>

        <Link
          href="/generators"
          className="bg-white shadow-sm rounded-2xl p-6 border  cursor-not-allowed shadow-md"
        >
          <h2 className="text-xl font-semibold text-gray-800">Generators</h2>
          <p className="mt-2 text-gray-600">
            Explore plot points, descriptors, identities, and special traits.
          </p>
        </Link>
      </section>
    </main>
  )
}
