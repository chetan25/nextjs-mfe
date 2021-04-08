import React, {FC} from 'react';
import {AppProps} from 'next/app';
import '../styles/globals.css'
import Layout from '../components/layout';
import {wrapper} from '../store/reducer';

//  Next.js provides generic getInitialProps when using class MyApp extends App
// which will be picked up by wrapper, so you must not extend App as you'll be opted out of 
// Automatic Static Optimization
const WrappedApp: FC<AppProps> = ({Component, pageProps}) => (
  <Layout title="Home | Next.js + TypeScript Example">
    <Component {...pageProps} />
  </Layout>
);

export default wrapper.withRedux(WrappedApp);
