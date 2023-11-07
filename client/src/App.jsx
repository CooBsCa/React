import { EthProvider } from "./contexts/EthContext";
import Label from "./components/Label.jsx";

function App() {
  return (
    <EthProvider>
      <div id="App">
        <Label />
      </div>
    </EthProvider>
  );
}

export default App;
