import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('accessToken')

  const path = request.nextUrl.pathname;
  const isPublicPaths = path === '/signin' || path === '/signup'

  if (!token && !isPublicPaths) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }
  if (token && isPublicPaths) {
    return NextResponse.redirect(new URL('/blogs/write', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/blogs/:path*', '/blogs', '/dashboard/:path*', '/signin', '/signup'],
}

