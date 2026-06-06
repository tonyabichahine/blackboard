@AGENTS.md

# Blackboard — NDU Student Grade Dashboard

## What this is
A Blackboard-style student portal for Notre Dame University (NDU). Students log in to view grades, activity, courses, calendar, messages, and profile. Built by Tony Abi Chahine (tonyabichahine@gmail.com), non-developer.

## Live URLs
- **Production:** https://blackboard-ndu.vercel.app
- **Maintenance page:** https://blackboard-ndu.vercel.app (root `/`)
- **Login:** https://blackboard-ndu.vercel.app/login
- **GitHub:** tonyabichahine/blackboard (repo ID: 1260443528)

## How to run locally
```
cd Desktop\blackboard
npm run dev
```
Opens at http://localhost:3000

## CRITICAL — before every git push
```
npm run build   # must pass before pushing
git add ...
git commit -m "..."
git push
```
Vercel auto-deploys in ~60 seconds after push.

## Tech stack
| Layer | Tech |
|---|---|
| Framework | Next.js (App Router, TypeScript, Tailwind CSS) |
| Database | Supabase PostgreSQL — project: `hmwhartoxavfpkchojbs` (eu-central-1) |
| Auth | Username + password (bcryptjs), cookie session (`bb_session`) |
| Hosting | Vercel — project: `blackboard-ndu` |

## Environment variables (.env.local) — never commit
All values are in `Desktop\blackboard\.env.local` and set on Vercel.
Keys: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD`, `SESSION_SECRET`
Actual values: stored in Claude memory (project_blackboard.md) — never put in committed files.

## Running Supabase SQL migrations
No psql or Supabase CLI installed. Use the Management API with the Supabase PAT from Claude memory:
```bash
curl -s -X POST "https://api.supabase.com/v1/projects/hmwhartoxavfpkchojbs/database/query" \
  -H "Authorization: Bearer <SUPABASE_PAT_FROM_MEMORY>" \
  -H "Content-Type: application/json" \
  -d '{"query": "YOUR SQL HERE"}'
```
Empty array `[]` = success.

## Key credentials
All tokens/secrets are stored in Claude memory (project_blackboard.md) — never commit them.
- Supabase PAT, DB password, anon key, service role key → Claude memory
- Vercel token, project ID `prj_lE8tffTLqeAV797b7buTdeFvov8U`, team ID `team_x9DuedDZLuc0YGF67agFCLQX` → Claude memory
- GitHub token, repo ID `1260443528` → Claude memory

## Test accounts
- **Student:** username `pckobrosly` / password `93@aW5q1` → Pamela Kobrosly
- **Admin:** username `admin` / password `admin123`

## Database tables
| Table | Purpose |
|---|---|
| `students` | id, username, password_hash, full_name, student_id, email |
| `admins` | id, username, password_hash, full_name, email |
| `courses` | id, course_code, course_name, instructor, semester, year |
| `grades` | id, student_id (FK), course_id (FK), grade, grade_points, credits |
| `activity` | id, student_id (FK), course_code, course_name, activity_type, description, grade_value, created_at |

## Activity data (seeded for pckobrosly)
**ENGLISH 105 — A-NLC** (May 16, 2026):
- Final Gram → 90/100 @ 7:10 PM Lebanon time
- Final Read → 87/100 @ 1:57 PM
- Final Writ. → 91/100 @ 1:55 PM
- CW Part. Reading → 85/100 @ 1:55 PM

**IDP 222-223-226** (May 18, 2026): 4 × Interior Design → 93, 92, 87, 90 / 100 @ 11:00 PM

**ARB 238** (May 20, 2026): Arabic Literature → 85/100 @ 12:34 PM

**Timezone note:** User is Lebanon (UTC+3). Store UTC = desired Lebanon time minus 3h.
**Sort order:** ascending by day, descending by time within same day.

## File map
```
src/
├── app/
│   ├── page.tsx                    # Maintenance splash page (/)
│   ├── login/page.tsx              # Login page (/login)
│   ├── dashboard/
│   │   ├── layout.tsx              # Protected layout — session check, sidebar
│   │   ├── page.tsx                # Activity Stream (default)
│   │   ├── profile/page.tsx        # Student profile with right-side drawers
│   │   ├── courses/page.tsx        # 3 courses, search, list/grid, star
│   │   ├── calendar/page.tsx       # Day/Month view, settings drawer
│   │   ├── grades/page.tsx         # 2 cards — empty + grades (B+/88)
│   │   ├── messages/page.tsx       # Placeholder
│   │   └── tools/page.tsx          # Placeholder
│   └── api/
│       ├── auth/login/route.ts     # POST → sets bb_session cookie
│       ├── auth/logout/route.ts    # POST → clears cookie
│       └── activity/route.ts       # GET activity for logged-in student
├── components/
│   └── Sidebar.tsx                 # Desktop fixed sidebar + mobile hamburger drawer
└── lib/
    ├── supabase.ts                 # supabase + supabaseAdmin clients
    └── auth.ts                     # loginStudent, loginAdmin, getSession
