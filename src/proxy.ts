import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function proxy(request: NextRequest) {
  const session = request.cookies.get('admin_session')
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    if (!session?.value) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // If logged in and trying to access login page, redirect to admin
  if (pathname.startsWith('/admin/login') && session?.value) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}
 
export const config = {
  matcher: ['/admin/:path*'],
}
