import React, { Suspense } from 'react';

const HomePage = () => (
  <Suspense  fallback="Loading Todo">
        <h1>Hello Next.js Home 👋</h1>
   </Suspense>
  
)

export default HomePage