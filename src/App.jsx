import "./App.css";
import React, { useEffect, useState, lazy, Suspense } from "react";
import { Header, Navbar, Footer } from "./Components";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "./userContext";
import { ERROR_MESSAGE, PAGE_TEXT } from "./Utilities/Config/ui-text";
import { PAGE_NAVIGATION, ROUTE_PATHS } from "./Utilities/Config/navigation";
import { STORAGE_OPTIONS } from "./Utilities/Config/storage";
//Lazy load components
const Home = lazy(() => import("./Components/Home/home.jsx"));
const About = lazy(() => import("./Components/About/about.jsx"));
const Login = lazy(() => import("./Components/Login/login.jsx"));
const Register = lazy(() => import("./Components/Register/register.jsx"));
const Dashboard = lazy(() => import("./Components/Dashboard/dashboard.jsx"));
const Protected = lazy(() => import("./Components/Protected/protected.jsx"));
//For router

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [googleName, setGoogleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [seeProfile, setSeeProfile] = useState(false);
  const [mainDisplay, setMainDisplay] = useState(PAGE_NAVIGATION.dashboard);
  const [displayName, setDisplayName] = useState("");

  const suspenseLoading = (
    <div className="loadingMessage">
      <h3 className="loadingText">{PAGE_TEXT.loadingText}</h3>
    </div>
  );
  const checkGoogleLoggedIn = () =>
    sessionStorage.getItem(STORAGE_OPTIONS.googleLogin);

  const contextProps = {
    userId,
    setUserId,
    setEmail,
    setLoggedIn,
    checkGoogleLoggedIn,
    displayName,
    setDisplayName,
  };

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_OPTIONS.loggedIn)) {
      setLoggedIn(true);
      let parsedUserInfo = JSON.parse(sessionStorage.user);
      setFirstName(parsedUserInfo.firstName);
      setLastName(parsedUserInfo.lastName);
      setEmail(parsedUserInfo.email);
      setUsername(parsedUserInfo.username);
      setUserId(parsedUserInfo.userId);
    }
    if (sessionStorage.getItem(STORAGE_OPTIONS.googleLogin)) {
      setLoggedIn(true);
      setEmail(sessionStorage.getItem(STORAGE_OPTIONS.googleLoginEmail));
      setGoogleName(sessionStorage.getItem(STORAGE_OPTIONS.googleLoginName));
    }
  }, []);

  function PageRoutes() {
    return (
      <Routes>
        <Route path={ROUTE_PATHS.home} element={<Home />}></Route>
        <Route path={ROUTE_PATHS.about} element={<About />}></Route>
        <Route
          path={ROUTE_PATHS.login}
          element={
            <Login
              setLoggedIn={setLoggedIn}
              loggedIn={loggedIn}
              setFirstName={setFirstName}
              setLastName={setLastName}
              setEmail={setEmail}
              setUserId={setUserId}
              setUsername={setUsername}
              setGoogleName={setGoogleName}
              displayName={displayName}
              setDisplayName={setDisplayName}
            />
          }
        ></Route>
        <Route
          path={ROUTE_PATHS.dashboard}
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
                googleName={googleName}
                displayName={displayName}
                setDisplayName={setDisplayName}
              />
            </Protected>
          }
        ></Route>
        <Route path={ROUTE_PATHS.register} element={<Register />}></Route>
        <Route
          path={ROUTE_PATHS.fallback}
          element={
            <h3 className="errorMessage">{ERROR_MESSAGE.four_oh_four}</h3>
          }
        ></Route>
      </Routes>
    );
  }

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <UserContext.Provider value={contextProps}>
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
          <ToastContainer />
          <div className="routesContainer">
            <Suspense fallback={suspenseLoading}>
              <PageRoutes />
            </Suspense>
          </div>
          <Footer />
        </div>
      </UserContext.Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
