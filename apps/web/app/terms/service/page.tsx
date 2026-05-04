import { getTerm } from '@/entities/user/api/server';
import { TermsPage } from '@/views/terms';

export default async function Page() {
  const term = await getTerm('service');
  return <TermsPage title="서비스 이용약관" content={term} />;
}
