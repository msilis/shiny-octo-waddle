import "./App.css";
import { Header, Navbar, Home, About, Login, Register, Dashboard } from "./Components";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  //State for user login
  const [loggedIn, setLoggedIn] = useState(false);
  console.log(`User is logged in: ${loggedIn}`);

  return (
    <div className="App">
      <Header />

      <Navbar setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route
          path="/login"
          element={<Login setLoggedIn={setLoggedIn} loggedIn={loggedIn} />}
        ></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </div>
  );
}

export default App;
