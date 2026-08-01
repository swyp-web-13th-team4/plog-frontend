import type { Metadata } from 'next';

import { WithdrawPage } from '@/views/my-withdraw';

export const metadata: Metadata = { title: '회원 탈퇴' };

export default function Page() {
  return <WithdrawPage />;
}
