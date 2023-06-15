import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { InteractionContextProvider } from './InteractionContext';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import bootstrap from '@/state/bootstrap';
import { setQueryParam } from '@/logic/utils';
import { useActiveSurface } from '@/state/surface';
import { Main } from './Main';
import { TooltipProvider } from '@radix-ui/react-tooltip';

const AppRoutes = () => {
  const activeSurface = useActiveSurface();
  // Persist active tab to query param when it changes
  useEffect(() => {
    setQueryParam("surface", activeSurface);
  }, [activeSurface]);


  return (
    <Routes>
      <Route path={'/'} element={<Main />} />
    </Routes>
  );
};

function Root() {
  const base = '/apps/surface';

  useEffect(() => {
    bootstrap();
  }, []);

  return (
    <BrowserRouter basename={base}>
      <InteractionContextProvider>
        <TooltipProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <AppRoutes />
        </TooltipProvider>
      </InteractionContextProvider>
    </BrowserRouter>
  );
}

export default Root;
