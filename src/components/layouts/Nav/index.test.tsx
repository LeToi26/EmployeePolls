/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "shared/store/store";
import { BrowserRouter } from "react-router-dom";
import Nav from "./index";
import { setCurrentUser } from "shared/store/actions";

describe("Nav", () => {
  it("should render the component", () => {
    store.dispatch(setCurrentUser({ id: "sarahedo", password: "password123" }));

    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <Nav />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });
});
