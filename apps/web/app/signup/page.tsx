import { getDefaultImages } from '@/entities/user/api/server';
import { SignupPage } from '@/views/signup';

export default async function Page() {
  const defaultImages = await getDefaultImages();
  return <SignupPage defaultImages={defaultImages} />;
}
