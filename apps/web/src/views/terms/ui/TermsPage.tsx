import { cn } from '@plog/utils';

import NavigationHeader from '@/shared/ui/NavigationHeader';

type TermsPageProps = {
  title: string;
  content: string;
};

export default function TermsPage({ title, content }: TermsPageProps) {
  return (
    <>
      <NavigationHeader title={title} />
      <article
        lang="ko"
        dangerouslySetInnerHTML={{ __html: content }}
        className={cn(
          'body-sm min-h-dvh p-6 pt-[calc(24px+var(--spacing-header))] text-semantic-object-bold',
          '[&_h2]:-mb-1 [&_h2]:text-semantic-title-md [&_h2]:leading-semantic-title-md [&_h2]:font-semantic-title-md [&_h2+p]:pt-4 [&_p+p]:mt-2',
          '[&_h4]:pt-7 [&_h4]:pb-3 [&_h4]:text-semantic-label-lg [&_h4]:leading-semantic-label-lg [&_h4]:font-semantic-label-lg',
          '[&_ol]:list-decimal [&_ol]:pl-4 [&_ol_ol]:list-[lower-alpha]',
          '[&_hr]:-mx-6 [&_hr]:my-6 [&_hr]:border-4 [&_hr]:border-semantic-bg-deep',
        )}
      />
    </>
  );
}
