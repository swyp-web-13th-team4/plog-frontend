import { SignupPage } from '@/views/signup';

import { getDefaultImages } from '@/entities/user/api/server';

export default async function Page() {
  const defaultImages = await getDefaultImages().catch(() => []);
  return <SignupPage defaultImages={defaultImages} />;
}
