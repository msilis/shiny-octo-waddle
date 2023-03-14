import "./App.css";
import {
  Header,
  Navbar,
  Home,
  About,
  Login,
  Register,
  Dashboard,
  Footer
} from "./Components";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  //State for user login
  const [loggedIn, setLoggedIn] = useState(false);
  console.log(`User is logged in: ${loggedIn}`);
  //State for user's name
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("")
  //Profile state
  const [seeProfile, setSeeProfile] = useState(false);

  return (
    <div className="App">
      <Header />

      <Navbar
        setLoggedIn={setLoggedIn}
        loggedIn={loggedIn}
        seeProfile={seeProfile}
        setSeeProfile={setSeeProfile}
      />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route
          path="/login"
          element={
            <Login
              setLoggedIn={setLoggedIn}
              loggedIn={loggedIn}
              setFirstName={setFirstName}
              setLastName={setLastName}
              setEmail={setEmail}
              setUserId={setUserId}
            />
          }
        ></Route>
        <Route
          path="/dashboard"
          element={
            <Dashboard
              setLoggedIn={setLoggedIn}
              loggedIn={loggedIn}
              firstName={firstName}
              lastName={lastName}
              email={email}
              seeProfile={seeProfile}
              setSeeProfile={setSeeProfile}
              userId={userId}
            />
          }
        ></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
