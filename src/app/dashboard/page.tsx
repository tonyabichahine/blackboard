'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface ActivityItem {
  id: string
  course_code: string
  course_name: string
  activity_type: string
  description: string
  grade_value: string | null
  created_at: string
}

export default function ActivityPage() {
  const [items, setItems] = useState<ActivityItem[]>([])
  const [filter, setFilter] = useState('all')
  const router = useRouter()

  useEffect(() => {
    fetch('/api/activity')
      .then(r => r.json())
      .then(data => Array.isArray(data) && setItems(data))
  }, [])

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between">
        <h1 className="text-3xl font-light text-gray-800">Activity Stream</h1>
        <button className="text-gray-500 hover:text-gray-700">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </button>
      </div>

      <div className="px-8 py-6">
        {/* Filter */}
        <div className="mb-8">
          <div className="relative inline-block">
            <label className="absolute -top-2.5 left-3 bg-gray-100 px-1 text-xs text-gray-500">Filter</label>
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="border border-gray-400 rounded px-4 py-2.5 pr-10 text-sm text-gray-700 bg-gray-100 appearance-none focus:outline-none min-w-[180px]"
            >
              <option value="all">Show All</option>
              <option value="grade_posted">Grades Only</option>
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Timeline */}
        {items.length === 0 ? (
          <p className="text-gray-500 text-sm">No activity yet.</p>
        ) : (
          <div className="relative">
            {/* Section label */}
            <div className="flex items-center gap-4 mb-6 ml-36">
              <div className="w-3 h-3 rounded-full border-2 border-gray-400 bg-gray-100" />
              <span className="text-2xl font-light text-gray-500">Recent</span>
            </div>

            {/* Vertical line */}
            <div className="absolute left-[148px] top-10 bottom-0 w-px bg-gray-300" />

            {/* Items */}
            <div className="space-y-6">
              {items.map(item => (
                <div key={item.id} className="flex items-start gap-4">
                  {/* Date */}
                  <div className="w-32 text-right">
                    <span className="text-sm italic text-gray-400">{formatDate(item.created_at)}</span>
                  </div>

                  {/* Timeline dot */}
                  <div className="flex-shrink-0 w-4 flex justify-center pt-3">
                    <div className="w-2 h-2 rounded-full bg-gray-400 z-10 relative" />
                  </div>

                  {/* Document icon */}
                  <div className="flex-shrink-0 w-10 h-10 border border-gray-300 rounded flex items-center justify-center bg-white">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.5">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                      <polyline points="10 9 9 9 8 9"/>
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-white rounded p-0">
                    <p className="font-semibold text-gray-800 text-sm">{item.course_name}</p>
                    <p className="text-gray-500 text-sm mb-2">Grade posted: {item.description}</p>
                    <button
                      onClick={() => router.push('/dashboard/grades')}
                      className="px-3 py-1.5 text-xs text-gray-600 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                    >
                      View my grade
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Help button */}
      <div className="fixed bottom-6 right-6">
        <button className="w-9 h-9 rounded-full border-2 border-gray-400 flex items-center justify-center text-gray-500 hover:border-gray-600 text-sm font-semibold">
          ?
        </button>
      </div>
    </div>
  )
}
