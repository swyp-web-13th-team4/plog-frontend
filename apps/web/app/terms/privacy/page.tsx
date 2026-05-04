import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

import { getTerm } from '@/entities/user/api/server';
import { TermsPage } from '@/views/terms';

export const metadata = { title: '개인정보 처리방침' };

export default async function Page() {
  const window = new JSDOM('').window;
  const purify = DOMPurify(window);

  const term = await getTerm('privacy').then((html) => purify.sanitize(html));
  return <TermsPage title="개인정보 처리방침" content={term} />;
}
