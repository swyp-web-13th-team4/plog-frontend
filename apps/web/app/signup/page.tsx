import type { Metadata } from 'next';

import { SignupPage } from '@/views/signup';

export const metadata: Metadata = { title: '회원가입' };

import { getDefaultImages } from '@/entities/user/api/server';

export default async function Page() {
  const defaultImages = await getDefaultImages().catch(() => []);
  return <SignupPage defaultImages={defaultImages} />;
}
