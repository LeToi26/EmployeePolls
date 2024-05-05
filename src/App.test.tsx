/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */

import { render } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "../src/shared/store/store";
import { BrowserRouter } from "react-router-dom";
import { setCurrentUser } from "../src/shared/store/actions";

describe("App", () => {
  it("should render the component", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toBeDefined();
  });

  it("should redirect to Login page when not logged in", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    const login = component.getByTestId("login");
    expect(login).toBeInTheDocument();
  });

  it("should redirect to Dashboard page when logged in", () => {
    store.dispatch(setCurrentUser({ id: "", password: "" }));

    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    const dashboard = component.getByTestId("dashboard");
    expect(dashboard).toBeInTheDocument();
  });
});
