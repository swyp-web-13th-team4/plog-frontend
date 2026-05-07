import { ProfileEditPage } from '@/views/my-profile-edit';

import { getDefaultImages } from '@/entities/user/api/server';

export default async function Page() {
  const defaultImages = await getDefaultImages().catch(() => []);
  return <ProfileEditPage defaultImages={defaultImages} />;
}
