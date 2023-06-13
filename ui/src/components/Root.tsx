import { InteractionContextProvider } from '@/components/InteractionContext';
import TabbedSurface from '@/components/TabbedSurface';
import bootstrap from '@/state/bootstrap';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect } from 'react';

function Root() {
  useEffect(() => {
    bootstrap();
  }, []);

  return (
    <InteractionContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <TabbedSurface />
    </InteractionContextProvider>
  );
}

export default Root;
