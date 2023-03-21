import "./App.css";
import {
  Header,
  Navbar,
  Home,
  About,
  Login,
  Register,
  Dashboard,
  Footer,
  Protected,
  AddGame,
} from "./Components";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  //State for user login
  //TODO Check localStorage for logged-in state and set appropriately
  const [loggedIn, setLoggedIn] = useState(false);
  //State for user's name
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  //Profile state
  const [seeProfile, setSeeProfile] = useState(false);

  //Check sessionStorage to see if user is logged in
  useEffect(()=>{
    if(sessionStorage.getItem("loggedIn")){
      console.log("checking sessionStorage")
      setLoggedIn(true);
    }
  }, [])
 

  return (
    <div className="App">
      <div className="headerContainer">
        <Header />
      </div>
      <div className="navbarContainer">
        <Navbar
          setLoggedIn={setLoggedIn}
          loggedIn={loggedIn}
          seeProfile={seeProfile}
          setSeeProfile={setSeeProfile}
        />
      </div>

      <div className="routesContainer">
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
              <Protected loggedIn={loggedIn}>
              <Dashboard
                setLoggedIn={setLoggedIn}
                loggedIn={loggedIn}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                email={email}
                setEmail={setEmail}
                seeProfile={seeProfile}
                setSeeProfile={setSeeProfile}
                userId={userId}
              />
              </Protected>
            }
          ></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="*"
            element={
              <h3 className="errorMessage">
                404: There is nothing to see here!
              </h3>
            }
          ></Route>
        </Routes>
      </div>
      
        <Footer />
      
    </div>
  );
}

export default App;
