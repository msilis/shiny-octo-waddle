import { it, vi, expect, describe } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../Components/Login/login";
import { MemoryRouter } from "react-router";

describe("Login", () => {
  it("should return 401 error if empty fields are sent to server", async () => {
    const loginData = {
      userName: "",
      password: "",
    };

    const loginResponse = await fetch(
      "https://group-class-backend.onrender.com/login",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginData),
        mode: "cors",
      }
    ).then((response) => {
      expect(response.status).toBe(401);
    });
  });
  it("should save 'loggedIn' value to sessionStorage", async () => {
    const loginData = {
      userName: "username",
      password: "pass",
    };
    const correctLoginResponse = await fetch(
      "https://group-class-backend.onrender.com/login",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginData),
        mode: "cors",
      }
    ).then((response) => {
      if (response.status === 200) {
        sessionStorage.setItem(STORAGE.loggedIn, true);
      }
      const storage = sessionStorage.getItem(STORAGE.loggedIn);
      expect(storage).toBeTruthy();
    });
  });
});

describe("handleLogout", () => {
  it("should set sessionStorage loggedIn value to 'false'", () => {
    const setLoggedIn = vi.fn();
    render(
      <MemoryRouter>
        <Login
          setFirstName={() => {}}
          setLastName={() => {}}
          setEmail={() => {}}
          loggedIn={true}
          setLoggedIn={setLoggedIn}
          setUserId={() => {}}
          setUsername={() => {}}
        />
      </MemoryRouter>
    );

    const logoutButton = screen.getByText("Log out");
    fireEvent.click(logoutButton);
    expect(setLoggedIn).toBeCalledWith(false);
  });
});
