import './globals.css';
import Script from 'next/script';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Preloader from '../components/Preloader';
import ThemeScripts from '../components/ThemeScripts';
import data from '../lib/data';
import site from '../lib/site';

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
    <html lang="ru">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="yandex-verification" content="0775512b50f30523" />
        <link rel="stylesheet" href="/theme/libs/swiper/swiper.css" />
        <link rel="stylesheet" href="/theme/css/style.css" />
      </head>
      <body>
        <Script src="/theme/libs/swiper/swiper.js" strategy="beforeInteractive" />
        <Preloader />
        <Header menus={menus} site={siteConfig} />
        <main>{children}</main>
        <Footer menus={menus} site={siteConfig} />
        <ThemeScripts />
      </body>
    </html>
  );
}
