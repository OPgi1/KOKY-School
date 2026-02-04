import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KOKY School - تعلم الإنجليزية بسهولة',
  description: 'منصة تعليمية متكاملة لتعلم اللغة الإنجليزية للمستخدمين الناطقين بالعربية',
  keywords: ['English', 'Arabic', 'Learn', 'Education', 'KOKY School', 'English learning'],
  authors: [{ name: 'Sherlock' }],
  creator: 'Sherlock',
  publisher: 'KOKY School',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ar_AR',
    url: 'https://koky-school.vercel.app',
    title: 'KOKY School - تعلم الإنجليزية بسهولة',
    description: 'منصة تعليمية متكاملة لتعلم اللغة الإنجليزية للمستخدمين الناطقين بالعربية',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'KOKY School - English Learning Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KOKY School - تعلم الإنجليزية بسهولة',
    description: 'منصة تعليمية متكاملة لتعلم اللغة الإنجليزية للمستخدمين الناطقين بالعربية',
    images: ['/images/twitter-image.png'],
    creator: '@tx_5w',
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
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen">
            <Navigation />
            <main className="pt-16">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}