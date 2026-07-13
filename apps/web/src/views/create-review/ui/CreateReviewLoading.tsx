import { Spinner } from '@plog/ui';

export default function CreateReviewLoading() {
  return (
    <section className="flex min-h-screen items-center justify-center pt-[var(--spacing-header)]">
      <Spinner size="large" />
    </section>
  );
}
