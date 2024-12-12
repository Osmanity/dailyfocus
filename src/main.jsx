import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Sidebar from "./components/Sidebar.jsx";
import Overview from "./pages/Overview.jsx";
import Todos from "./pages/Todos/Todos.jsx";
import Habits from "./pages/Habits/Habits.jsx";
import Events from "./pages/Events/Events.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <div className="layout">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/todos" element={<Todos />} />
            <Route path="/habits" element={<Habits />} />
            <Route path="/events" element={<Events />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  </StrictMode>
);
