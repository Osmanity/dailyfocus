import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Sidebar from "./components/Sidebar.jsx";
import Overview from "./pages/Overview/Overview.jsx";
import Todos from "./pages/Todos/Todos.jsx";
import Habits from "./pages/Habits/Habits.jsx";
import Events from "./pages/Events/Events.jsx";
import { Signup } from "./pages/auth/SignUp/Signup.jsx";
import { Signin } from "./pages/auth/SignIn/Signin.jsx";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "../context/userContext";
import TaskDetails from "./components/Todos/Taskdetail/Taskdetail.jsx";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <Toaster position="bottom-right" toastOptions={{ duration: 5000 }} />
        <div className="layout">
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/todos" element={<Todos />} />
              <Route
                path="/todos/:category/:taskIndex"
                element={<TaskDetails />}
              />
              <Route path="/habits" element={<Habits />} />
              <Route path="/events" element={<Events />} />
            </Routes>
          </div>
        </div>
      </UserContextProvider>
    </BrowserRouter>
  </StrictMode>
);
