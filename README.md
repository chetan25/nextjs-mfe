---
title: Micro Frontend Apps implementation with N and ext Js and Webpack Module Federation Plugin.
excerpt: This is a App built with Next js as the container app and other React micro apps that gets injected into the container.
Tools: ['Next Js', 'React', 'Javascript', 'Webapck', 'Typescript']
---

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
- It exposes the main app which is then render in Host app.


### Data Flow
We have a common state which is hosted in Host app, that is shared across different micro apps. The micro apps can read and also write the state, but the logic to react to state change is in Host app.

#### Host App 
- Has a store that has User state and Host state.
- User state is a shared state between Host and micro Apps.
- Host uses Observables and an update function to share state.
- Observables is used to read state in micro apps and the update function is use to update state from micro apps.
- These two things are exposed to global window object from Host app, since I was unable to make the Next app work as bi-directional and expose them.

#### App1 
- It reads the state using Observable and keeps a local copy of it.
- Observables helps to keep the state in sync.
- It updates the state using the global exposed function.
  
> Only using Observables to listen to events and not pushing any changes to it from consuming apps.Only the Host app pushes changes to it in the Reducer action, so that all micro apps that are subscribing to it gets the update.
 
