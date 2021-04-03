# Micro Frontend Apps implementation with Next Js

## What this repository has

- App Shell `host` that is a Next JS app and uses Webpack 5 and module federation.
- Micro Fe App `app1` that is a simple React app and has it's own internal routing.

## Dev workflow

### Fire up the Host App
- Run `npm install` to install all dependencies.
- Run `npm run dev` to start the app.

### Fire up the Micro App
- Run `npm install` to install all dependencies.
- Run `npm run server` to build the app and serve at port 6050

## Internals

### Host App
- It's bootstrapped with NextJs and uses `@module-federation/nextjs-mf` to configure module federation.
- Consumes `aap1` and renders it under the `/about` route.
- Uses dynamic routing and had to render the `app1` under the `index` as well as the `slug` route, since `slug` don't handle the root route `/about`.
  
### Micro App1 
- Is bootstrapped with simple React and uses Webpack Module federation plugin, to expose the app.
- It has it's own internal routing, which handles, all routes from '/about'.

