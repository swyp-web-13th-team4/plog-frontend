import { getTerm } from '@/entities/user/api/server';
import { TermsPage } from '@/views/terms';

export default async function Page() {
  const term = await getTerm('geolocation');
  return <TermsPage title="위치정보 이용약관" content={term} />;
}
