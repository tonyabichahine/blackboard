'use client'

import { useState } from 'react'
import Image from 'next/image'

const MESSAGE = {
  id: 1,
  from: 'NDU Student Affairs',
  email: 'ndustudentaffair@gmail.com',
  subject: 'Financial Aid Grant — Award Notification SP26',
  preview: 'Dear Pamela Kobrosly, We are pleased to inform you that following a thorough review...',
  date: 'Jun 8, 2026',
  read: false,
}

export default function MessagesPage() {
  const [open, setOpen] = useState(false)
  const [read, setRead] = useState(false)

  function openMessage() {
    setOpen(true)
    setRead(true)
  }

  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden">

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-5">
        <h1 className="text-xl md:text-3xl font-light text-gray-800">Messages</h1>
      </div>

      {/* Inbox */}
      <div className="px-4 md:px-8 py-6">
        <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded overflow-hidden">

          {/* Inbox toolbar */}
          <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Inbox</span>
            <span className="text-xs text-gray-400">{read ? '0' : '1'} unread</span>
          </div>

          {/* Message row */}
          <div
            onClick={openMessage}
            className={`flex items-start gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100 ${!read ? 'bg-blue-50' : ''}`}
          >
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-white font-semibold text-sm"
              style={{ backgroundColor: '#1d4ed8' }}>
              NDU
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className={`text-sm ${!read ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                  {MESSAGE.from}
                </span>
                <span className="text-xs text-gray-400 shrink-0 ml-2">{MESSAGE.date}</span>
              </div>
              <p className={`text-sm ${!read ? 'font-semibold text-gray-800' : 'text-gray-600'} truncate`}>
                {MESSAGE.subject}
              </p>
              <p className="text-xs text-gray-400 truncate mt-0.5">{MESSAGE.preview}</p>
            </div>

            {/* Unread dot */}
            {!read && <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-2" />}
          </div>

          {/* Empty state hint */}
          <div className="px-5 py-8 text-center text-gray-400 text-sm">
            No other messages
          </div>
        </div>
      </div>

      {/* ── Full Message Modal ── */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-start justify-center p-4 md:p-8 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-lg shadow-2xl my-4">

            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-base md:text-lg font-semibold text-gray-800 truncate pr-4">{MESSAGE.subject}</h2>
              <button onClick={() => setOpen(false)}
                className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Message content */}
            <div className="px-6 py-6">

              {/* NDU letterhead */}
              <div className="flex items-center gap-4 pb-5 border-b border-gray-200 mb-6">
                <Image src="/ndu-logo.png" alt="NDU" width={100} height={38} className="h-10 w-auto object-contain" />
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Notre Dame University</p>
                  <p className="text-xs text-gray-400">Office of Student Affairs</p>
                </div>
              </div>

              {/* Email meta */}
              <div className="space-y-1 mb-6 text-xs text-gray-500">
                <div className="flex gap-2">
                  <span className="font-semibold w-10 shrink-0">From:</span>
                  <span>NDU Student Affairs &lt;ndustudentaffair@gmail.com&gt;</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold w-10 shrink-0">To:</span>
                  <span>Pamela Kobrosly &lt;pckobrosly@ndu.edu.lb&gt;</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold w-10 shrink-0">Date:</span>
                  <span>June 8, 2026 — 9:00 AM</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold w-10 shrink-0">Re:</span>
                  <span>{MESSAGE.subject}</span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 mb-6" />

              {/* Body */}
              <div className="text-sm text-gray-700 leading-relaxed space-y-4">
                <p>Dear Pamela Kobrosly,</p>

                <p>
                  We are pleased to inform you that following a thorough review of your financial aid application,
                  the Office of Student Affairs at <strong>Notre Dame University</strong> has officially approved
                  a <strong>Financial Aid Grant of 40%</strong> of your tuition fees for the current academic semester.
                </p>

                <p>
                  This decision was reached based on a careful assessment of your academic standing, financial need,
                  and the supporting documents submitted through the University's financial aid portal.
                </p>

                {/* Grant details box */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 my-4">
                  <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">Grant Details</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Student Name</span>
                      <span className="font-semibold text-gray-800">Pamela Kobrosly</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Student ID</span>
                      <span className="font-semibold text-gray-800">20257045</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Email</span>
                      <span className="font-semibold text-gray-800">pckobrosly@ndu.edu.lb</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Academic Year</span>
                      <span className="font-semibold text-gray-800">2026–2027</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Semester</span>
                      <span className="font-semibold text-gray-800">Fall 2026</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                      <span className="text-gray-500 font-semibold">Financial Aid Grant</span>
                      <span className="font-bold text-green-600 text-base">40%</span>
                    </div>
                  </div>
                </div>

                <p>
                  Please note that this grant will be <strong>automatically applied to your tuition account</strong> within
                  5–7 business days from the date of this notification. <strong>Action Required:</strong> Please email the financial aid department for the missing documents required to finalize your award.
                </p>

                <p>
                  Should you have any questions or require further clarification regarding your financial aid award,
                  please do not hesitate to contact the Office of Student Affairs during official working hours:
                  <br />
                  <span className="text-gray-500">Monday – Friday &nbsp;|&nbsp; 8:00 AM – 4:00 PM</span>
                </p>

                <p>We wish you continued success in your academic journey at Notre Dame University.</p>

                {/* Signature */}
                <div className="pt-4 border-t border-gray-100 mt-6">
                  <p className="font-semibold text-gray-800">Sincerely,</p>
                  <p className="text-gray-700 mt-1">Office of Student Affairs</p>
                  <p className="text-gray-500 text-xs">Notre Dame University</p>
                  <p className="text-gray-500 text-xs">Zouk Mosbeh, Kesrwan, Lebanon</p>
                  <p className="text-gray-500 text-xs">ndustudentaffair@gmail.com</p>
                </div>

                {/* Official stamp */}
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100">
                  <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center" style={{ borderColor: '#1d4ed8' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <p className="text-xs text-gray-400">This is an official notification from Notre Dame University. Please retain for your records.</p>
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
              <button onClick={() => setOpen(false)}
                className="px-5 py-2 text-sm text-white rounded" style={{ backgroundColor: '#1d4ed8' }}>
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Help */}
      <div className="fixed bottom-6 right-6 z-10">
        <button className="w-9 h-9 rounded-full border-2 border-gray-400 flex items-center justify-center text-gray-500 text-sm font-semibold">?</button>
      </div>

    </div>
  )
}
