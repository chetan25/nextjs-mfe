// // @ts-ignore
// import bootstrap from "./bootstrap";
// // eslint-disable-next-line @typescript-eslint/no-empty-function
// bootstrap(() => {});
import React from "react";
import ReactDOM from "react-dom";
import MyApp from './my-app';
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
    <MyApp />,
    document.getElementById("root")
)

