export default function GradesPage() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Page header */}
      <div className="bg-white border-b border-gray-200 px-8 py-5">
        <h1 className="text-3xl font-light text-gray-800">Grades</h1>
      </div>

      <div className="px-8 py-8">

        {/* Section title */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-light text-gray-400 mb-2">Current Courses and Organizations</h2>
          <div className="w-2 h-2 rounded-full bg-gray-400 mx-auto" />
        </div>

        <div className="space-y-5 max-w-4xl mx-auto">

          {/* ── Card 1: ARB — empty state ── */}
          <div className="bg-white border border-gray-200 rounded overflow-hidden">
            <div className="h-1.5" style={{ backgroundColor: '#1d4ed8' }} />
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div>
                <p className="text-xs text-gray-500 mb-1">SP26-ARB238A-NLC</p>
                <p className="text-lg font-semibold text-gray-800">SP26-HUMAN THOUGHT IN ARABIC LIT - A-NLC</p>
              </div>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            {/* Diagonal stripe empty state */}
            <div className="px-6 py-8 text-center" style={{
              background: 'repeating-linear-gradient(-45deg, #f9fafb, #f9fafb 6px, #f3f4f6 6px, #f3f4f6 12px)'
            }}>
              <p className="text-sm text-gray-400">When grades are available for this course or organization, they appear here</p>
            </div>
          </div>

          {/* ── Card 2: English — with grades ── */}
          <div className="bg-white border border-gray-200 rounded overflow-hidden">
            <div className="h-1.5" style={{ backgroundColor: '#06b6d4' }} />
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500">SP26-ENL105A-NLC</p>
                  <p className="text-base font-semibold text-gray-800">SP26-ENGLISH 105 - A-NLC</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">SP26-IDP222-223-226</p>
                  <p className="text-base font-semibold text-gray-800">SP26-IDP 222-223-226</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">SP26-ARB238A-NLC</p>
                  <p className="text-base font-semibold text-gray-800">SP26-ARB 238 - HUMAN THOUGHT IN ARABIC LIT</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span className="px-3 py-1 rounded-full text-sm font-semibold text-white" style={{ backgroundColor: '#22c55e' }}>
                  B+
                </span>
              </div>
            </div>

            {/* Recent Grades */}
            <div className="px-6 py-4">
              <p className="text-sm font-medium text-gray-700 mb-3">Recent Grades</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/calc-icon.png" alt="calculator" className="w-10 h-10 object-contain" />
                  <span className="text-sm text-gray-700">New Total Calculation 6/3/26</span>
                </div>
                <span className="px-4 py-1.5 rounded-full text-sm font-semibold text-white" style={{ backgroundColor: '#22c55e' }}>
                  88 / 100
                </span>
              </div>
            </div>

            <div className="px-6 py-3 border-t border-gray-100 text-right">
              <button className="text-sm text-blue-600 hover:underline underline">View all work (16)</button>
            </div>
          </div>

        </div>
      </div>

      <div className="fixed bottom-6 right-6">
        <button className="w-9 h-9 rounded-full border-2 border-gray-400 flex items-center justify-center text-gray-500 hover:border-gray-600 text-sm font-semibold">?</button>
      </div>

    </div>
  )
}
