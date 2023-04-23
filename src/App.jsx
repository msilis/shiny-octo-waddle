import "./App.css";
import React, { useEffect, useState, lazy, Suspense } from "react";
import { Header, Navbar, Footer, Profile, AddGame, Vote } from "./Components";
import { Routes, Route, useLocation } from "react-router-dom";
//Lazy load components
const Home = lazy(() => import("./Components/Home/home.jsx"));
const About = lazy(() => import("./Components/About/about.jsx"));
const Login = lazy(() => import("./Components/Login/login.jsx"));
const Register = lazy(() => import("./Components/Register/register.jsx"));
const Dashboard = lazy(() => import("./Components/Dashboard/dashboard.jsx"));
const Protected = lazy(() => import("./Components/Protected/protected.jsx"));
//For router

function App() {
  const location = useLocation();
  //State for user login

  const [loggedIn, setLoggedIn] = useState(false);
  //State for user's name
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  //Profile state
  const [seeProfile, setSeeProfile] = useState(false);

  //Main display
  const [mainDisplay, setMainDisplay] = useState("dashboard");
  //JWT Token

  const suspenseLoading = (
    <div className="loadingMessage">
      <h3 className="loadingText">Loading...</h3>
    </div>
  );

  //Check sessionStorage to see if user is logged in
  useEffect(() => {
    if (sessionStorage.getItem("loggedIn")) {
      setLoggedIn(true);
      let parsedUserInfo = JSON.parse(sessionStorage.user);
      setFirstName(parsedUserInfo.firstName);
      setLastName(parsedUserInfo.lastName);
      setEmail(parsedUserInfo.email);
      setUserId(parsedUserInfo.userId);
    }
  }, []);

  //Routes

  function PageRoutes() {
    return (
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
              setUsername={setUsername}
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
                username={username}
                mainDisplay={mainDisplay}
                setMainDisplay={setMainDisplay}
              />
            </Protected>
          }
        ></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="*"
          element={
            <h3 className="errorMessage">404: There is nothing to see here!</h3>
          }
        ></Route>
      </Routes>
    );
  }

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
          setMainDisplay={setMainDisplay}
        />
      </div>

      <div className="routesContainer">
        <Suspense fallback={suspenseLoading}>
          <PageRoutes />
        </Suspense>
      </div>

      <Footer />
    </div>
  );
}

export default App;
