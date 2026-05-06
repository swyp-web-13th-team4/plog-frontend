import { getSanitizedTerm } from '@/entities/user/api/server';
import { TermsPage } from '@/views/terms';

export const dynamic = 'force-static';
export const metadata = { title: '서비스 이용약관' };

export default async function Page() {
  const term = await getSanitizedTerm('service');
  return <TermsPage title="서비스 이용약관" content={term} />;
}
