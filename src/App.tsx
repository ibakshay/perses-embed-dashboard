import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  const [selected, setSelected] = useState("Dashboard");

  return (
    <div>
      <Sidebar onSelect={setSelected} />
      <div className="main-content">
        {selected === "Dashboard" && <Dashboard />}
      </div>
    </div>
  );
}

export default App;
