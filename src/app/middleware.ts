export { auth as middleware } from '@/lib/actions/auth/auth';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
