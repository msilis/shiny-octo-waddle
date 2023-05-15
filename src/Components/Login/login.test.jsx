import { getByTestId, render, screen, fireEvent } from "@testing-library/react";
import { it, expect, vi} from 'vitest';
import Login from "./login";
import { MemoryRouter } from "react-router";



it("should show an alert when input fields are empty and HTTP response is 401", async () => {
  const {  getByTestId } = render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  const usernameInput = getByTestId("usernameInput");
  const passwordInput = getByTestId("passwordInput");

  expect(usernameInput.value).toBe("");
  expect(passwordInput.value).toBe("");


  fireEvent.click(screen.getByTestId("loginButton"));

  

  try {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        userName: "",
        password: "",
      }),
      mode: "cors",
    });

    expect(response.status).toStrictEqual(401);
  } catch (err) {
    console.log(err)
    expect(err).toBeInstanceOf(Error);
    expect(err.message).toEqual("Incorrect username or password.");
  }
});


