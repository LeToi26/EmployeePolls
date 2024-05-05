/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */

import { fireEvent, render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "shared/store/store";
import Login from "./index";
import { initialData } from "shared/store/actions";
import { BrowserRouter } from "react-router-dom";

describe("Login", () => {
  it("should render the component", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });

  it("should clear user name and password after submit", async () => {
    await store.dispatch(initialData());

    const componnet = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    const login = componnet.getByTestId("login");
    const username = componnet.getByTestId("username");
    const password = componnet.getByTestId("password");
    const submit = componnet.getByTestId("submit");
    expect(login).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
    await fireEvent.change(username, { target: { value: "sarahedo" } });
    await fireEvent.change(password, {
      target: { value: "wrongpassword" },
    });
    await waitFor(() => {
      expect((username as HTMLInputElement).value).toBe("sarahedo");
    });
    await waitFor(() => {
      expect((password as HTMLInputElement).value).toBe("wrongpassword");
    });
    await fireEvent.click(submit);
    await waitFor(() => {
      expect(login).toBeInTheDocument();
    });
    expect((username as HTMLInputElement).value).toBe("");
    expect((password as HTMLInputElement).value).toBe("");
  });
});
