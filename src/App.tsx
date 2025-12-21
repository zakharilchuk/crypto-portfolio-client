import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "./router.tsx";
import { RouterProvider } from "react-router-dom";
import { useDeviceSupport } from "./hooks/useDeviceSupport.ts";
import DeviceNotSupported from "./components/DeviceNotSupported.tsx";

const queryClient = new QueryClient();

function App() {
  const isDesktop = useDeviceSupport();

  if (!isDesktop) {
    return <DeviceNotSupported />;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
