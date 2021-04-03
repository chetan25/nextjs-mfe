import '../styles/globals.css'
import Layout from '../components/layout';

function MyApp({ Component, pageProps }) {
  return <Layout title="Home | Next.js + TypeScript Example">
  <Component {...pageProps} />
  </Layout>
}

export default MyApp
