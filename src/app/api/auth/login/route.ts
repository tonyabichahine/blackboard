import { NextRequest, NextResponse } from 'next/server'
import { loginStudent, loginAdmin } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()

  if (!username || !password) {
    return NextResponse.json({ error: 'Missing credentials' }, { status: 400 })
  }

  let user = await loginStudent(username, password)
  let role = 'student'

  if (!user) {
    user = await loginAdmin(username, password)
    role = 'admin'
  }

  if (!user) {
    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })
  }

  const sessionData = Buffer.from(JSON.stringify({ id: user.id, username: user.username, role })).toString('base64')

  const cookieStore = await cookies()
  cookieStore.set('bb_session', sessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })

  return NextResponse.json({ role })
}
