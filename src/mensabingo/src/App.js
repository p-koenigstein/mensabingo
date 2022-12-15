import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BingoField from "./bingoField/BingoField";
import PromptWindow from "./promptWindow/PromptWindow";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BingoField />} />
        <Route path="input" element={<PromptWindow />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
