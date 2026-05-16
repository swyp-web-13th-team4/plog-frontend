import type { Metadata } from 'next';

import { SettingsPage } from '@/views/my-settings';

export const metadata: Metadata = { title: '설정' };

export default function Page() {
  return <SettingsPage />;
}
