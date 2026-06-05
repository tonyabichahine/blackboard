'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      setError(data.error || 'Invalid username or password')
      return
    }

    if (data.role === 'admin') {
      router.push('/admin')
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-between" style={{ backgroundColor: '#2b2b2b' }}>
      {/* Gold top border */}
      <div className="w-full h-1" style={{ backgroundColor: '#b89a4e' }} />

      {/* Center content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        {/* NDU Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="mb-4">
            <NduLogo />
          </div>
          <p className="text-white text-2xl font-light tracking-widest">Blackboard</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-80">
          <div className="flex flex-col gap-1">
            <label className="text-white text-sm font-semibold">Username</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="bg-transparent border-0 border-b border-white text-white outline-none py-2 text-sm"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-white text-sm font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="bg-transparent border-0 border-b border-white text-white outline-none py-2 text-sm"
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 py-3 border border-white text-white text-sm tracking-widest hover:bg-white hover:text-[#2b2b2b] transition-colors duration-200 disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>

      {/* Footer */}
      <p className="text-gray-500 text-xs pb-6">© 1997-2026 Blackboard Inc. All Rights Reserved.</p>
    </div>
  )
}

function NduLogo() {
  return (
    <svg width="240" height="86" viewBox="0 0 240 86" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Left white panel */}
      <rect x="0" y="0" width="78" height="80" rx="6" fill="white" />
      {/* Bird silhouette (simple) */}
      <path d="M20 55 C25 35 45 28 55 38 C48 32 35 34 30 50 Z" fill="#2b2b2b" />
      <path d="M28 58 C22 48 18 38 25 30 C20 38 22 50 30 56 Z" fill="#2b2b2b" />
      <path d="M38 62 L28 56 L32 48 L42 54 Z" fill="#2b2b2b" />
      {/* Right dark panel */}
      <rect x="82" y="0" width="158" height="80" rx="6" fill="#2d3748" />
      {/* NDU text */}
      <text x="95" y="50" fontSize="38" fontWeight="900" fill="white" fontFamily="Arial Black, Arial" letterSpacing="2">NDU</text>
      {/* Tagline */}
      <text x="88" y="68" fontSize="8.5" fill="#94a3b8" fontFamily="Arial" letterSpacing="2.5">GAUDIUM DE VERITATE</text>
    </svg>
  )
}
