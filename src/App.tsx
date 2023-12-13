import WineList from "./components/WineList";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WineList />
    </QueryClientProvider>
  );
}

export default App;
