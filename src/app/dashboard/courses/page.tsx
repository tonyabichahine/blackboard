'use client'

import { useState } from 'react'

const ALL_COURSES = [
  {
    id: 1,
    code: 'SP26-ENG105-A-NLC',
    name: 'SP26-ENGLISH 105 - A-NLC',
    status: 'Open',
    instructors: 'Multiple Instructors',
    term: 'SP26',
    color: '#06b6d4',
    moreInfo: 'Credits: 3 | Campus: NLC | Schedule: Mon/Wed/Fri',
  },
  {
    id: 2,
    code: 'SP26-IDP222-223-226',
    name: 'SP26-IDP 222-223-226',
    status: 'Open',
    instructors: 'Multiple Instructors',
    term: 'SP26',
    color: '#7c3aed',
    moreInfo: 'Credits: 9 | Campus: NLC | Schedule: Mon/Tue/Thu',
  },
  {
    id: 3,
    code: 'SP26-ARB238-NLC',
    name: 'SP26-ARB 238 - HUMAN THOUGHT IN ARABIC LIT',
    status: 'Open',
    instructors: 'Multiple Instructors',
    term: 'SP26',
    color: '#1d4ed8',
    moreInfo: 'Credits: 3 | Campus: NLC | Schedule: Tue/Thu',
  },
]

export default function CoursesPage() {
  const [search, setSearch] = useState('')
  const [term, setTerm] = useState('all')
  const [filter, setFilter] = useState('all')
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  const [starred, setStarred] = useState<Set<number>>(new Set())
  const [expanded, setExpanded] = useState<Set<number>>(new Set())

  const filtered = ALL_COURSES.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase())
    const matchTerm = term === 'all' || c.term === term
    return matchSearch && matchTerm
  })

  function toggleStar(id: number) {
    setStarred(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
  }

  function toggleExpand(id: number) {
    setExpanded(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-5">
        <h1 className="text-3xl font-light text-gray-800">Courses</h1>
      </div>

      <div className="px-8 py-6">

        {/* Toolbar */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">

          {/* View toggle */}
          <div className="flex border border-gray-300 rounded overflow-hidden">
            <button onClick={() => setViewMode('list')}
              className={`px-3 py-2 ${viewMode === 'list' ? 'bg-gray-800 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
                <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
              </svg>
            </button>
            <button onClick={() => setViewMode('grid')}
              className={`px-3 py-2 border-l border-gray-300 ${viewMode === 'grid' ? 'bg-gray-800 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
              </svg>
            </button>
          </div>

          {/* Search */}
          <div className="relative flex-1 min-w-48 max-w-sm">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search your courses"
              className="w-full border border-gray-300 rounded pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
          </div>

          {/* Terms dropdown */}
          <div className="relative">
            <label className="absolute -top-2.5 left-3 bg-gray-100 px-1 text-xs text-gray-500 z-10">Terms</label>
            <select value={term} onChange={e => setTerm(e.target.value)}
              className="border border-gray-400 rounded px-3 py-2 pr-8 text-sm text-gray-700 bg-gray-100 appearance-none focus:outline-none min-w-[140px]">
              <option value="all">All Terms</option>
              <option value="SP26">Spring 2026</option>
            </select>
            <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          </div>

          {/* Filters dropdown */}
          <div className="relative">
            <label className="absolute -top-2.5 left-3 bg-gray-100 px-1 text-xs text-gray-500 z-10">Filters</label>
            <select value={filter} onChange={e => setFilter(e.target.value)}
              className="border border-gray-400 rounded px-3 py-2 pr-8 text-sm text-gray-700 bg-gray-100 appearance-none focus:outline-none min-w-[140px]">
              <option value="all">All courses</option>
              <option value="open">Open</option>
            </select>
            <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          </div>

          {/* Items per page */}
          <div className="flex items-center gap-2">
            <select className="border border-gray-300 rounded px-2 py-2 text-sm text-gray-700 bg-white appearance-none focus:outline-none w-14">
              <option>25</option>
              <option>50</option>
            </select>
            <span className="text-sm text-gray-600 whitespace-nowrap">items per page</span>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-600 mb-4">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</p>

        {/* Course list */}
        {filtered.length === 0 ? (
          <p className="text-gray-500 text-sm">No courses found.</p>
        ) : viewMode === 'list' ? (
          <div>
            <h2 className="text-base font-normal text-gray-700 mb-3">Others</h2>
            <div className="space-y-2">
              {filtered.map(course => (
                <div key={course.id} className="bg-white border border-gray-200 rounded overflow-hidden">
                  <div className="flex items-start">
                    {/* Color bar */}
                    <div className="w-1.5 self-stretch shrink-0" style={{ backgroundColor: course.color }} />

                    {/* Content */}
                    <div className="flex-1 px-5 py-4">
                      <p className="text-xs text-gray-500 mb-1">{course.code}</p>
                      <p className="font-bold text-gray-800 text-sm mb-1">{course.name}</p>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <span>{course.status}</span>
                        <span className="text-gray-400">|</span>
                        <span className="text-blue-600 hover:underline cursor-pointer">{course.instructors}</span>
                        <span className="text-gray-400">|</span>
                        <button
                          onClick={() => toggleExpand(course.id)}
                          className="text-blue-600 hover:underline flex items-center gap-1"
                        >
                          More info
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                            className={`transition-transform ${expanded.has(course.id) ? 'rotate-180' : ''}`}>
                            <polyline points="6 9 12 15 18 9"/>
                          </svg>
                        </button>
                      </div>
                      {expanded.has(course.id) && (
                        <p className="mt-3 text-xs text-gray-500 border-t border-gray-100 pt-3">{course.moreInfo}</p>
                      )}
                    </div>

                    {/* Star */}
                    <button onClick={() => toggleStar(course.id)} className="px-4 py-4 text-gray-400 hover:text-yellow-400 transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill={starred.has(course.id) ? '#facc15' : 'none'} stroke={starred.has(course.id) ? '#facc15' : 'currentColor'} strokeWidth="1.5">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Grid view */
          <div>
            <h2 className="text-base font-normal text-gray-700 mb-3">Others</h2>
            <div className="grid grid-cols-3 gap-4">
              {filtered.map(course => (
                <div key={course.id} className="bg-white border border-gray-200 rounded overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-2" style={{ backgroundColor: course.color }} />
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-xs text-gray-500">{course.code}</p>
                      <button onClick={() => toggleStar(course.id)} className="text-gray-400 hover:text-yellow-400 transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill={starred.has(course.id) ? '#facc15' : 'none'} stroke={starred.has(course.id) ? '#facc15' : 'currentColor'} strokeWidth="1.5">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                      </button>
                    </div>
                    <p className="font-bold text-gray-800 text-sm mb-3">{course.name}</p>
                    <span className="inline-block px-2 py-0.5 text-xs rounded-full text-white" style={{ backgroundColor: course.color }}>{course.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Help button */}
      <div className="fixed bottom-6 right-6">
        <button className="w-9 h-9 rounded-full border-2 border-gray-400 flex items-center justify-center text-gray-500 hover:border-gray-600 text-sm font-semibold">?</button>
      </div>

    </div>
  )
}
