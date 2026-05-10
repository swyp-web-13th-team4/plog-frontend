import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const accessToken = searchParams.get('accessToken');
  const refreshToken = searchParams.get('refreshToken');
  const registerToken = searchParams.get('registerToken');

  const cookieStore = await cookies();

  const setCookie = (name: string, value: string) => {
    cookieStore.set(name, value, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    });
  };

  if (registerToken?.trim()) {
    setCookie('registerToken', registerToken);
    return redirect('/signup');
  }

  if (accessToken?.trim() && refreshToken?.trim()) {
    setCookie('accessToken', accessToken);
    setCookie('refreshToken', refreshToken);
    return redirect('/map');
  }

  return redirect('/login');
}
