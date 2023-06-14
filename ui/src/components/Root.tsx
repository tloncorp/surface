import { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { InteractionContextProvider } from './InteractionContext';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import WidgetGrid from './WidgetSurface/WidgetGrid';
import bootstrap from '@/state/bootstrap';
import { setQueryParam } from '@/util';
import { useActiveTab } from '@/state/tabs';
import { Main } from './Main';

const AppRoutes = () => {
  const activeTab = useActiveTab();
  // Persist active tab to query param when it changes
  useEffect(() => {
    setQueryParam("tab", activeTab);
  }, [activeTab]);
  
  return (
    <Switch>
      <Route path="/dash" component={WidgetGrid} />
      <Route path={'/'} component={Main} />
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
