import { cookies } from 'next/headers'
import { supabaseAdmin } from './supabase'
import bcrypt from 'bcryptjs'

export async function loginStudent(username: string, password: string) {
  const { data: student, error } = await supabaseAdmin
    .from('students')
    .select('*')
    .eq('username', username)
    .single()

  if (error || !student) return null
  const valid = await bcrypt.compare(password, student.password_hash)
  if (!valid) return null
  return student
}

export async function loginAdmin(username: string, password: string) {
  const { data: admin, error } = await supabaseAdmin
    .from('admins')
    .select('*')
    .eq('username', username)
    .single()

  if (error || !admin) return null
  const valid = await bcrypt.compare(password, admin.password_hash)
  if (!valid) return null
  return admin
}

export async function getSession() {
  const cookieStore = await cookies()
  const session = cookieStore.get('bb_session')
  if (!session) return null
  try {
    return JSON.parse(Buffer.from(session.value, 'base64').toString())
  } catch {
    return null
  }
}
