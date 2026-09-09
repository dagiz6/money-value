import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'MoneyValue — Inflation & Purchasing Power Calculator',
  description:
    'Calculate how the purchasing power of ETB and USD has changed over time using historical CPI data.',
  keywords: [
    'inflation calculator',
    'purchasing power calculator',
    'Ethiopian Birr inflation',
    'ETB CPI',
    'US Dollar inflation',
    'USD CPI',
    'historical money value',
  ],
  authors: [{ name: 'MoneyValue' }],
  openGraph: {
    title: 'MoneyValue — Inflation & Purchasing Power Calculator',
    description:
      'Calculate how the purchasing power of ETB and USD has changed over time using authoritative CPI data.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#090d10' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans selection:bg-teal-700 selection:text-white">
        {children}
      </body>
    </html>
  );
}
