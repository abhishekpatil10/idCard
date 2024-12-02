import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import GenerateId from "./Components/generateId";
import RemoveBg from "./Components/removeBg";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<RemoveBg />} />
          <Route path="/generate-id" element={<GenerateId />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
