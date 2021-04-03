import React, {lazy, Suspense} from 'react';
import ReactDOM from "react-dom";

// work around done to have React and ReactDOm on global scope
window.react = React;
window.React = React;
window.reactDOM = ReactDOM;
window.ReactDOM = ReactDOM;
const MyApp = lazy(() => import("app1/MyApp"));

const About = () => {
   return (
    <Suspense  fallback="Loading Todo">
    <div>
        <MyApp />
    </div>
    </Suspense>
   )
}

export default About;