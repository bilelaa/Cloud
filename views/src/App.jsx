import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthIndex from "./components/auth/AuthIndex";
import Menu from "./components/layouts/Menu";
import UserIndex from "./components/user/UserIndex";
import User from "./components/HOC/User";
import Home from "./components/home/Home";
import Public from "./components/HOC/Public";

function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/auth/*"
          element={
            <Public>
              <AuthIndex />
            </Public>
          }
        />
        <Route
          path="/user/*"
          element={
            <User>
              <UserIndex />
            </User>
          }
        />
      </Routes>
    </>
  );
}

export default App;
