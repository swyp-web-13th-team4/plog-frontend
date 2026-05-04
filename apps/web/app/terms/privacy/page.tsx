import { getTerm } from '@/entities/user/api/server';
import { TermsPage } from '@/views/terms';

export default async function Page() {
  const term = await getTerm('privacy');
  return <TermsPage title="개인정보 처리방침" content={term} />;
}
