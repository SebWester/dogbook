import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, test, expect, vi, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import CreateDog from "./CreateDog";
// import fetchDogs from "../../services/fetchDogs";
import createNewDog from "../../services/createDog";

beforeEach(() => {
  Object.defineProperty(HTMLFormElement.prototype, "requestSubmit", {
    value: function () {
      this.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );
    },
    configurable: true,
  });
});

vi.mock("../../services/createDog", () => ({
  default: vi.fn(),
}));

describe("CreateDog", () => {
  it("Skickar formulär med korrekt data", () => {
    render(
      <MemoryRouter>
        <CreateDog />
      </MemoryRouter>
    );

    const nameInput = screen.getByLabelText("Name:");
    fireEvent.change(nameInput, { target: { value: "Rex" } });

    const nicknameInput = screen.getByLabelText("Nickname:");
    fireEvent.change(nicknameInput, { target: { value: "T-Rex" } });

    const ageInput = screen.getByLabelText(/Age:$/i);
    fireEvent.change(ageInput, { target: { value: "6" } });

    const bioInput = screen.getByLabelText(/Bio:$/i);
    fireEvent.change(bioInput, { target: { value: "Dog test" } });

    const fileInput = screen.getByLabelText(/Profile picture:/i);
    const file = new File(["dummy content"], "example.png", {
      type: "image/png",
    });
    fireEvent.change(fileInput, { target: { files: [file] } });

    const submitButton = screen.getByDisplayValue("Save");
    fireEvent.click(submitButton);

    expect(createNewDog).toHaveBeenCalledTimes(1);

    const formDataArg = createNewDog.mock.calls[0][0];

    expect(formDataArg.get("name")).toBe("Rex");
    expect(formDataArg.get("nickname")).toBe("T-Rex");
    expect(formDataArg.get("age")).toBe("6");
    expect(formDataArg.get("bio")).toBe("Dog test");
    expect(formDataArg.get("profilePic")).toBe(file);
  });

  it("Renderar en länk till dashboard", () => {
    render(
      <MemoryRouter>
        <CreateDog />
      </MemoryRouter>
    );

    const dashboardLink = screen.getByRole("link", {
      name: /to dashboard/i,
    });
    expect(dashboardLink).toBeInTheDocument();
  });
});
