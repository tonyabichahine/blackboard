'use client'

import { useState } from 'react'

const TODAY = new Date(2026, 5, 5) // June 5, 2026

const DAYS_SHORT = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const DAYS_LONG = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const HOURS = ['12 AM','1 AM','2 AM','3 AM','4 AM','5 AM','6 AM','7 AM','8 AM','9 AM','10 AM','11 AM','12 PM','1 PM','2 PM','3 PM','4 PM','5 PM','6 PM','7 PM','8 PM','9 PM','10 PM','11 PM']

const CALENDARS = [
  { id: 'personal', label: 'My Personal Calendar' },
  { id: 'eng105', label: 'SP26-ENG105-A-NLC: SP26-ENGLISH 105 - A-NLC' },
  { id: 'idp', label: 'SP26-IDP222-223-226: SP26-IDP 222-223-226' },
  { id: 'arb238', label: 'SP26-ARB238-NLC: SP26-ARB 238' },
  { id: 'institution', label: 'Institution' },
]

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function getWeekStart(date: Date) {
  const d = new Date(date)
  d.setDate(d.getDate() - d.getDay())
  return d
}

export default function CalendarPage() {
  const [viewMode, setViewMode] = useState<'day' | 'month'>('day')
  const [displayMode, setDisplayMode] = useState<'schedule' | 'due-dates'>('schedule')
  const [selectedDate, setSelectedDate] = useState(new Date(TODAY))
  const [currentMonth, setCurrentMonth] = useState(new Date(TODAY.getFullYear(), TODAY.getMonth(), 1))
  const [weekStart, setWeekStart] = useState(getWeekStart(TODAY))
  const [showSettings, setShowSettings] = useState(false)
  const [checked, setChecked] = useState<Record<string, boolean>>(
    Object.fromEntries(CALENDARS.map(c => [c.id, true]))
  )

  /* ── Week navigation ── */
  function prevWeek() {
    const d = new Date(weekStart)
    d.setDate(d.getDate() - 7)
    setWeekStart(d)
  }
  function nextWeek() {
    const d = new Date(weekStart)
    d.setDate(d.getDate() + 7)
    setWeekStart(d)
  }

  /* ── Month navigation ── */
  function prevMonth() { setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)) }
  function nextMonth() { setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)) }

  /* ── Month grid ── */
  function getMonthDays() {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const daysInPrevMonth = new Date(year, month, 0).getDate()
    const cells: { date: Date; inMonth: boolean }[] = []

    for (let i = firstDay - 1; i >= 0; i--)
      cells.push({ date: new Date(year, month - 1, daysInPrevMonth - i), inMonth: false })
    for (let d = 1; d <= daysInMonth; d++)
      cells.push({ date: new Date(year, month, d), inMonth: true })
    while (cells.length % 7 !== 0)
      cells.push({ date: new Date(year, month + 1, cells.length - daysInMonth - firstDay + 1), inMonth: false })

    return cells
  }

  const monthLabel = `${MONTHS[currentMonth.getMonth()].slice(0,3)} ${currentMonth.getFullYear()}`
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart)
    d.setDate(d.getDate() + i)
    return d
  })

  function toggleAll(val: boolean) {
    setChecked(Object.fromEntries(CALENDARS.map(c => [c.id, val])))
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Settings overlay */}
      {showSettings && <div className="fixed inset-0 bg-black/40 z-20" onClick={() => setShowSettings(false)} />}

      {/* Settings Drawer */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-30 flex flex-col transition-transform duration-300 ${showSettings ? 'translate-x-0' : 'translate-x-full'}`}>
        <button onClick={() => setShowSettings(false)}
          className="absolute -left-10 top-10 w-10 h-10 flex items-center justify-center text-white font-bold text-lg z-40"
          style={{ backgroundColor: '#a855f7' }}>✕</button>
        <div className="px-6 pt-6 pb-4 border-b border-gray-200 flex items-start justify-between">
          <h2 className="text-2xl font-light text-gray-800">Calendar Settings</h2>
          <button className="text-gray-400 hover:text-gray-600 mt-1">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
          </button>
        </div>
        <div className="flex-1 px-6 py-5 overflow-y-auto">
          <p className="text-sm text-gray-600 mb-4">Select the calendars you want to display:</p>
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
            <p className="text-sm font-bold text-gray-800">Calendars</p>
          </div>
          <div className="flex gap-2 mb-4 text-sm">
            <button onClick={() => toggleAll(false)} className="text-blue-600 hover:underline">Clear All</button>
            <span className="text-gray-400">|</span>
            <button onClick={() => toggleAll(true)} className="text-blue-600 hover:underline">Select All</button>
          </div>
          <div className="divide-y divide-gray-200">
            {CALENDARS.map(cal => (
              <label key={cal.id} className="flex items-start gap-3 py-3 cursor-pointer">
                <div
                  onClick={() => setChecked(p => ({ ...p, [cal.id]: !p[cal.id] }))}
                  className="mt-0.5 w-4 h-4 rounded flex items-center justify-center shrink-0 border"
                  style={{ backgroundColor: checked[cal.id] ? '#22c55e' : 'white', borderColor: checked[cal.id] ? '#22c55e' : '#d1d5db' }}>
                  {checked[cal.id] && (
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  )}
                </div>
                <span className="text-sm text-gray-700">{cal.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-gray-200 bg-white">
        <h1 className="text-3xl font-light text-gray-800">Calendar</h1>
        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-gray-700">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
          </button>
          <button onClick={() => setShowSettings(true)} className="text-gray-500 hover:text-gray-700">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center px-8 py-4 bg-white border-b border-gray-100">
        {/* Schedule / Due Dates */}
        <div className="flex rounded overflow-hidden border border-gray-300">
          <button onClick={() => setDisplayMode('schedule')}
            className={`px-4 py-2 text-sm font-medium ${displayMode === 'schedule' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
            Schedule
          </button>
          <button onClick={() => setDisplayMode('due-dates')}
            className={`px-4 py-2 text-sm font-medium border-l border-gray-300 ${displayMode === 'due-dates' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
            Due Dates
          </button>
        </div>

        {/* Month title */}
        <div className="flex-1 flex items-center justify-center gap-4">
          {viewMode === 'month' && (
            <button onClick={prevMonth} className="text-gray-400 hover:text-gray-700">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
          )}
          <span className="text-xl font-light text-gray-800">{monthLabel}</span>
          {viewMode === 'month' && (
            <button onClick={nextMonth} className="text-gray-400 hover:text-gray-700">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          )}
        </div>

        {/* Day / Month toggle */}
        <div className="flex rounded overflow-hidden border border-gray-300">
          <button onClick={() => setViewMode('day')}
            className={`px-4 py-2 text-sm font-medium ${viewMode === 'day' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
            Day
          </button>
          <button onClick={() => setViewMode('month')}
            className={`px-4 py-2 text-sm font-medium border-l border-gray-300 ${viewMode === 'month' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
            Month
          </button>
        </div>
      </div>

      {/* ── DAY VIEW ── */}
      {viewMode === 'day' && (
        <div className="flex-1 flex flex-col">
          {/* Week strip */}
          <div className="flex items-center px-8 py-4 bg-white border-b border-gray-200">
            <button onClick={prevWeek} className="text-gray-400 hover:text-gray-700 p-1">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <div className="flex-1 grid grid-cols-7 text-center">
              {DAYS_SHORT.map((d, i) => (
                <div key={i} className="text-xs text-gray-400 mb-1">{d}</div>
              ))}
              {weekDays.map((day, i) => {
                const isToday = isSameDay(day, TODAY)
                const isSelected = isSameDay(day, selectedDate)
                const isOtherMonth = day.getMonth() !== currentMonth.getMonth()
                return (
                  <button key={i} onClick={() => { setSelectedDate(new Date(day)); setCurrentMonth(new Date(day.getFullYear(), day.getMonth(), 1)) }}
                    className={`mx-auto w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-colors
                      ${isSelected ? 'text-white' : isOtherMonth ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-100'}
                    `}
                    style={isSelected ? { backgroundColor: '#7c3aed' } : {}}>
                    {day.getDate()}
                  </button>
                )
              })}
            </div>
            <button onClick={nextWeek} className="text-gray-400 hover:text-gray-700 p-1">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>

          {/* Selected date label */}
          <div className="px-8 py-3 bg-white border-b border-gray-100">
            <p className="text-sm text-gray-600">
              {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          {/* Time slots */}
          <div className="flex-1 overflow-y-auto">
            {HOURS.map((hour, i) => (
              <div key={i} className="flex border-b border-gray-100" style={{ minHeight: '60px' }}>
                <div className="w-20 px-4 pt-2 text-xs text-gray-400 text-right shrink-0">{hour}</div>
                <div className="flex-1 border-l border-gray-100" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── MONTH VIEW ── */}
      {viewMode === 'month' && (
        <div className="flex-1 flex flex-col px-0">
          {/* Day headers */}
          <div className="grid grid-cols-7 border-b border-gray-200 bg-white">
            {DAYS_LONG.map(d => (
              <div key={d} className="text-center py-3 text-sm font-medium text-gray-500">{d}</div>
            ))}
          </div>
          {/* Calendar grid */}
          <div className="flex-1 grid grid-cols-7" style={{ gridAutoRows: '120px' }}>
            {getMonthDays().map((cell, i) => {
              const isToday = isSameDay(cell.date, TODAY)
              const isSelected = isSameDay(cell.date, selectedDate)
              return (
                <div key={i}
                  onClick={() => { setSelectedDate(new Date(cell.date)); if (!cell.inMonth) setCurrentMonth(new Date(cell.date.getFullYear(), cell.date.getMonth(), 1)) }}
                  className={`border-b border-r border-gray-200 p-2 cursor-pointer hover:bg-gray-50 transition-colors ${!cell.inMonth ? 'bg-gray-50' : 'bg-white'}`}>
                  <div className="flex justify-end">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-sm
                        ${isToday || isSelected ? 'text-white font-semibold' : !cell.inMonth ? 'text-gray-400' : 'text-gray-700'}
                      `}
                      style={(isToday || isSelected) ? { backgroundColor: '#7c3aed' } : {}}>
                      {cell.date.getDate()}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Help button */}
      <div className="fixed bottom-6 right-6 z-10">
        <button className="w-9 h-9 rounded-full border-2 border-gray-400 flex items-center justify-center text-gray-500 hover:border-gray-600 text-sm font-semibold">?</button>
      </div>
    </div>
  )
}
