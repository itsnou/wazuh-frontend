import React from "react";
import { MemoryRouter, useLocation, BrowserRouter, createMemoryRouter, RouterProvider } from 'react-router-dom';
import { render, screen } from "@testing-library/react";
import { Users } from "./Users";

const routesConfig = [
  {
    path: "/users",
    element: (
      <>
        <Users />
      </>
    ),
  },
];

const router = createMemoryRouter(routesConfig, {
  initialEntries: ["/users"],
});

 const mock = {
    data: [{
      address: {
        city: "Gwenborough",
        geo: {
          lat: "-37.3159",
          lng: "81.1496",
        },
        street: "Kulas Light",
        suite: "Apt. 556",
        zipcode: "92998-3874",
      },
      company: {
        bs: "harness real-time e-markets",
        catchPhrase: "Multi-layered client-server neural-net",
        name: "Romaguera-Crona",
      },
      email: "Sincere@april.biz",
      id: 1,
      name: "Leanne Graham",
      phone: "1-770-736-8031 x56442",
      username: "Bret",
      website: "hildegard.org",
    },
  ],
  loading: false,
  error: false,
};

jest.mock("../services/useUsers", () => ({
  __esModule: true,
  default: () => (mock),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn().mockImplementation(() => ({ push: () => { } })),
}));

describe("Users", () => {
  jest.mock("axios", () => ({
    create: jest.fn(),
    get: jest.fn(),
  }));

  beforeEach(() => {
    jest.spyOn(React, "useRef").mockReturnValue({
      current: { value: "" },
    });
  });

  it("renders Users", () => {
    render(<RouterProvider router={router} />);

    //render(<MemoryRouter initialEntries={['/user']}><Users /></MemoryRouter>);
    const divElement = screen.getByRole("contentinfo");
    expect(divElement).toHaveTextContent("Users");
    expect(divElement).toHaveAttribute("role", "contentinfo");
  });
  
  it("should render Leanne Graham user", async () => {
  
    render(<RouterProvider router={router} />);

    //render(<MemoryRouter initialEntries={['/user']}><Users /></MemoryRouter>);
    const user = await screen.findByText("Name: Leanne Graham");
    expect(user).toBeInTheDocument();
  });
});

