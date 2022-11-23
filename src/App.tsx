import { Users } from "./pages/Users";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import User from "./pages/User";
import Tasks from "./pages/Tasks";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </div>
  );
}

export default App;
