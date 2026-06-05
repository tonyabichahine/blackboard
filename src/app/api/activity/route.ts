import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  const cookieStore = await cookies()
  const session = cookieStore.get('bb_session')
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = JSON.parse(Buffer.from(session.value, 'base64').toString())

  const { data, error } = await supabaseAdmin
    .from('activity')
    .select('*')
    .eq('student_id', id)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
