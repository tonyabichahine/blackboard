export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Blurred banner */}
      <div className="relative h-40 overflow-hidden" style={{
        background: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 20%, #6b7280 40%, #4ade80 60%, #a3a3a3 80%, #d1d5db 100%)',
        filter: 'blur(0px)',
      }}>
        <div className="absolute inset-0" style={{ backdropFilter: 'blur(8px)', background: 'inherit', filter: 'blur(12px)', transform: 'scale(1.1)' }} />
        {/* Avatar circle */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-24 h-24 rounded-full bg-gray-200 border-4 border-white z-10" />
      </div>

      {/* Name section */}
      <div className="text-center pt-16 pb-6 bg-white border-b border-gray-200">
        <h1 className="text-2xl font-light tracking-widest text-gray-800 uppercase">PAMELA KOBROSLY</h1>
        <p className="text-gray-500 text-sm mt-1">pckobrosly</p>
      </div>

      {/* Two-column content */}
      <div className="flex gap-6 px-8 py-6 items-start">

        {/* Left column */}
        <div className="flex-1 space-y-6">

          {/* Basic Information */}
          <Section title="Basic Information">
            <Row label="Full Name">
              <span className="underline text-gray-800">PAMELA KOBROSLY</span>
            </Row>
            <Row label="Email Address">
              <span className="text-gray-700">pckobrosly@ndu.edu.lb</span>
            </Row>
            <Row label="Student ID">
              <span className="text-gray-700">20257045</span>
            </Row>
            <Row label="Password" last>
              <BlueLink>Change password</BlueLink>
            </Row>
          </Section>

          {/* Additional Information */}
          <Section title="Additional Information">
            <Row label="Gender">
              <BlueLink>Add gender</BlueLink>
            </Row>
            <Row label="Additional Name">
              <span className="text-gray-700">#N/A</span>
            </Row>
            <Row label="Birthday">
              <BlueLink>Add birthday</BlueLink>
            </Row>
            <Row label="Education Level">
              <BlueLink>Add education level</BlueLink>
            </Row>
            <Row label="Website" last>
              <BlueLink>Add website</BlueLink>
            </Row>
          </Section>

          {/* Contact Information */}
          <Section title="Contact Information">
            <Row label="Mailing Address">
              <div className="flex flex-col gap-0.5">
                <BlueLink>Zouk Mosbeh Main Road</BlueLink>
                <BlueLink>Kesrwan</BlueLink>
                <BlueLink>72 Zouk Mikael</BlueLink>
                <BlueLink>LEBANON</BlueLink>
              </div>
            </Row>
            <Row label="Phone Number">
              <BlueLink>0921895012 (Work)</BlueLink>
            </Row>
            <Row label="Business Fax Number" last>
              <BlueLink>00-961-9-218771</BlueLink>
            </Row>
          </Section>

          {/* Job Information */}
          <Section title="Job Information">
            <Row label="Company">
              <BlueLink>Notre Dame University</BlueLink>
            </Row>
            <Row label="Job Title">
              <BlueLink>Add job title</BlueLink>
            </Row>
            <Row label="Department" last>
              <BlueLink>Add department</BlueLink>
            </Row>
          </Section>

        </div>

        {/* Right column — System Settings */}
        <div className="w-96 shrink-0">
          <Section title="System Settings">
            <Row label="Language">
              <BlueLink>System Default (English (United States))</BlueLink>
            </Row>
            <Row label="Privacy Settings">
              <BlueLink>Only instructors can view my profile information</BlueLink>
            </Row>
            <Row label="Global Notification Settings" last>
              <div className="flex flex-col gap-1">
                <BlueLink>Stream notifications</BlueLink>
                <BlueLink>Email notifications</BlueLink>
                <BlueLink>Push notifications</BlueLink>
              </div>
            </Row>
          </Section>
        </div>

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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg font-normal text-gray-700 mb-3">{title}</h2>
      <div className="bg-white border border-gray-200 rounded divide-y divide-gray-200">
        {children}
      </div>
    </div>
  )
}

function Row({ label, children, last }: { label: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div className={`flex items-start px-5 py-4 ${last ? '' : ''}`}>
      <span className="w-52 shrink-0 font-semibold text-gray-700 text-sm">{label}</span>
      <div className="text-sm">{children}</div>
    </div>
  )
}

function BlueLink({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-blue-600 hover:underline cursor-pointer">{children}</span>
  )
}
