const { withModuleFederation, MergeRuntime } = require("@module-federation/nextjs-mf");
const path = require("path");
const webpack = require('webpack');

module.exports = {
  future: {
    webpack5: true,
  },
  webpack: (config, options) => {
    const { buildId, dev, isServer, defaultLoaders, webpack } = options;
    const mfConf = {
      // mergeRuntime: true, //this is experimental,  read below
      name: "next2",
      library: { type: config.output.libraryTarget, name: "host" },
      filename: "static/runtime/remoteEntry.js",
      remotes: {
        // // For SSR, resolve to disk path (or you can use code streaming if you have access)
        app1: isServer
          ? path.resolve(
              __dirname,
              "../app1/build/remoteApp1Entry.js"
            )
          : "app1", // for client, treat it as a global
      },
      exposes: {
        // "./nav": "./components/nav",
      },
      shared: [],
    };
    // Configures ModuleFederation and other Webpack properties
    withModuleFederation(config, options, mfConf);


    if (!isServer) {
      config.output.publicPath = 'http://localhost:3000/_next';
    }

    config.plugins.push(new MergeRuntime());
    config.plugins.push( new webpack.ProvidePlugin({
      "react": "react",
      "React": "react",
   }))

    return config;
  }
}