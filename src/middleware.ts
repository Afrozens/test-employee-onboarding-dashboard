import { NextResponse, type NextRequest } from 'next/server';
import { AuthenticatedCookies } from '@/utils/auth';

export function middleware(req: NextRequest) {
  const token = req.cookies.get(AuthenticatedCookies.ACCESS)?.value;
  const parts = token && token.split('.');
  const publicRoutes = [
    '/login',
  ];
  
  const isPublicRoute = publicRoutes.some((route) => req.nextUrl.pathname === route);

  if (req.nextUrl.pathname === '/login' && parts?.length === 3) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (!isPublicRoute && parts?.length !== 3) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/', '/employees/:path'],
};