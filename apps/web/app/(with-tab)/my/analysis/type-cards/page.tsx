import type { Metadata } from 'next';

import { TypeCardsPage } from '@/views/my-analysis-type-cards';

export const metadata: Metadata = { title: '나의 유형 카드' };

export default function Page() {
  return <TypeCardsPage />;
}
