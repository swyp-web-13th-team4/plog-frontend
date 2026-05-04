import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

import { getTerm } from '@/entities/user/api/server';
import { TermsPage } from '@/views/terms';

export default async function Page() {
  const window = new JSDOM('').window;
  const purify = DOMPurify(window);

  const term = await getTerm('service').then((html) => purify.sanitize(html));
  return <TermsPage title="서비스 이용약관" content={term} />;
}
