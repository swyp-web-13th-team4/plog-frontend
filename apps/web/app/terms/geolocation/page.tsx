import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

import { getTerm } from '@/entities/user/api/server';
import { TermsPage } from '@/views/terms';

export const metadata = { title: '위치정보 이용약관' };

export default async function Page() {
  const window = new JSDOM('').window;
  const purify = DOMPurify(window);

  const term = await getTerm('geolocation').then((html) =>
    purify.sanitize(html),
  );
  return <TermsPage title="위치정보 이용약관" content={term} />;
}
