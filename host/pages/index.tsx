import dynamic from "next/dynamic";

// workaround for error when basically we use ssr (server side rendering) or ReactDOMServer,
const DynamicComponentWithNoSSR = dynamic(() => import("../components/home"), {
  ssr: false,
});
const IndexPage = () => <DynamicComponentWithNoSSR />

export default IndexPage;