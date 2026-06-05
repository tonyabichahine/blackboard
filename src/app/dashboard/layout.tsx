import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { supabaseAdmin } from '@/lib/supabase'
import Sidebar from '@/components/Sidebar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const session = cookieStore.get('bb_session')

  if (!session) redirect('/')

  const { id } = JSON.parse(Buffer.from(session.value, 'base64').toString())

  const { data: student } = await supabaseAdmin
    .from('students')
    .select('full_name')
    .eq('id', id)
    .single()

  const name = student?.full_name ?? 'Student'

  return (
    <div className="flex min-h-screen">
      <Sidebar studentName={name} />
      <main className="flex-1 ml-52 bg-gray-100 min-h-screen">
        {children}
      </main>
    </div>
  )
}
