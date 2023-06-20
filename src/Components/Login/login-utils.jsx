import { toast } from "react-toastify";
import { useNavigate } from "react-router";

//TODO Remove custom hook from handleLoginSubmit
function useLoginSubmit() {
  //Bring in useNavigate for redirect
  const navigate = useNavigate();

  const handleLoginSubmit = (loginProps) => {
    loginProps.setLoginError(null);
    const loginData = {
      userName: loginProps.loginUsername.current?.value,
      password: loginProps.loginPassword.current?.value,
    };
    if (sessionStorage.getItem("loggedIn") === null) {
      fetch("https://group-class-backend.onrender.com/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginData),
        mode: "cors",
      })
        .then((response) => {
          if (response.status === 401) {
            toast.error("Incorrect username or password.", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
              theme: "light",
            });
            throw new Error("Incorrect username or password.");
          } else if (!response.ok) {
            throw Error("Network error");
          } else {
            return response.json();
          }
        })
        .then((data) => {
          loginProps.setLoggedIn(true);
          loginProps.setFirstName(data.firstName);
          loginProps.setLastName(data.lastName);
          loginProps.setEmail(data.email);
          loginProps.setUserId(data.userId);
          loginProps.setUsername(data.username);
          sessionStorage.setItem("loggedIn", true);
          const userInfo = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            username: data.username,
            userId: data.userId,
          };
          sessionStorage.setItem("user", JSON.stringify(userInfo));
          //Redirect user after sucessful login
          return navigate("/dashboard");
        })
        .catch((err) => {
          console.log(err.message);

          if (err.message === "Failed to fetch")
            toast.error("There was a network error. You are not logged in.", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
              theme: "light",
            });
        });
      loginProps.loginUsername.current.value = "";
      loginProps.loginPassword.current.value = "";
    }
  };
  return handleLoginSubmit;
}

export { useLoginSubmit };
