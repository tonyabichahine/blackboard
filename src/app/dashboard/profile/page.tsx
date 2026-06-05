'use client'

import { useState } from 'react'

type Drawer = 'language' | 'privacy' | null

export default function ProfilePage() {
  const [drawer, setDrawer] = useState<Drawer>(null)
  const [language, setLanguage] = useState('system-default')
  const [privacy, setPrivacy] = useState('only-instructors')
  const [tempLanguage, setTempLanguage] = useState(language)
  const [tempPrivacy, setTempPrivacy] = useState(privacy)

  function openDrawer(d: Drawer) {
    setTempLanguage(language)
    setTempPrivacy(privacy)
    setDrawer(d)
  }

  function saveDrawer() {
    if (drawer === 'language') setLanguage(tempLanguage)
    if (drawer === 'privacy') setPrivacy(tempPrivacy)
    setDrawer(null)
  }

  const languageLabel = language === 'system-default'
    ? 'System Default (English (United States))'
    : 'English (United States)'

  const privacyLabel = privacy === 'only-instructors'
    ? 'Only instructors can view my profile information'
    : privacy === 'anyone-courses'
    ? 'Anyone in my courses can view my profile information'
    : 'Anyone on the platform can view my profile information'

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Overlay */}
      {drawer && (
        <div
          className="fixed inset-0 bg-black/40 z-20"
          onClick={() => setDrawer(null)}
        />
      )}

      {/* Language Settings Drawer */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-30 flex flex-col transition-transform duration-300 ${drawer === 'language' ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Purple X button */}
        <button
          onClick={() => setDrawer(null)}
          className="absolute -left-10 top-10 w-10 h-10 flex items-center justify-center text-white font-bold text-lg z-40"
          style={{ backgroundColor: '#a855f7' }}
        >
          ✕
        </button>
        <div className="px-6 pt-6 pb-4 border-b border-gray-200">
          <p className="text-xs text-gray-500 mb-1">Profile Settings</p>
          <h2 className="text-2xl font-light text-gray-800">Language Settings</h2>
        </div>
        <div className="flex-1 px-6 py-5 overflow-y-auto">
          <p className="text-sm text-gray-600 mb-5">Select the language you want to use throughout the system</p>
          <p className="text-sm font-bold text-gray-800 mb-2">Default Language</p>
          <select
            value={tempLanguage}
            onChange={e => setTempLanguage(e.target.value)}
            className="w-full border border-blue-500 rounded px-3 py-2 text-sm focus:outline-none"
          >
            <option value="system-default">System Default (English (United States))</option>
            <option value="english-us">English (United States)</option>
          </select>
        </div>
        <div className="flex border-t border-gray-200">
          <button onClick={() => setDrawer(null)} className="flex-1 py-4 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">
            Cancel
          </button>
          <button onClick={saveDrawer} className="flex-1 py-4 text-sm text-white bg-gray-900 hover:bg-black transition-colors">
            Save
          </button>
        </div>
      </div>

      {/* Privacy Settings Drawer */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-30 flex flex-col transition-transform duration-300 ${drawer === 'privacy' ? 'translate-x-0' : 'translate-x-full'}`}>
        <button
          onClick={() => setDrawer(null)}
          className="absolute -left-10 top-10 w-10 h-10 flex items-center justify-center text-white font-bold text-lg z-40"
          style={{ backgroundColor: '#a855f7' }}
        >
          ✕
        </button>
        <div className="px-6 pt-6 pb-4 border-b border-gray-200">
          <p className="text-xs text-gray-500 mb-1">Profile Settings</p>
          <h2 className="text-2xl font-light text-gray-800">Privacy Settings</h2>
        </div>
        <div className="flex-1 px-6 py-5 overflow-y-auto">
          <p className="text-sm font-bold text-gray-800 mb-4">Select who can view your profile information</p>
          <div className="space-y-3 mb-6">
            {[
              { value: 'only-instructors', label: 'Only instructors' },
              { value: 'anyone-courses', label: 'Anyone in my courses' },
              { value: 'anyone-platform', label: 'Anyone on the platform' },
            ].map(opt => (
              <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setTempPrivacy(opt.value)}
                  className="w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer shrink-0"
                  style={{
                    borderColor: tempPrivacy === opt.value ? '#22c55e' : '#9ca3af',
                    backgroundColor: tempPrivacy === opt.value ? '#22c55e' : 'white',
                  }}
                >
                  {tempPrivacy === opt.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <span className="text-sm text-gray-700">{opt.label}</span>
              </label>
            ))}
          </div>
          <p className="text-xs text-gray-500 mb-2">
            Some profile information will display to other members of your courses and organizations to facilitate communication and interaction
          </p>
          <ul className="text-xs text-gray-500 list-disc list-inside">
            <li>Names</li>
          </ul>
        </div>
        <div className="flex border-t border-gray-200">
          <button onClick={() => setDrawer(null)} className="flex-1 py-4 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">
            Cancel
          </button>
          <button onClick={saveDrawer} className="flex-1 py-4 text-sm text-white bg-gray-900 hover:bg-black transition-colors">
            Save
          </button>
        </div>
      </div>

      {/* Blurred banner */}
      <div className="relative h-40 overflow-hidden" style={{
        background: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 20%, #6b7280 40%, #4ade80 60%, #a3a3a3 80%, #d1d5db 100%)',
      }}>
        <div className="absolute inset-0" style={{ filter: 'blur(12px)', transform: 'scale(1.1)', background: 'inherit' }} />
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-24 h-24 rounded-full bg-gray-200 border-4 border-white z-10" />
      </div>

      {/* Name */}
      <div className="text-center pt-16 pb-6 bg-white border-b border-gray-200">
        <h1 className="text-2xl font-light tracking-widest text-gray-800 uppercase">PAMELA KOBROSLY</h1>
        <p className="text-gray-500 text-sm mt-1">pckobrosly</p>
      </div>

      {/* Two-column content */}
      <div className="flex gap-6 px-8 py-6 items-start">

        {/* Left column */}
        <div className="flex-1 space-y-6">
          <Section title="Basic Information">
            <Row label="Full Name"><span className="underline text-gray-800">PAMELA KOBROSLY</span></Row>
            <Row label="Email Address"><span className="text-gray-700">pckobrosly@ndu.edu.lb</span></Row>
            <Row label="Student ID"><span className="text-gray-700">20257045</span></Row>
            <Row label="Password" last><BlueLink>Change password</BlueLink></Row>
          </Section>

          <Section title="Additional Information">
            <Row label="Gender"><BlueLink>Add gender</BlueLink></Row>
            <Row label="Additional Name"><span className="text-gray-700">#N/A</span></Row>
            <Row label="Birthday"><BlueLink>Add birthday</BlueLink></Row>
            <Row label="Education Level"><BlueLink>Add education level</BlueLink></Row>
            <Row label="Website" last><BlueLink>Add website</BlueLink></Row>
          </Section>

          <Section title="Contact Information">
            <Row label="Mailing Address">
              <div className="flex flex-col gap-0.5">
                <BlueLink>Zouk Mosbeh Main Road</BlueLink>
                <BlueLink>Kesrwan</BlueLink>
                <BlueLink>72 Zouk Mikael</BlueLink>
                <BlueLink>LEBANON</BlueLink>
              </div>
            </Row>
            <Row label="Phone Number"><BlueLink>0921895012 (Work)</BlueLink></Row>
            <Row label="Business Fax Number" last><BlueLink>00-961-9-218771</BlueLink></Row>
          </Section>

          <Section title="Job Information">
            <Row label="Company"><BlueLink>Notre Dame University</BlueLink></Row>
            <Row label="Job Title"><BlueLink>Add job title</BlueLink></Row>
            <Row label="Department" last><BlueLink>Add department</BlueLink></Row>
          </Section>
        </div>

        {/* Right column — System Settings */}
        <div className="w-96 shrink-0">
          <Section title="System Settings">
            {/* Language row with edit icon */}
            <div className="flex items-start px-5 py-4 border-b border-gray-200">
              <span className="w-52 shrink-0 font-semibold text-gray-700 text-sm">Language</span>
              <div className="flex-1 flex items-start justify-between gap-2">
                <button onClick={() => openDrawer('language')} className="text-sm text-blue-600 hover:underline text-left">
                  {languageLabel}
                </button>
                <button onClick={() => openDrawer('language')} className="text-gray-400 hover:text-gray-600 shrink-0 mt-0.5">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Privacy Settings row */}
            <div className="flex items-start px-5 py-4 border-b border-gray-200">
              <span className="w-52 shrink-0 font-semibold text-gray-700 text-sm">Privacy Settings</span>
              <button onClick={() => openDrawer('privacy')} className="text-sm text-blue-600 hover:underline text-left">
                {privacyLabel}
              </button>
            </div>

            {/* Global Notification Settings */}
            <div className="flex items-start px-5 py-4">
              <span className="w-52 shrink-0 font-semibold text-gray-700 text-sm">Global Notification Settings</span>
              <div className="flex flex-col gap-1 text-sm">
                <BlueLink>Stream notifications</BlueLink>
                <BlueLink>Email notifications</BlueLink>
                <BlueLink>Push notifications</BlueLink>
              </div>
            </div>
          </Section>
        </div>

      </div>

      {/* Help button */}
      <div className="fixed bottom-6 right-6 z-10">
        <button className="w-9 h-9 rounded-full border-2 border-gray-400 flex items-center justify-center text-gray-500 hover:border-gray-600 text-sm font-semibold">
          ?
        </button>
      </div>

    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg font-normal text-gray-700 mb-3">{title}</h2>
      <div className="bg-white border border-gray-200 rounded divide-y divide-gray-200">{children}</div>
    </div>
  )
}

function Row({ label, children, last }: { label: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div className="flex items-start px-5 py-4">
      <span className="w-52 shrink-0 font-semibold text-gray-700 text-sm">{label}</span>
      <div className="text-sm">{children}</div>
    </div>
  )
}

function BlueLink({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <span onClick={onClick} className="text-blue-600 hover:underline cursor-pointer">{children}</span>
  )
}
