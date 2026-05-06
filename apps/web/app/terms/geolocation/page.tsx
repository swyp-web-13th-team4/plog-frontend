import { TermsPage } from '@/views/terms';

import { getSanitizedTerm } from '@/entities/user/api/server';

export const dynamic = 'force-static';
export const metadata = { title: '위치정보 이용약관' };

export default async function Page() {
  const term = await getSanitizedTerm('geolocation');
  return <TermsPage title="위치정보 이용약관" content={term} />;
}
