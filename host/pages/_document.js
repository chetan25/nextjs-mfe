import Document, { Html, Head, Main, NextScript } from "next/document";
import { patchSharing } from "@module-federation/nextjs-mf";
import React from 'react';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
        console.log('window.innerHeight', window.innerHeight);
     
    }
}

  render() {
    return (
      <Html>
        {patchSharing()}
        {/* <script src="http://localhost:3000/_next/static/runtime/remoteEntry.js" /> */}
        {/* <script src="http://localhost:3000/_next/static/chunks/webpack.js" /> */}
        <script src="http://localhost:6050/remoteApp1Entry.js" />
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;