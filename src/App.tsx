import "./App.scss";
import WineList from "./WineList";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <WineList />
      </div>
    </QueryClientProvider>
  );
}

export default App;
