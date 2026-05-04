import UserFeedSection from './UserFeedSection';
import UserProfileSection from './UserProfileSection';

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="flex flex-col gap-3">
      <UserProfileSection userId={id} />
      <UserFeedSection userId={id} />
    </div>
  );
}
