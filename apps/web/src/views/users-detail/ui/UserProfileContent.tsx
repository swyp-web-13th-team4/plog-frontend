import { getUserProfile } from '../api/server';
import { type FeedProfileViewResponse } from '../model/schemas';
import UserFeedSection from './UserFeedSection';
import UserProfileSection from './UserProfileSection';

export default async function UserProfileContent({
  userId,
}: {
  userId: string;
}) {
  const initialData: FeedProfileViewResponse | undefined = await getUserProfile(
    userId,
  ).catch(() => undefined);

  return (
    <div className="flex flex-col gap-3 pt-[var(--spacing-header)]">
      <UserProfileSection userId={userId} initialData={initialData} />
      <UserFeedSection userId={userId} />
    </div>
  );
}
