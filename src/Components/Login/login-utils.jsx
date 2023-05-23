const handleLoginSubmit = (
  setFirstName,
  setLastName,
  setEmail,
  loggedIn,
  setLoggedIn,
  setUserId,
  setUsername,
  loginUsername,
  loginPassword
) => {
  const loginData = {
    userName: loginUsername.current?.value,
    password: loginPassword.current?.value,
  };

  if (sessionStorage.getItem("loggedIn") === null) {
    try {
      fetch("http://localhost:8080/login", {
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
            alert("Incorrect Username or Password!");
            throw new Error("Incorrect username or password.");
          } else {
            return response.json();
          }
        })
        .then((data) => {
          setLoggedIn(true);
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setEmail(data.email);
          setUserId(data.userId);
          setUsername(data.username);
          sessionStorage.setItem("loggedIn", true);
          const userInfo = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            username: data.username,
            userId: data.userId,
          };
          sessionStorage.setItem("user", JSON.stringify(userInfo));
        });
      loginUsername.current.value = "";
      loginPassword.current.value = "";
    } catch (err) {
      console.log(err);
    }
  } else {
    loginUsername.current.value = "";
    loginPassword.current.value = "";
  }
};

export { handleLoginSubmit };
