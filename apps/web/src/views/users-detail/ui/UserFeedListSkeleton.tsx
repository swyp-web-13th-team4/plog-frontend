export default function UserFeedListSkeleton() {
  return (
    <div className="animate-pulse pt-3">
      <div className="flex justify-between px-6">
        <div className="h-9 w-26 rounded-xl bg-semantic-object-subtler" />
        <div className="size-9 rounded-lg bg-semantic-object-subtler" />
      </div>
      <div>
        {['a', 'b', 'c'].map((key) => (
          <div
            key={key}
            className="flex gap-4 border-b border-b-semantic-object-subtler px-6 py-5"
          >
            <div className="size-30 shrink-0 rounded-xl bg-semantic-object-subtler mobile:size-27" />
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="h-5 w-16 rounded bg-semantic-object-subtler" />
              <div className="flex flex-1 flex-col gap-1">
                <div className="h-[22px] w-2/3 rounded bg-semantic-object-subtler" />
                <div className="h-4 w-1/2 rounded bg-semantic-object-subtler" />
              </div>
              <div className="flex gap-3">
                <div className="h-4 w-16 rounded bg-semantic-object-subtler" />
                <div className="h-4 w-16 rounded bg-semantic-object-subtler" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
