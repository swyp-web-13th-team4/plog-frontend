import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken');
  const pathname = request.nextUrl.pathname;

  const isProtectedPage =
    pathname.startsWith('/map') ||
    pathname.startsWith('/log') ||
    pathname.startsWith('/my');

  const isGuestOnlyPage = pathname.startsWith('/signup');

  if (!accessToken && isProtectedPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (accessToken && isGuestOnlyPage) {
    return NextResponse.redirect(new URL('/map', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/map/:path*', '/log/:path*', '/my/:path*', '/signup/:path*'],
};
