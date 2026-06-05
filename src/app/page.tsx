import Link from 'next/link'
import Image from 'next/image'

export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between" style={{ backgroundColor: '#2b2b2b' }}>
      {/* Gold top border */}
      <div className="w-full h-1 shrink-0" style={{ backgroundColor: '#b89a4e' }} />

      {/* Center content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">

        {/* NDU Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="mb-4">
            <Image src="/ndu-logo.png" alt="NDU Logo" width={220} height={82} priority className="max-w-[70vw] h-auto" />
          </div>
          <p className="text-white text-2xl font-light tracking-widest">Blackboard</p>
        </div>

        {/* Maintenance icon */}
        <div className="mb-6">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#b89a4e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>

        {/* Message */}
        <h1 className="text-white text-xl font-light mb-3 tracking-wide">
          The main domain is currently down
        </h1>
        <p className="text-gray-400 text-sm mb-10 max-w-sm leading-relaxed">
          We are performing ongoing updates to improve your experience. We apologize for the inconvenience.
        </p>

        {/* CTA button */}
        <Link
          href="/login"
          className="px-8 py-3 border border-white text-white text-sm tracking-widest hover:bg-white hover:text-[#2b2b2b] transition-colors duration-200"
        >
          Go to Temporary Login Page
        </Link>
      </div>

      {/* Footer */}
      <p className="text-gray-500 text-xs pb-5 shrink-0">© 1997-2026 Blackboard Inc. All Rights Reserved.</p>
    </div>
  )
}
