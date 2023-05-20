import { AppProps } from 'next/app'
import Script from 'next/script'
import '../styles/tailwind.css'
import '../styles/github-markdown.css'
import '../styles/index.css'

import Layout from '@/layout'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          href="/favicon/favicon.ico"
          rel="icon"
          sizes="16x16"
          type="image/png"
        ></link>
        <meta
          name="google-site-verification"
          content="gbcmtOy1jGMqGfsCVG7j8aenAp_gydeXbbu8n0Iy0zQ"
        />
      </Head>
      {!process.env._DEV_ && (
        <>
          <Script id="gtm">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MNH8X63');`}</Script>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-N5TSDQT5MX"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-N5TSDQT5MX');`}
          </Script>
        </>
      )}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
