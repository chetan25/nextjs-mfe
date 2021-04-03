import React  from 'react';
import dynamic from "next/dynamic";
// workaround for error when basically we use ssr (server side rendering) or ReactDOMServer,
const DynamicComponentWithNoSSR = dynamic(() => import("../../components/about"), {
    ssr: false,
  });

import ErrorBoundary from  '../../components/error-boundary';

const AboutIndexPage = () => <ErrorBoundary><DynamicComponentWithNoSSR /></ErrorBoundary>


export default AboutIndexPage;