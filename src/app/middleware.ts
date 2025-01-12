import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken');

  const path = request.nextUrl.pathname;
  const isPublicPaths = path === '/signin' || path === '/signup';

  if (!token && !isPublicPaths) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }
  if (token && isPublicPaths) {
    return NextResponse.redirect(new URL('/blogs/write', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/blogs/:path*', '/blogs', '/dashboard/:path*', '/signin', '/signup'],
};
