import { useMemo } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import WidgetGrid from "./WidgetGrid";
import { IFrameContent } from "./widgets/IFrameContent";
import { WidgetConfig } from "./widgets/Widget";

function App() {
  const queryClient = useMemo(() => new QueryClient(), []);
  const params = new URLSearchParams(window.location.search);
  const { page, ...config } = Object.fromEntries(params);

  if (page === "widget") {
    return (
      <QueryClientProvider client={queryClient}>
        <IFrameContent config={config as WidgetConfig} />
      </QueryClientProvider>
    );
  } else {
    return (
      <QueryClientProvider client={queryClient}>
        <WidgetGrid />
      </QueryClientProvider>
    );
  }
}

export default App;
