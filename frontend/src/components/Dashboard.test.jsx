import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Dashboard from "./Dashboard";
import fetchDogs from "../services/fetchDogs";

vi.mock("../services/fetchDogs");

describe("Dashboard", () => {
  test("Visar 'No dogs to show' om inga hundar hämta", async () => {
    fetchDogs.mockResolvedValueOnce([]);

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    const noDogsMessage = await screen.findByText("No dogs to show");
    expect(noDogsMessage).toBeInTheDocument();
  });

  test("Renderar hundprofiler när data hämtas", async () => {
    const mockDogs = [
      { _id: "1", name: "Fido" },
      { _id: "2", name: "Bella" },
    ];

    fetchDogs.mockResolvedValueOnce(mockDogs);

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    const createButton = screen.getByRole("link");
    expect(createButton).toBeInTheDocument();
  });
});
