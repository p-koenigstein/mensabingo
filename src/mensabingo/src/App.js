import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PromptWindow from "./promptWindow/PromptWindow";
import "bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "./LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="input" element={<PromptWindow />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
