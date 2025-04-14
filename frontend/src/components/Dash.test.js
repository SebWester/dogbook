import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dashboard from "./Dashboard";
import fetchDogs from "../services/fetchDogs";

jest.mock("./Dashboard.css", () => {});

jest.mock("../services/fetchDogs");

jest.mock("./Profile/ProfileLinks.jsx", () => ({ dog }) => (
  <div data-testid="profile-link">{dog.name}</div>
));

jest.mock("./Create/CreateButton.jsx", () => () => <button>Create Dog</button>);

describe("Dashboard", () => {
  it("Show dog profiles when fetchDogs returns data", async () => {
    const mockDogs = [
      { _id: "1", name: "Fido" },
      { _id: "2", name: "Bella" },
    ];

    fetchDogs.mockResolvedValueOnce(mockDogs);

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText("Fido")).toBeInTheDocument();
      expect(screen.getByText("Bella")).toBeInTheDocument();
    });

    expect(screen.getByText("Create Dog")).toBeInTheDocument();
  });

  it("Display fallback message if fetchDogs is empty", async () => {
    fetchDogs.mockResolvedValueOnce([]);

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText("No dogs to show")).toBeInTheDocument();
    });
  });
});
