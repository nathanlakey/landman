import { clerkMiddleware, createRouteMatcher, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { ADMIN_EMAILS } from '@/lib/admin'

const isAdminRoute = createRouteMatcher(['/admin(.*)'])
const isAdminSignIn = createRouteMatcher(['/admin/sign-in'])

export default clerkMiddleware(async (auth, req) => {
  // The sign-in page itself must remain publicly accessible
  if (isAdminSignIn(req)) return
  if (!isAdminRoute(req)) return

  // Step 1 — must be logged in; redirects to the admin sign-in page if not
  await auth.protect({ unauthenticatedUrl: new URL('/admin/sign-in', req.url).toString() })

  // Step 2 — must be an approved admin email
  const { userId } = await auth()
  const client = await clerkClient()
  const user = await client.users.getUser(userId!)
  const email = user.emailAddresses
    .find((e) => e.id === user.primaryEmailAddressId)
    ?.emailAddress

  if (
    !email ||
    !ADMIN_EMAILS.map((e) => e.toLowerCase()).includes(email.toLowerCase())
  ) {
    return NextResponse.redirect(new URL('/', req.url))
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}



