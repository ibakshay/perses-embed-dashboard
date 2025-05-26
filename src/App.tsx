import { useState } from "react";
import PersesDashboard from "./components/PersesDashboard";
import { Header } from "./components/Header";
import persesLogo from "./assets/perses.svg";
import "./App.css";
import { PersesPluginWrapper } from "./components/PersesPluginWrapper";

function PersesDashboardWrapper() {
  // You can add additional logic here if needed
  return <PersesDashboard />;
}

function App() {
  const [view, setView] = useState<"dashboard" | "panel">("dashboard");

  return (
    <>
      <Header logo={persesLogo} onNavigate={setView} />
      {view === "dashboard" && <PersesDashboardWrapper />}
      {view === "panel" && <PersesPluginWrapper />}
    </>
  );
}

export default App;
