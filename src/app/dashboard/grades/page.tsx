export default function GradesPage() {
  const courses = [
    {
      code: 'SP26-ENG105-A-NLC',
      name: 'SP26-ENGLISH 105 - A-NLC',
      color: '#06b6d4',
      grade: '85',
      letter: 'B',
      letterColor: '#22c55e',
      letterBg: '#dcfce7',
    },
    {
      code: 'SP26-IDP222-223-226',
      name: 'SP26-IDP 222-223-226',
      color: '#7c3aed',
      grade: '85',
      letter: 'B',
      letterColor: '#22c55e',
      letterBg: '#dcfce7',
    },
    {
      code: 'SP26-ARB238-NLC',
      name: 'SP26-ARB 238 - HUMAN THOUGHT IN ARABIC LIT',
      color: '#1d4ed8',
      grade: '85',
      letter: 'B',
      letterColor: '#22c55e',
      letterBg: '#dcfce7',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-5">
        <h1 className="text-3xl font-light text-gray-800">Grades</h1>
      </div>

      <div className="px-8 py-8">

        {/* Section title */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-light text-gray-400 mb-2">Current Courses and Organizations</h2>
          <div className="w-2 h-2 rounded-full bg-gray-400 mx-auto" />
        </div>

        {/* Course cards */}
        <div className="space-y-5 max-w-4xl mx-auto">
          {courses.map(course => (
            <div key={course.code} className="bg-white border border-gray-200 rounded overflow-hidden">

              {/* Colored top border */}
              <div className="h-1" style={{ backgroundColor: course.color }} />

              {/* Card header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <div>
                  <p className="text-xs text-gray-500 mb-1">{course.code}</p>
                  <p className="text-lg font-semibold text-gray-800">{course.name}</p>
                </div>
                <div className="flex items-center gap-3">
                  {/* Clock icon */}
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {/* Grade letter badge */}
                  <span className="px-3 py-1 rounded-full text-sm font-semibold"
                    style={{ backgroundColor: course.letterBg, color: course.letterColor }}>
                    {course.letter}
                  </span>
                </div>
              </div>

              {/* Recent Grades */}
              <div className="px-6 py-4">
                <p className="text-sm font-medium text-gray-700 mb-3">Recent Grades</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Calculator icon */}
                    <div className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5">
                        <rect x="4" y="2" width="16" height="20" rx="2"/>
                        <line x1="8" y1="6" x2="16" y2="6"/>
                        <line x1="8" y1="10" x2="10" y2="10"/><line x1="9" y1="9" x2="9" y2="11"/>
                        <line x1="14" y1="10" x2="16" y2="10"/>
                        <line x1="8" y1="14" x2="10" y2="14"/>
                        <line x1="14" y1="13" x2="16" y2="15"/><line x1="14" y1="15" x2="16" y2="13"/>
                        <line x1="8" y1="18" x2="10" y2="18"/>
                        <line x1="14" y1="18" x2="16" y2="18"/>
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">New Total Calculation 6/3/26</span>
                  </div>

                  {/* Grade pill */}
                  <span className="px-4 py-1.5 rounded-full text-sm font-semibold text-white"
                    style={{ backgroundColor: '#22c55e' }}>
                    {course.grade} / 100
                  </span>
                </div>
              </div>

              {/* View all work */}
              <div className="px-6 py-3 border-t border-gray-100 text-right">
                <button className="text-sm text-blue-600 hover:underline">View all work (16)</button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Help */}
      <div className="fixed bottom-6 right-6">
        <button className="w-9 h-9 rounded-full border-2 border-gray-400 flex items-center justify-center text-gray-500 hover:border-gray-600 text-sm font-semibold">?</button>
      </div>

    </div>
  )
}
