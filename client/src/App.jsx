import { Route, Routes } from "react-router";

// pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

// components
import Nav from "./components/Nav";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const {user} = useAuth();
  console.log(user)

  return (
    <>
    <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={user ? <Profile /> : <Login />} />
      </Routes>
    </>
  )
};

export default App;