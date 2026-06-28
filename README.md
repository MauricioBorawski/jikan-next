# Jikan Next

A Next.js 16 + React 19 app with Supabase SSR support and a calendar UI.

## Overview

This project demonstrates:

- Next.js App Router
- Server-side Supabase client integration
- Calendar UI using custom components
- Tailwind CSS and Radix UI primitives
- `next/font` optimization for the Geist font family

## Features

- Booking agenda app for a family pet shop
- Client management CRUD page for pets and owners
- Reservation creation from the calendar UI
- Calendar views with day, week, and month modes
- Event click detail interaction and booking creation
- Select existing clients or add a new client while creating a reservation
- Search and filter bookings by dog name
- Supabase integration for future auth, data persistence, and session handling
- Tailwind CSS, Radix UI, and `next/font` for a polished UI

## Requirements

- Node.js 20+
- npm / pnpm / yarn
- A Supabase project with public URL and anon key

## Environment Variables

Create a `.env.local` file in the project root with:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Installation

```bash
npm install
```

or

```bash
pnpm install
```

or

```bash
yarn install
```

## Running Locally

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Build

```bash
npm run build
npm run start
```

## Project Structure

- `src/app/page.tsx` — main page, server-side Supabase query and calendar layout
- `src/app/layout.tsx` — root layout and metadata
- `src/components/calendar/calendar.tsx` — calendar UI component
- `src/utils/supabase/server.ts` — server-side Supabase client helper
- `src/utils/supabase/middleware.ts` — Supabase middleware helper
- `src/utils/supabase/client.ts` — browser Supabase client helper

## Notes

- The current page fetches all rows from the `dogs` table.
- `src/app/layout.tsx` still contains default metadata and can be updated to reflect your app name and description.
- If you use Supabase auth or session refresh middleware, confirm `src/utils/supabase/middleware.ts` matches your routes.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
