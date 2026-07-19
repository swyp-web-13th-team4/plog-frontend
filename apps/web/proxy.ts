import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken');
  const pathname = request.nextUrl.pathname;

  const pathSegments = pathname.split('/').filter((segment) => segment !== '');

  const isReviewCreatePage =
    pathSegments.length === 3 &&
    pathSegments[0] === 'review' &&
    pathSegments[2] === 'create';

  const isProtectedPage =
    pathname.startsWith('/map') ||
    pathname.startsWith('/log') ||
    pathname.startsWith('/my') ||
    isReviewCreatePage;

  const isGuestOnlyPage = pathname.startsWith('/signup');

  if (!accessToken && isProtectedPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (accessToken && isGuestOnlyPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/map/:path*',
    '/log/:path*',
    '/my/:path*',
    '/signup/:path*',
    '/review/:postId/create',
  ],
};
