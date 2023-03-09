import "./App.css";
import { Header, Navbar, Home, About, Login, Register } from "./Components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  //State for user login

  

  return (
    <div className="App">
      <Header />
      <Navbar />
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
