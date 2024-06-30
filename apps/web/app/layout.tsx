import '../styles/globals.scss';
import { Noto_Sans_KR } from 'next/font/google';

import type { Metadata } from 'next';

import Footer from '@/containers/Footer';
import Header from '@/containers/Header';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const notoSansKr = Noto_Sans_KR({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={notoSansKr.className}>
        <div className='mediaquery_wrap'>
          <Header />
          <div className='content_wrap'>{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
