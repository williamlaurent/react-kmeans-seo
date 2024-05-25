import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import Dataset from "./pages/dataset";
import Cluster from "./pages/cluster";
import Calculate from "./pages/calculate";
import NotFound from "./pages/404";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dataset" element={<Dataset />} />
        <Route path="/cluster" element={<Cluster />} />
        <Route path="/calculate" element={<Calculate />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
