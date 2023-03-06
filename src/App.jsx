import "./App.css";
import Header from "./Components/Header/header";
import Navbar from "./Components/Navbar/navbar";
import Home from "./Components/Home/home";
import About from "./Components/About/about";
import Register from "./Components/Register/register";
import Login from "./Components/Login/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";


function App() {
//State for user login

const [userLogin, setuserLogin] = useState(false);

  return (
    <div className="App">
      <Header />
      <Navbar userLogin={userLogin} setuserLogin={setuserLogin}/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
