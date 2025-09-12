import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/components/ThemeProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Heejun Seo - Senior Frontend Developer',
    template: '%s | Heejun Seo',
  },
  description:
    'Senior Frontend Developer specializing in React, TypeScript, Next.js, and modern web technologies. Building exceptional digital experiences with a focus on accessibility and performance.',
  keywords: ['frontend developer', 'react developer', 'typescript', 'next.js', 'web developer', 'javascript', 'UI/UX', 'accessibility'],
  authors: [{ name: 'Heejun Seo', url: 'https://heejunseo.dev' }],
  creator: 'Heejun Seo',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://heejunseo.dev',
    title: 'Heejun Seo - Senior Frontend Developer',
    description: 'Senior Frontend Developer specializing in React, TypeScript, Next.js, and modern web technologies.',
    siteName: 'Heejun Seo Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Heejun Seo - Senior Frontend Developer',
    description: 'Senior Frontend Developer specializing in React, TypeScript, Next.js, and modern web technologies.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#3b82f6' />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange={false}>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
