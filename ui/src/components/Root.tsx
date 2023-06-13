import { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { InteractionContextProvider } from './InteractionContext';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import TabbedSurface from './TabbedSurface';
import WidgetGrid from './WidgetSurface/WidgetGrid';
import bootstrap from '@/state/bootstrap';

const AppRoutes = () => {
  return (
    <Switch>
      <Route path="/dash" component={WidgetGrid} />
      <Route path={'/'} component={TabbedSurface} />
    </Switch>
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
        <ReactQueryDevtools initialIsOpen={false} />
        <AppRoutes />
      </InteractionContextProvider>
    </BrowserRouter>
  );
}

export default Root;
