import { it, vi, expect, describe } from "vitest";

describe("Login", () => {
  it("should return 401 error if empty fields are sent to server", async () => {
    const loginData = {
      userName: "",
      password: "",
    };

    const loginResponse = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(loginData),
      mode: "cors",
    }).then((response) => {
      expect(response.status).toBe(401);
    });
  });
  it("should save 'loggedIn' value to sessionStorage", async ()=> {
    const loginData = {
        userName: "username",
        password: "pass"
    };
    const correctLoginResponse = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(loginData),
        mode: "cors"
    }).then((response)=>{
        if(response.status === 200){
            sessionStorage.setItem("loggedIn", true)
        }
        const storage = sessionStorage.getItem("loggedIn")
        expect(storage).toBeTruthy();
    })
    
  })
});
