import FeedDetailHeader from '@/views/feed-detail/ui/FeedDetailHeader';

export default function Loading() {
  return (
    <>
      <FeedDetailHeader />
      <div className="animate-pulse">
        <section className="relative pt-[var(--spacing-header)]">
          <div className="flex items-center gap-3 px-6 py-3">
            <div className="size-12 shrink-0 rounded-full bg-semantic-object-subtler" />
            <div className="flex flex-col gap-1.5">
              <div className="h-[22px] w-20 rounded bg-semantic-object-subtler" />
              <div className="h-4 w-14 rounded bg-semantic-object-subtler" />
            </div>
          </div>
          <div className="aspect-square w-full bg-semantic-object-subtler" />
          <div className="flex flex-col gap-2.5 px-6 pt-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="size-6 rounded bg-semantic-object-subtler" />
                <div className="h-4 w-6 rounded bg-semantic-object-subtler" />
              </div>
              <div className="flex items-center gap-3">
                <div className="size-6 rounded bg-semantic-object-subtler" />
                <div className="size-6 rounded bg-semantic-object-subtler" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="h-5 w-14 rounded-sm bg-semantic-object-subtler" />
              <div className="h-[26px] w-36 rounded bg-semantic-object-subtler" />
              <div className="h-[22px] w-52 rounded bg-semantic-object-subtler" />
            </div>
            <div className="h-[76px] w-full rounded-xl bg-semantic-object-subtler" />
            <div className="flex gap-2">
              <div className="h-5 w-14 rounded-sm bg-semantic-object-subtler" />
              <div className="h-5 w-16 rounded-sm bg-semantic-object-subtler" />
              <div className="h-5 w-12 rounded-sm bg-semantic-object-subtler" />
            </div>
          </div>
          <div className="mt-7 flex flex-col border-t border-semantic-object-subtler px-6 py-7">
            <div className="mb-1 h-[26px] w-2/3 rounded bg-semantic-object-subtler" />
            <div className="mb-1.5 h-[22px] w-full rounded bg-semantic-object-subtler" />
            <div className="mb-1.5 h-[22px] w-full rounded bg-semantic-object-subtler" />
            <div className="mb-3 h-[22px] w-3/4 rounded bg-semantic-object-subtler" />
            <div className="h-4 w-20 self-end rounded bg-semantic-object-subtler" />
          </div>
        </section>
      </div>
    </>
  );
}
