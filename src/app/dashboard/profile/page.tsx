'use client'

import { useState } from 'react'

type DrawerKey = 'language' | 'privacy' | 'gender' | 'additionalName' | 'birthday' |
  'educationLevel' | 'website' | 'mailingAddress' | 'phone' | 'fax' |
  'company' | 'jobTitle' | 'department' | null

interface ProfileData {
  gender: string
  additionalName: string
  birthday: { month: string; day: string; year: string }
  educationLevel: string
  website: string
  addressLine1: string
  addressLine2: string
  addressLine3: string
  addressCountry: string
  phone: string
  fax: string
  company: string
  jobTitle: string
  department: string
  language: string
  privacy: string
}

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const YEARS = Array.from({ length: 80 }, (_, i) => String(new Date().getFullYear() - i))

export default function ProfilePage() {
  const [drawer, setDrawer] = useState<DrawerKey>(null)
  const [data, setData] = useState<ProfileData>({
    gender: '',
    additionalName: '#N/A',
    birthday: { month: '', day: '', year: '' },
    educationLevel: '',
    website: '',
    addressLine1: 'Zouk Mosbeh Main Road',
    addressLine2: 'Kesrwan',
    addressLine3: '72 Zouk Mikael',
    addressCountry: 'LEBANON',
    phone: '0921895012',
    fax: '00-961-9-218771',
    company: 'Notre Dame University',
    jobTitle: '',
    department: '',
    language: 'system-default',
    privacy: 'only-instructors',
  })
  const [temp, setTemp] = useState<ProfileData>(data)

  function open(d: DrawerKey) {
    setTemp({ ...data })
    setDrawer(d)
  }

  function save() {
    setData({ ...temp })
    setDrawer(null)
  }

  const birthdayDisplay = data.birthday.month && data.birthday.day && data.birthday.year
    ? `${data.birthday.month} ${data.birthday.day}, ${data.birthday.year}` : ''

  const tempBirthdayDisplay = temp.birthday.month && temp.birthday.day && temp.birthday.year
    ? `${temp.birthday.month} ${temp.birthday.day}, ${temp.birthday.year}` : ''

  const languageLabel = data.language === 'system-default'
    ? 'System Default (English (United States))' : 'English (United States)'

  const privacyLabel = data.privacy === 'only-instructors'
    ? 'Only instructors can view my profile information'
    : data.privacy === 'anyone-courses'
    ? 'Anyone in my courses can view my profile information'
    : 'Anyone on the platform can view my profile information'

  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden">

      {/* Overlay */}
      {drawer && <div className="fixed inset-0 bg-black/40 z-20" onClick={() => setDrawer(null)} />}

      {/* ── LANGUAGE DRAWER ── */}
      <Drawer open={drawer === 'language'} title="Language Settings" onClose={() => setDrawer(null)} onSave={save}>
        <p className="text-sm text-gray-600 mb-5">Select the language you want to use throughout the system</p>
        <Label>Default Language</Label>
        <select value={temp.language} onChange={e => setTemp(p => ({ ...p, language: e.target.value }))}
          className="w-full border border-blue-500 rounded px-3 py-2 text-sm focus:outline-none">
          <option value="system-default">System Default (English (United States))</option>
          <option value="english-us">English (United States)</option>
        </select>
      </Drawer>

      {/* ── PRIVACY DRAWER ── */}
      <Drawer open={drawer === 'privacy'} title="Privacy Settings" onClose={() => setDrawer(null)} onSave={save}>
        <p className="text-sm font-bold text-gray-800 mb-4">Select who can view your profile information</p>
        <div className="space-y-3 mb-5">
          {[
            { value: 'only-instructors', label: 'Only instructors' },
            { value: 'anyone-courses', label: 'Anyone in my courses' },
            { value: 'anyone-platform', label: 'Anyone on the platform' },
          ].map(opt => (
            <label key={opt.value} className="flex items-center gap-3 cursor-pointer" onClick={() => setTemp(p => ({ ...p, privacy: opt.value }))}>
              <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                style={{ borderColor: temp.privacy === opt.value ? '#22c55e' : '#9ca3af', backgroundColor: temp.privacy === opt.value ? '#22c55e' : 'white' }}>
                {temp.privacy === opt.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              <span className="text-sm text-gray-700">{opt.label}</span>
            </label>
          ))}
        </div>
        <p className="text-xs text-gray-500 mb-1">Some profile information will display to other members of your courses and organizations to facilitate communication and interaction</p>
        <ul className="text-xs text-gray-500 list-disc list-inside"><li>Names</li></ul>
      </Drawer>

      {/* ── GENDER DRAWER ── */}
      <Drawer open={drawer === 'gender'} title="Gender" onClose={() => setDrawer(null)} onSave={save}>
        <Label>Gender</Label>
        <select value={temp.gender} onChange={e => setTemp(p => ({ ...p, gender: e.target.value }))}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
          <option value="">Not specified</option>
          <option value="Man">Man</option>
          <option value="Woman">Woman</option>
          <option value="Non-binary">Non-binary</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>
      </Drawer>

      {/* ── ADDITIONAL NAME DRAWER ── */}
      <Drawer open={drawer === 'additionalName'} title="Additional Name" onClose={() => setDrawer(null)} onSave={save}>
        <Label>Additional Name</Label>
        <input type="text" value={temp.additionalName === '#N/A' ? '' : temp.additionalName}
          placeholder="Enter additional name"
          onChange={e => setTemp(p => ({ ...p, additionalName: e.target.value || '#N/A' }))}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
      </Drawer>

      {/* ── BIRTHDAY DRAWER ── */}
      <Drawer open={drawer === 'birthday'} title="Birthday" onClose={() => setDrawer(null)} onSave={save}>
        <p className="text-sm text-gray-600 mb-4">Select your date of birth</p>
        <div className="space-y-3">
          <div>
            <Label>Month</Label>
            <select value={temp.birthday.month} onChange={e => setTemp(p => ({ ...p, birthday: { ...p.birthday, month: e.target.value } }))}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
              <option value="">Select month</option>
              {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <Label>Day</Label>
            <select value={temp.birthday.day} onChange={e => setTemp(p => ({ ...p, birthday: { ...p.birthday, day: e.target.value } }))}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
              <option value="">Select day</option>
              {Array.from({ length: 31 }, (_, i) => String(i + 1)).map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <Label>Year</Label>
            <select value={temp.birthday.year} onChange={e => setTemp(p => ({ ...p, birthday: { ...p.birthday, year: e.target.value } }))}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
              <option value="">Select year</option>
              {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>
        {tempBirthdayDisplay && <p className="mt-4 text-sm text-gray-600">Selected: <strong>{tempBirthdayDisplay}</strong></p>}
      </Drawer>

      {/* ── EDUCATION LEVEL DRAWER ── */}
      <Drawer open={drawer === 'educationLevel'} title="Education Level" onClose={() => setDrawer(null)} onSave={save}>
        <Label>Education Level</Label>
        <select value={temp.educationLevel} onChange={e => setTemp(p => ({ ...p, educationLevel: e.target.value }))}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
          <option value="">Select education level</option>
          <option value="High School Diploma">High School Diploma</option>
          <option value="Associate's Degree">Associate&apos;s Degree</option>
          <option value="Bachelor's Degree">Bachelor&apos;s Degree</option>
          <option value="Master's Degree">Master&apos;s Degree</option>
          <option value="Doctoral Degree">Doctoral Degree</option>
          <option value="Professional Degree">Professional Degree</option>
          <option value="Other">Other</option>
        </select>
      </Drawer>

      {/* ── WEBSITE DRAWER ── */}
      <Drawer open={drawer === 'website'} title="Website" onClose={() => setDrawer(null)} onSave={save}>
        <Label>Website URL</Label>
        <input type="url" value={temp.website} placeholder="https://example.com"
          onChange={e => setTemp(p => ({ ...p, website: e.target.value }))}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
      </Drawer>

      {/* ── MAILING ADDRESS DRAWER ── */}
      <Drawer open={drawer === 'mailingAddress'} title="Mailing Address" onClose={() => setDrawer(null)} onSave={save}>
        {[
          { key: 'addressLine1', label: 'Street Address' },
          { key: 'addressLine2', label: 'City / Region' },
          { key: 'addressLine3', label: 'Address Line 3' },
          { key: 'addressCountry', label: 'Country' },
        ].map(({ key, label }) => (
          <div key={key} className="mb-3">
            <Label>{label}</Label>
            <input type="text" value={temp[key as keyof ProfileData] as string}
              onChange={e => setTemp(p => ({ ...p, [key]: e.target.value }))}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
          </div>
        ))}
      </Drawer>

      {/* ── PHONE DRAWER ── */}
      <Drawer open={drawer === 'phone'} title="Phone Number" onClose={() => setDrawer(null)} onSave={save}>
        <Label>Phone Number (Work)</Label>
        <input type="tel" value={temp.phone} onChange={e => setTemp(p => ({ ...p, phone: e.target.value }))}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
      </Drawer>

      {/* ── FAX DRAWER ── */}
      <Drawer open={drawer === 'fax'} title="Business Fax Number" onClose={() => setDrawer(null)} onSave={save}>
        <Label>Fax Number</Label>
        <input type="tel" value={temp.fax} onChange={e => setTemp(p => ({ ...p, fax: e.target.value }))}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
      </Drawer>

      {/* ── COMPANY DRAWER ── */}
      <Drawer open={drawer === 'company'} title="Company" onClose={() => setDrawer(null)} onSave={save}>
        <Label>Company / University</Label>
        <input type="text" value={temp.company} onChange={e => setTemp(p => ({ ...p, company: e.target.value }))}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
      </Drawer>

      {/* ── JOB TITLE DRAWER ── */}
      <Drawer open={drawer === 'jobTitle'} title="Job Title" onClose={() => setDrawer(null)} onSave={save}>
        <Label>Job Title</Label>
        <input type="text" value={temp.jobTitle} placeholder="Enter job title"
          onChange={e => setTemp(p => ({ ...p, jobTitle: e.target.value }))}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
      </Drawer>

      {/* ── DEPARTMENT DRAWER ── */}
      <Drawer open={drawer === 'department'} title="Department" onClose={() => setDrawer(null)} onSave={save}>
        <Label>Department</Label>
        <input type="text" value={temp.department} placeholder="Enter department"
          onChange={e => setTemp(p => ({ ...p, department: e.target.value }))}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
      </Drawer>

      {/* ── PAGE CONTENT ── */}

      {/* Blurred banner */}
      <div className="relative h-40 overflow-hidden" style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 20%, #6b7280 40%, #4ade80 60%, #a3a3a3 80%, #d1d5db 100%)' }}>
        <div className="absolute inset-0" style={{ filter: 'blur(12px)', transform: 'scale(1.1)', background: 'inherit' }} />
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-24 h-24 rounded-full bg-gray-200 border-4 border-white z-10" />
      </div>

      <div className="text-center pt-16 pb-6 bg-white border-b border-gray-200">
        <h1 className="text-2xl font-light tracking-widest text-gray-800 uppercase">PAMELA KOBROSLY</h1>
        <p className="text-gray-500 text-sm mt-1">pckobrosly</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 px-4 md:px-8 py-6 items-start">

        {/* Left column */}
        <div className="w-full md:flex-1 space-y-6">

          <Section title="Basic Information">
            <Row label="Full Name"><span className="underline text-gray-800 text-sm">PAMELA KOBROSLY</span></Row>
            <Row label="Email Address"><span className="text-gray-700 text-sm">pckobrosly@ndu.edu.lb</span></Row>
            <Row label="Student ID"><span className="text-gray-700 text-sm">20257045</span></Row>
            <Row label="Password" last><BlueLink>Change password</BlueLink></Row>
          </Section>

          <Section title="Additional Information">
            <Row label="Gender">
              {data.gender ? <BlueLink onClick={() => open('gender')}>{data.gender}</BlueLink> : <BlueLink onClick={() => open('gender')}>Add gender</BlueLink>}
            </Row>
            <Row label="Additional Name">
              <BlueLink onClick={() => open('additionalName')}>{data.additionalName}</BlueLink>
            </Row>
            <Row label="Birthday">
              {birthdayDisplay ? <BlueLink onClick={() => open('birthday')}>{birthdayDisplay}</BlueLink> : <BlueLink onClick={() => open('birthday')}>Add birthday</BlueLink>}
            </Row>
            <Row label="Education Level">
              {data.educationLevel ? <BlueLink onClick={() => open('educationLevel')}>{data.educationLevel}</BlueLink> : <BlueLink onClick={() => open('educationLevel')}>Add education level</BlueLink>}
            </Row>
            <Row label="Website" last>
              {data.website ? <BlueLink onClick={() => open('website')}>{data.website}</BlueLink> : <BlueLink onClick={() => open('website')}>Add website</BlueLink>}
            </Row>
          </Section>

          <Section title="Contact Information">
            <Row label="Mailing Address">
              <div className="flex flex-col gap-0.5">
                {[data.addressLine1, data.addressLine2, data.addressLine3, data.addressCountry].map((line, i) => (
                  line ? <BlueLink key={i} onClick={() => open('mailingAddress')}>{line}</BlueLink> : null
                ))}
              </div>
            </Row>
            <Row label="Phone Number">
              <BlueLink onClick={() => open('phone')}>{data.phone} (Work)</BlueLink>
            </Row>
            <Row label="Business Fax Number" last>
              <BlueLink onClick={() => open('fax')}>{data.fax}</BlueLink>
            </Row>
          </Section>

          <Section title="Job Information">
            <Row label="Company">
              <BlueLink onClick={() => open('company')}>{data.company || 'Add company'}</BlueLink>
            </Row>
            <Row label="Job Title">
              {data.jobTitle ? <BlueLink onClick={() => open('jobTitle')}>{data.jobTitle}</BlueLink> : <BlueLink onClick={() => open('jobTitle')}>Add job title</BlueLink>}
            </Row>
            <Row label="Department" last>
              {data.department ? <BlueLink onClick={() => open('department')}>{data.department}</BlueLink> : <BlueLink onClick={() => open('department')}>Add department</BlueLink>}
            </Row>
          </Section>

        </div>

        {/* Right column */}
        <div className="w-full md:w-96 md:shrink-0">
          <Section title="System Settings">
            <div className="flex flex-col sm:flex-row sm:items-start px-5 py-4 border-b border-gray-200 gap-1">
              <span className="sm:w-44 sm:shrink-0 font-semibold text-gray-700 text-sm">Language</span>
              <div className="flex-1 flex items-start justify-between gap-2">
                <button onClick={() => open('language')} className="text-sm text-blue-600 hover:underline text-left">{languageLabel}</button>
                <button onClick={() => open('language')} className="text-gray-400 hover:text-gray-600 shrink-0 mt-0.5">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
                </button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start px-5 py-4 border-b border-gray-200 gap-1">
              <span className="sm:w-44 sm:shrink-0 font-semibold text-gray-700 text-sm">Privacy Settings</span>
              <button onClick={() => open('privacy')} className="text-sm text-blue-600 hover:underline text-left">{privacyLabel}</button>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start px-5 py-4 gap-1">
              <span className="sm:w-44 sm:shrink-0 font-semibold text-gray-700 text-sm">Global Notification Settings</span>
              <div className="flex flex-col gap-1 text-sm">
                <BlueLink>Stream notifications</BlueLink>
                <BlueLink>Email notifications</BlueLink>
                <BlueLink>Push notifications</BlueLink>
              </div>
            </div>
          </Section>
        </div>

      </div>

      <div className="fixed bottom-6 right-6 z-10">
        <button className="w-9 h-9 rounded-full border-2 border-gray-400 flex items-center justify-center text-gray-500 hover:border-gray-600 text-sm font-semibold">?</button>
      </div>

    </div>
  )
}

/* ── Shared components ── */

function Drawer({ open, title, onClose, onSave, children }: {
  open: boolean; title: string; onClose: () => void; onSave: () => void; children: React.ReactNode
}) {
  return (
    <div className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-30 flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
      {/* Close button — inside on mobile, outside on desktop */}
      <button onClick={onClose}
        className="absolute left-4 sm:-left-10 top-4 sm:top-10 w-10 h-10 flex items-center justify-center text-white font-bold text-lg z-40 rounded sm:rounded-none"
        style={{ backgroundColor: '#a855f7' }}>✕</button>
      <div className="px-6 pt-16 sm:pt-6 pb-4 border-b border-gray-200">
        <p className="text-xs text-gray-500 mb-1">Profile Settings</p>
        <h2 className="text-2xl font-light text-gray-800">{title}</h2>
      </div>
      <div className="flex-1 px-6 py-5 overflow-y-auto">{children}</div>
      <div className="flex border-t border-gray-200">
        <button onClick={onClose} className="flex-1 py-4 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">Cancel</button>
        <button onClick={onSave} className="flex-1 py-4 text-sm text-white bg-gray-900 hover:bg-black transition-colors">Save</button>
      </div>
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-bold text-gray-800 mb-2">{children}</p>
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
    <div className="flex flex-col sm:flex-row sm:items-start px-4 sm:px-5 py-3 sm:py-4 gap-1">
      <span className="sm:w-44 sm:shrink-0 font-semibold text-gray-700 text-sm">{label}</span>
      <div className="text-sm">{children}</div>
    </div>
  )
}

function BlueLink({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return <span onClick={onClick} className="text-blue-600 hover:underline cursor-pointer">{children}</span>
}
