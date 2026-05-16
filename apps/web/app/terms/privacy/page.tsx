import { Metadata } from 'next';

import { TermsPage } from '@/views/terms';

import { getSanitizedTerm } from '@/entities/user/api/server';

export const dynamic = 'force-static';
export const metadata: Metadata = { title: '개인정보 처리방침' };

export default async function Page() {
  const term = await getSanitizedTerm('privacy');
  return <TermsPage title="개인정보 처리방침" content={term} />;
}
