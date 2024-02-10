import Page from "./components/Page";
import { StoreProvider } from "./store/store";

function App() {
  return (
    <StoreProvider>
      <Page />
    </StoreProvider>
  );
}

export default App;
