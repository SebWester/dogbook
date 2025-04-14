import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import ProfileLinks from "./ProfileLinks";
import deleteDog from "../../services/deleteDog";

vi.mock("../../services/deleteDog", () => ({
  __esModule: true,
  default: vi.fn(),
}));

const mockDog = {
  _id: "123",
  name: "Rex",
  checkedIn: true,
};

describe("ProfileLink", () => {
  it("Renderar hundens namn som en länk med rätt URL", () => {
    render(
      <MemoryRouter>
        <ProfileLinks dog={mockDog} />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: /@Rex/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/profile/Rex");
  });

  it("Visar korrekt klass beroende på checkedIn-status", () => {
    render(
      <MemoryRouter>
        <ProfileLinks dog={mockDog} />
      </MemoryRouter>
    );

    const link = screen.getByRole("link");
    const statusIcon = screen.getByText(
      (_, element) => element?.tagName === "I"
    );

    expect(link).toHaveClass("is-here");
    expect(statusIcon).toHaveClass("checked-in");
  });

  it("Anropar deleteDog när knappen klickas", () => {
    render(
      <MemoryRouter>
        <ProfileLinks dog={mockDog} />
      </MemoryRouter>
    );

    const removeButton = screen.getByRole("button", { name: /remove dog/i });
    fireEvent.click(removeButton);

    expect(deleteDog).toHaveBeenCalledWith("123");
  });
});
