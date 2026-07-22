import '@/styles/globals.css'
import Layout from '@/layout'
import { LanguageProvider } from '@/context/LanguageContext'

export default function App({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LanguageProvider>
  )
}

