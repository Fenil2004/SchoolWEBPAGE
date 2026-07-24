import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/jpeg" href="/images/logo.jpg" />
        <link rel="shortcut icon" type="image/jpeg" href="/images/logo.jpg" />
        <link rel="apple-touch-icon" href="/images/logo.jpg" />
        <meta name="theme-color" content="#0082AD" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
