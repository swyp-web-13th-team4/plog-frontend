import UserFeedListSkeleton from './UserFeedListSkeleton';

export default function UserProfileSkeleton() {
  return (
    <div className="flex flex-col gap-3 pt-[var(--spacing-header)]">
      <div className="flex animate-pulse flex-col items-center gap-4 p-6">
        <div className="size-20 rounded-full bg-semantic-object-subtler" />
        <div className="flex flex-col items-center gap-1">
          <div className="h-[30px] w-24 rounded bg-semantic-object-subtler" />
          <div className="h-[22px] w-48 rounded bg-semantic-object-subtler" />
        </div>
      </div>
      <UserFeedListSkeleton />
    </div>
  );
}
