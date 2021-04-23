import React, { lazy, Suspense } from 'react';

const loadable = (importFunc: any, { fallback = null }: { fallback: any }) => {
  const LazyComponent = lazy(importFunc);

  const loadableFunc = (props: any) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  )

  return loadableFunc
}

export default loadable
