import './globals.css';

import { type ReactNode } from 'react';

import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';

import { BadgeNotification } from '@/features/badge-notification';

import Providers from '@/shared/ui/Providers';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
  weight: '45 920',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  colorScheme: 'light',
};

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'https://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: '플로그',
    template: '%s | 플로그',
  },
  description: '나를 잘 이해하고, 더 깊이 몰입할 수 있도록',
  openGraph: {
    type: 'website',
    siteName: '플로그',
    title: '플로그',
    description: '나를 잘 이해하고, 더 깊이 몰입할 수 있도록',
    locale: 'ko_KR',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: '플로그' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '플로그',
    description: '나를 잘 이해하고, 더 깊이 몰입할 수 있도록',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body>
        <Providers>
          <main className="mx-auto min-h-dvh w-full max-w-layout shadow-[0px_0px_12px_0px_rgba(0,0,0,0.08)]">
            {children}
          </main>
          <BadgeNotification />
        </Providers>
      </body>
    </html>
  );
}
