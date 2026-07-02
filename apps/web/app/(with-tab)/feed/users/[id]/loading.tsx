import UserProfileHeader from '@/views/users-detail/ui/UserProfileHeader';
import UserProfileSkeleton from '@/views/users-detail/ui/UserProfileSkeleton';

export default function Loading() {
  return (
    <>
      <UserProfileHeader />
      <UserProfileSkeleton />
    </>
  );
}
