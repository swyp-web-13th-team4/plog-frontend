import './globals.css';

import { type ReactNode } from 'react';

import type { Metadata } from 'next';

import BottomTab from '@/shared/ui/BottomTab';
import Providers from '@/shared/ui/Providers';

export const metadata: Metadata = {
  title: 'plog',
  description: 'plog',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <main className="mx-auto min-h-dvh w-full max-w-layout pb-bottom-tab shadow-[0px_0px_12px_0px_rgba(0,0,0,0.08)]">
            {children}
          </main>
          <BottomTab />
        </Providers>
      </body>
    </html>
  );
}
