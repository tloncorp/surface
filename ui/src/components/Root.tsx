import { useMemo } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { InteractionContextProvider } from "./InteractionContext";
import TabbedSurface from "./TabbedSurface";

function App() {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <InteractionContextProvider>
      <QueryClientProvider client={queryClient}>
        <TabbedSurface />
      </QueryClientProvider>
    </InteractionContextProvider>
  );
}

export default App;
