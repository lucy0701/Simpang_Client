import '../styles/_globals.scss';
import { Noto_Sans_KR } from 'next/font/google';

import type { Metadata } from 'next';

import ReactQueryProviders from '@/components/ReactQueryProviders';
import Footer from '@/containers/layout/Footer';
import Header from '@/containers/layout/Header';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
  icons: {
    icon: '/favicon.ico',
  },
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
    <html lang="en">
      <head>
        <script
          async
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.js"
          integrity="sha384-4isBVZ02Sicjf8XHbphmDqKPF9IdtDHzQm7IdcIhsBHx14UU9s4FrOKdDrjDCm9M"
          crossOrigin="anonymous"
        />
      </head>
      <body className={notoSansKr.className}>
        <ReactQueryProviders>
          <div className="mediaquery_wrap">
            <Header />
            <div id="modal-root" />
            <div className="content_wrap">{children}</div>
            <Footer />
          </div>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
