import FeedListHeader from './FeedListHeader';

function FeedCardSkeleton() {
  return (
    <div className="mb-13.5">
      <div className="flex items-center gap-3 px-6 py-3">
        <div className="size-12 shrink-0 rounded-full bg-semantic-object-subtler" />
        <div className="flex flex-col gap-1">
          <div className="h-[22px] w-20 rounded bg-semantic-object-subtler" />
          <div className="h-4 w-14 rounded bg-semantic-object-subtler" />
        </div>
      </div>
      <div className="aspect-square w-full bg-semantic-object-subtler" />
      <div className="flex flex-col gap-2.5 px-6 pt-3">
        <div className="flex items-center justify-between">
          <div className="size-6 rounded bg-semantic-object-subtler" />
          <div className="flex items-center gap-3">
            <div className="size-6 rounded bg-semantic-object-subtler" />
            <div className="size-6 rounded bg-semantic-object-subtler" />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <div className="h-[22px] w-36 rounded bg-semantic-object-subtler" />
            <div className="h-[18px] w-52 rounded bg-semantic-object-subtler" />
          </div>
          <div className="h-[76px] w-full rounded-xl bg-semantic-object-subtler" />
          <div className="flex gap-2">
            <div className="h-5 w-14 rounded-sm bg-semantic-object-subtler" />
            <div className="h-5 w-16 rounded-sm bg-semantic-object-subtler" />
            <div className="h-5 w-12 rounded-sm bg-semantic-object-subtler" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeedListSkeleton() {
  return (
    <>
      <FeedListHeader />
      <section className="relative animate-pulse pt-[var(--spacing-header)]">
        {['a', 'b'].map((key) => (
          <FeedCardSkeleton key={key} />
        ))}
      </section>
    </>
  );
}
