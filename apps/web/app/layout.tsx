import '../styles/_globals.scss';
import { Noto_Sans_KR } from 'next/font/google';

import type { Metadata } from 'next';

import ReactQueryProviders from '@/components/ReactQueryProviders';
import Footer from '@/containers/layout/Footer';
import Header from '@/containers/layout/Header';

export const metadata: Metadata = {
  metadataBase: new URL('https://simpang.kr'),
  title: '심팡',
  description: '심심할땐 심팡! 심리테스트, MBTI, 다양하게 즐겨봐!',
  icons: {
    icon: '/favicon.ico',
  },
  keywords: [
    '심리테스트',
    'MBTI',
    '무료 심리테스트',
    '무료 MBTI',
    '연애',
    '짝사랑',
    '심심해',
    '뭐하지',
    'simpang',
    '심팡',
    '궁합',
    '무료 심테',
  ],
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
