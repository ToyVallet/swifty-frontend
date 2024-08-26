import { Home } from '@components';
import { Suspense } from 'react';
import PulseLoader from 'react-spinners/PulseLoader';

export default async function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex justify-center items-center">
          <PulseLoader />
        </div>
      }
    >
      <Home />
    </Suspense>
  );
}
