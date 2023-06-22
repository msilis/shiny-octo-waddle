import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { showErrorToast } from "../../Utilities/toastError";

//TODO Remove custom hook from handleLoginSubmit
function useLoginSubmit() {
  //Bring in useNavigate for redirect
  const navigate = useNavigate();

  const handleLoginSubmit = (loginProps) => {
    loginProps.setLoginError(null);
    loginProps.setLoading(true);
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
            showErrorToast("Incorrect username or password.");
            loginProps.setLoading(false);
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
          loginProps.setLoading(false);
          return navigate("/dashboard");
        })
        .catch((err) => {
          console.log(err.message);

          if (err.message === "Failed to fetch")
            showErrorToast("There was a network error. You are not logged in.");
        });
      loginProps.loginUsername.current.value = "";
      loginProps.loginPassword.current.value = "";
    }
  };
  return handleLoginSubmit;
}

export { useLoginSubmit };
