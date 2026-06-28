# Agents

This repository is a Next.js app built with the App Router and TypeScript.

## Stack

- Next.js 16.2.9
- React 19.1.0
- Supabase for backend and auth support
- FullCalendar for calendar UI and reservation events
- Radix UI primitives for dialogs, popovers, labels, and separators
- Tailwind CSS v4 for styling
- `next/font` for Geist font optimization

## Key libraries

- `@supabase/ssr`
- `@supabase/supabase-js`
- `@fullcalendar/react`
- `@fullcalendar/daygrid`
- `@fullcalendar/list`
- `@fullcalendar/timegrid`
- `@radix-ui/react-dialog`
- `@radix-ui/react-popover`
- `@radix-ui/react-label`
- `@radix-ui/react-separator`
- `tailwind-merge`
- `clsx`

## Important files

- `src/app/` — route entry points only; keep pages small and import screen components
- `src/screens/calendar/` — main calendar screen components and booking flow
- `src/screens/agenda/` — agenda/client CRUD screen when added later
- `src/components/ui/` — shared UI primitives such as buttons, inputs, dialogs, popovers
- `src/components/` — reusable feature widgets and non-primitive components
- `src/schemas/` — Zod schemas and inferred types for clients, dogs, reservations, and users
- `src/utils/supabase/` — Supabase client, server helpers, auth, and CRUD service wrappers

## Project goal

The application is intended as a family pet shop booking system with:
- agenda and client management
- calendar reservations for dog grooming appointments
- future Supabase auth and persistence
