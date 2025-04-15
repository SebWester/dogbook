import React from "react";
import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProfileLink from "./ProfileLinks";
import deleteDog from "../../services/deleteDog";

jest.mock("./Profile.css", () => {});
jest.mock("../../services/deleteDog");

describe("ProfileLink component", () => {
  const mockDog = {
    _id: "123",
    name: "Fido",
    checkedIn: true,
  };

  beforeEach(() => {
    deleteDog.mockClear();
  });

  test("Renders dog profile link with correct name and class", () => {
    render(
      <MemoryRouter>
        <ProfileLink dog={mockDog} />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: `@${mockDog.name}` });
    expect(link).toBeInTheDocument();
    expect(link).toHaveClass("is-here");
  });

  test("Calls deleteDog on button click", () => {
    render(
      <MemoryRouter>
        <ProfileLink dog={mockDog} />
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: "Remove dog" });
    fireEvent.click(button);

    expect(deleteDog).toHaveBeenCalledTimes(1);
    expect(deleteDog).toHaveBeenCalledWith("123");
  });
});
