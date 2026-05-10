import './globals.css';

import { type ReactNode } from 'react';

import type { Metadata, Viewport } from 'next';

import Providers from '@/shared/ui/Providers';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  colorScheme: 'light',
};

export const metadata: Metadata = {
  title: '플로그',
  description: '나를 잘 이해하고, 더 깊이 몰입할 수 있도록',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    title: '플로그',
    description: '나를 잘 이해하고, 더 깊이 몰입할 수 있도록',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '플로그',
      },
    ],
  },
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
          <main className="mx-auto min-h-dvh w-full max-w-layout shadow-[0px_0px_12px_0px_rgba(0,0,0,0.08)]">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
