import React from "react";
import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreateDog from "./CreateDog";
import createNewDog from "../../services/createDog";

jest.mock("./Create.css", () => {});
jest.mock("../../services/createDog");

describe("CreateDog component", () => {
  beforeEach(() => {
    createNewDog.mockClear();
  });

  test("Renders all input fields", () => {
    render(
      <MemoryRouter>
        <CreateDog />;
      </MemoryRouter>
    );

    expect(screen.getByLabelText("Profile picture:")).toBeInTheDocument();
    expect(screen.getByLabelText("Name:")).toBeInTheDocument();
    expect(screen.getByLabelText("Nickname:")).toBeInTheDocument();
    expect(screen.getByLabelText("Age:")).toBeInTheDocument();
    expect(screen.getByLabelText("Bio:")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Save")).toBeInTheDocument();
  });

  test("Updates input fields correctly", () => {
    render(
      <MemoryRouter>
        <CreateDog />
      </MemoryRouter>
    );

    const nameInput = screen.getByLabelText("Name:");
    fireEvent.change(nameInput, { target: { value: "Rex" } });
    expect(nameInput.value).toBe("Rex");

    const ageInput = screen.getByLabelText("Age:");
    fireEvent.change(ageInput, { target: { value: 10 } });
    expect(ageInput.value).toBe("10");

    const bioInput = screen.getByLabelText("Bio:");
    fireEvent.change(bioInput, { target: { value: "Rex's bio text" } });
    expect(bioInput.value).toBe("Rex's bio text");
  });

  test("Submits form and calls createNewDog with correct data", async () => {
    render(
      <MemoryRouter>
        <CreateDog />
      </MemoryRouter>
    );

    const nameInput = screen.getByLabelText("Name:");
    const nicknameInput = screen.getByLabelText("Nickname:");
    const ageInput = screen.getByLabelText("Age:");
    const bioInput = screen.getByLabelText("Bio:");
    const fileInput = screen.getByLabelText("Profile picture:");

    fireEvent.change(nameInput, { target: { value: "Bella" } });
    fireEvent.change(nicknameInput, { target: { value: "Bellan" } });
    fireEvent.change(ageInput, { target: { value: "3" } });
    fireEvent.change(bioInput, { target: { value: "Bella likes to play" } });

    const file = new File(["O_O"], "dog.png", { type: "image/png" });
    fireEvent.change(fileInput, { target: { files: [file] } });

    const saveButton = screen.getByDisplayValue("Save");
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(createNewDog).toHaveBeenCalledTimes(1);

      const formData = createNewDog.mock.calls[0][0];
      expect(formData.get("name")).toBe("Bella");
      expect(formData.get("nickname")).toBe("Bellan");
      expect(formData.get("age")).toBe("3");
      expect(formData.get("bio")).toBe("Bella likes to play");
      expect(formData.get("profilePic")).toBe(file);
    });
  });
});
