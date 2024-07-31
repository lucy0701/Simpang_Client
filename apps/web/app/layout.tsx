import '../styles/_globals.scss';
import { Noto_Sans_KR } from 'next/font/google';
import Script from 'next/script';

import { METADATA } from '@/constants';
import type { Metadata } from 'next';

import ReactQueryProviders from '@/components/ReactQueryProviders';
import Footer from '@/containers/layout/Footer';
import Header from '@/containers/layout/Header';

const { title, description, imageUrl, url } = METADATA;

export const metadata: Metadata = {
  metadataBase: url,
  title,
  description,
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
  openGraph: {
    description,
    type: 'website',
    title,
    url,
    images: [
      {
        url: imageUrl,
        alt: 'og_image',
      },
    ],
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
        <Script strategy="afterInteractive" id="gtm-script">
          {`
            (function(w, d, s, l, i) {
              w[l] = w[l] || [];
              w[l].push({'gtm.start':
                new Date().getTime(), event: 'gtm.js'});
              var f = d.getElementsByTagName(s)[0],
                  j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
              j.async = true;
              j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
              f.parentNode.insertBefore(j, f);
            })(window, document, 'script', 'dataLayer', 'GTM-WCT3PX2H');
          `}
        </Script>
        <meta
          name="google-site-verification"
          content="HFApnmNt0MJobDHpjw9go06M0GkuMMZFG4fXvljTkQs"
        />
        <meta name="naver-site-verification" content="d247534d9de576f74edc6b0b3eabf55b3350835c" />
        <script
          async
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.js"
          integrity="sha384-4isBVZ02Sicjf8XHbphmDqKPF9IdtDHzQm7IdcIhsBHx14UU9s4FrOKdDrjDCm9M"
          crossOrigin="anonymous"
        />
      </head>
      <body className={notoSansKr.className}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WCT3PX2H"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
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
