import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const accessToken = searchParams.get('accessToken');
  const refreshToken = searchParams.get('refreshToken');
  const registerToken = searchParams.get('registerToken');

  const cookieStore = await cookies();

  if (registerToken) {
    cookieStore.set('registerToken', registerToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    });
    redirect('/signup');
  }

  if (accessToken && refreshToken) {
    cookieStore.set('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    });
    cookieStore.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    });
    redirect('/map');
  }

  redirect('/login');
}
