import { SignupPage } from '@/views/signup';

import { getDefaultImages } from '@/entities/user/api/server';

export default async function Page() {
  const defaultImages = await getDefaultImages();
  return <SignupPage defaultImages={defaultImages} />;
}