public/
├── ndu-logo.png                    # NDU logo (login + maintenance pages)
└── calc-icon.png                   # Calculator icon (grades page)
```

## Pages overview

### Maintenance page (`/`)
Dark bg (#2b2b2b), gold top border, NDU logo, warning icon.
Message: "The main domain is currently down — ongoing updates."
Button → `/login`

### Login page (`/login`)
Exact NDU Blackboard design. Username + password (bottom border only). Sign In → `/dashboard` (students) or `/admin` (admins).

### Dashboard layout
- Desktop: fixed sidebar 208px — Blackboard logo, student name (→ profile), nav, Sign Out
- Mobile: fixed top bar with hamburger + centered "Blackboard", slide-in drawer
- All pages: `overflow-x-hidden`, mobile-first

### Activity Stream (`/dashboard`)
Timeline from `activity` table. "View my grade" toggles grade pill + "Hide".
Grade colors: ≥85 green (#4ade80), ≥70 yellow (#facc15), <70 red (#f87171).

### Courses (`/dashboard/courses`)
3 courses: ENGLISH 105 (teal), IDP 222-223-226 (purple), ARB 238 (blue).
Click course name → toast "Cannot open previous semester courses".

### Calendar (`/dashboard/calendar`)
Day view: week strip + hourly slots. Month view: full grid.
Settings drawer: calendar visibility toggles.
Mobile: 2-row toolbar.

### Grades (`/dashboard/grades`)
Card 1: SP26-ARB238A-NLC — empty state (diagonal stripes).
Card 2: ENL105 + IDP + ARB238 — B+ green, 88/100 green, calc icon, 6/3/26.

### Profile (`/dashboard/profile`)
Banner + avatar. PAMELA KOBROSLY / pckobrosly.
Right-side drawers: Language, Privacy, Gender, Additional Name, Birthday (3 dropdowns), Education Level, Website, Address, Phone, Fax, Company, Job Title, Department.
Read-only: Full Name, Email, Student ID.

## Design tokens
- Sidebar bg: `#1a1a1a` | Active item bg: `#2d2d2d` | Active border: `#c026d3`
- Login/maintenance bg: `#2b2b2b` | Gold accent: `#b89a4e`
- Drawer close button: `#a855f7` | Today/selected: `#7c3aed`
- Grade green: `#4ade80` / `#22c55e` | Yellow: `#facc15` | Red: `#f87171`

## What is NOT yet built
- Admin panel
- Messages page (placeholder)
- Tools page (placeholder)
- Multiple student accounts (only Pamela Kobrosly seeded)

## Owner context
Tony is a non-developer. Implement directly, minimal explanation. Use `py -m pip` if Python needed. Never push to GitHub without Tony's explicit instruction.
