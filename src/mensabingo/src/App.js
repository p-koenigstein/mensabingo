import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BingoFieldDisplayer from "./bingoField/BingoFieldDisplayer";
import PromptWindow from "./promptWindow/PromptWindow";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BingoFieldDisplayer />} />
        <Route path="input" element={<PromptWindow />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
