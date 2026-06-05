'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'

interface SidebarProps {
  studentName: string
}

const navItems = [
  { label: 'Activity', href: '/dashboard', icon: ActivityIcon },
  { label: 'Courses', href: '/dashboard/courses', icon: CoursesIcon },
  { label: 'Calendar', href: '/dashboard/calendar', icon: CalendarIcon },
  { label: 'Messages', href: '/dashboard/messages', icon: MessagesIcon },
  { label: 'Grades', href: '/dashboard/grades', icon: GradesIcon },
  { label: 'Tools', href: '/dashboard/tools', icon: ToolsIcon },
]

export default function Sidebar({ studentName }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  async function handleSignOut() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/')
  }

  const isActive = (href: string) =>
    href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(href)

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="px-4 py-4 border-b border-gray-800 flex items-center justify-between">
        <BlackboardLogo />
        {/* Close button on mobile */}
        <button className="md:hidden text-gray-400" onClick={() => setMobileOpen(false)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      {/* Student name */}
      <Link href="/dashboard/profile" onClick={() => setMobileOpen(false)}
        className="flex items-center gap-3 px-4 py-4 border-b border-gray-800 hover:bg-gray-800 transition-colors"
        style={{
          borderLeft: pathname === '/dashboard/profile' ? '3px solid #c026d3' : '3px solid transparent',
          backgroundColor: pathname === '/dashboard/profile' ? '#2d2d2d' : 'transparent',
        }}>
        <PersonIcon />
        <span className="text-gray-300 text-sm truncate uppercase tracking-wide">{studentName}</span>
      </Link>

      {/* Nav items */}
      <nav className="flex-1 py-2">
        {navItems.map(({ label, href, icon: Icon }) => (
          <Link key={href} href={href} onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 px-5 py-3 text-sm transition-colors"
            style={{
              color: isActive(href) ? '#fff' : '#aaa',
              backgroundColor: isActive(href) ? '#2d2d2d' : 'transparent',
              borderLeft: isActive(href) ? '3px solid #c026d3' : '3px solid transparent',
            }}>
            <Icon active={isActive(href)} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-gray-800 pb-4">
        <button onClick={handleSignOut}
          className="flex items-center gap-3 px-5 py-4 text-sm text-gray-400 hover:text-white w-full transition-colors">
          <SignOutIcon />
          <span>Sign Out</span>
        </button>
        <p className="px-4 text-xs text-gray-600">Privacy • Terms • Accessibility</p>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile hamburger bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-20 flex items-center px-4 py-3 border-b border-gray-800" style={{ backgroundColor: '#1a1a1a' }}>
        <button onClick={() => setMobileOpen(true)} className="text-gray-300 shrink-0">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        <div className="flex-1 flex justify-center">
          <BlackboardLogo />
        </div>
        <div className="w-6 shrink-0" />
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-30" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile sidebar drawer */}
      <aside
        className={`md:hidden fixed top-0 left-0 h-full w-64 flex flex-col z-40 transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ backgroundColor: '#1a1a1a' }}>
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-52 min-h-screen flex-col fixed top-0 left-0 z-10" style={{ backgroundColor: '#1a1a1a' }}>
        {sidebarContent}
      </aside>
    </>
  )
}

/* ── Update dashboard layout to add top padding on mobile ── */

function BlackboardLogo() {
  return (
    <div className="flex items-center gap-1">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 2L20 11L11 20" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 11H19" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
      <span className="text-white font-semibold text-lg tracking-tight">Blackboard</span>
    </div>
  )
}

function PersonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  )
}

function ActivityIcon({ active }: { active: boolean }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={active ? '#fff' : '#888'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  )
}

function CoursesIcon({ active }: { active: boolean }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={active ? '#fff' : '#888'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
    </svg>
  )
}

function CalendarIcon({ active }: { active: boolean }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={active ? '#fff' : '#888'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  )
}

function MessagesIcon({ active }: { active: boolean }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={active ? '#fff' : '#888'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )
}

function GradesIcon({ active }: { active: boolean }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={active ? '#fff' : '#888'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  )
}

function ToolsIcon({ active }: { active: boolean }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={active ? '#fff' : '#888'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
    </svg>
  )
}

function SignOutIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  )
}
