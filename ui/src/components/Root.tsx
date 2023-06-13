import { useMemo } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { InteractionContextProvider } from "./InteractionContext";
import TabbedSurface from "./TabbedSurface";
import WidgetGrid from "./WidgetSurface/WidgetGrid";

const AppRoutes = () => {
  return (
    <Switch>
      <Route path="/dash" component={WidgetGrid} />
      <Route path={"/"} component={TabbedSurface} />
    </Switch>
  );
};

function Root() {
  const queryClient = useMemo(() => new QueryClient(), []);
  const base = "/apps/surface";

  return (
    <BrowserRouter basename={base}>
      <InteractionContextProvider>
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
        </QueryClientProvider>
      </InteractionContextProvider>
    </BrowserRouter>
  );
}

export default Root;
