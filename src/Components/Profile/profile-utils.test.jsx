import { test } from "vitest";
import { handleUpdateClick } from "./profile-utils";
import {
  showGenericToast,
  showSuccessToast,
} from "../../Utilities/toastGeneric";
import { TOAST_TEXT } from "../../Utilities/Config/ui-text";
import jest from "jest-mock";
import fetchMock from "fetch-mock";

test("handleUpdateClick", async ({ mock }) => {
  const fetchMock = mock.fn(fetch, () => ({
    json: () => ({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
    }),
    status: 200,
  }));

  const firstNameEditInput = { current: { value: "John" } };
  const lastNameEditInput = { current: { value: "Doe" } };
  const emailEditInput = { current: { value: "john.doe@example.com" } };
  const setFirstName = mock.fn();
  const setLastName = mock.fn();
  const setEmail = mock.fn();

  await handleUpdateClick(
    firstNameEditInput,
    lastNameEditInput,
    emailEditInput,
    "OldFirstName",
    "OldLastName",
    "old.email@example.com",
    "userId",
    setFirstName,
    setLastName,
    setEmail
  );

  expect(fetchMock).toBeCalledWith(
    "https://group-class-backend.onrender.com/updateUser",
    expect.anything()
  );
  expect(setFirstName).toBeCalledWith("John");
  expect(setLastName).toBeCalledWith("Doe");
  expect(setEmail).toBeCalledWith("john.doe@example.com");
  expect(showSuccessToast).toBeCalledWith(TOAST_TEXT.profileUpdated);
});
