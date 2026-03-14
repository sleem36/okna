import './globals.css';
import { Montserrat } from 'next/font/google';
import Script from 'next/script';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Preloader from '../components/Preloader';
import ThemeScripts from '../components/ThemeScripts';
import ScrollToTop from '../components/ScrollToTop';
import OrderFormPopup from '../components/OrderFormPopup';
import data from '../lib/data';
import site from '../lib/site';

const montserrat = Montserrat({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const metadata = {
  title: {
    default: 'Мягкие окна Стиль',
    template: '%s | Мягкие окна Стиль',
  },
  description: 'Мягкие окна от производителя',
  icons: {
    icon: '/theme/img/favicon.svg',
  },
  openGraph: {
    locale: 'ru_RU',
    siteName: 'Мягкие окна Стиль',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({ children }) {
  const menus = data.getMenus();
  const siteConfig = site.getSiteConfig();
  return (
    <html lang="ru" className={montserrat.variable}>
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          id="gtag-base"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-6CZSLQNBXX');
            `,
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6CZSLQNBXX"
          strategy="beforeInteractive"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="yandex-verification" content="0775512b50f30523" />
        <link rel="stylesheet" href="/theme/libs/swiper/swiper.css" />
        <link rel="stylesheet" href="/theme/css/style.css" />
        {/* Envybox — виджет «Позвоним вам» (как на боевом сайте soft-windows header.php) */}
        <link rel="stylesheet" href="https://cdn.envybox.io/widget/cbk.css" />
      </head>
      <body className={montserrat.className}>
        <Script src="/theme/libs/swiper/swiper.js" strategy="beforeInteractive" />
        <Script
          src="https://cdn.envybox.io/widget/cbk.js?wcb_code=e2dff9d2e54f892a9c189603126be089"
          strategy="lazyOnload"
          charSet="UTF-8"
        />
        <Preloader />
        <Header menus={menus} site={siteConfig} />
        <main>{children}</main>
        <Footer menus={menus} site={siteConfig} />
        <ScrollToTop />
        <OrderFormPopup />
        <ThemeScripts />
      </body>
    </html>
  );
}
