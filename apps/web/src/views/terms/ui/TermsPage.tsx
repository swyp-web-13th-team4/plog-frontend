'use client';

import { useRouter } from 'next/navigation';

import { AppBar } from '@plog/ui';
import { cn } from '@plog/utils';

type TermsPageProps = {
  title: string;
  content: string;
};

export default function TermsPage({ title, content }: TermsPageProps) {
  const router = useRouter();

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-10 mx-auto max-w-layout">
        <AppBar
          variant="navigation"
          title={title}
          onBack={() => router.back()}
        />
      </header>
      <article
        lang="ko"
        dangerouslySetInnerHTML={{ __html: content }}
        className={cn(
          'body-sm min-h-dvh p-6 pt-[calc(24px+var(--spacing-header))] text-semantic-object-bold',
          '[&_h2]:-mb-1 [&_h2]:text-semantic-title-md [&_h2]:leading-semantic-title-md [&_h2]:font-semantic-title-md',
          '[&_h4]:pt-7 [&_h4]:pb-3 [&_h4]:text-semantic-label-lg [&_h4]:leading-semantic-label-lg [&_h4]:font-semantic-label-lg',
          '[&_ol]:list-decimal [&_ol]:pl-4 [&_ol_ol]:list-[lower-alpha]',
          '[&_hr]:-mx-6 [&_hr]:my-6 [&_hr]:border-4 [&_hr]:border-semantic-bg-deep',
        )}
      />
    </>
  );
}
