/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */

import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "shared/store/store";
import { BrowserRouter } from "react-router-dom";
import NewPoll from "./index";

describe("NewPoll", () => {
  it("should render the component", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });

  it("should display all change", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );

    const firstOption = component.getByTestId("firstOption");
    const secondOption = component.getByTestId("secondOption");
    fireEvent.change(firstOption, { target: { value: "Male" } });
    fireEvent.change(secondOption, {
      target: { value: "Female" },
    });
    expect((firstOption as HTMLInputElement).value).toBe("Male");
    expect((secondOption as HTMLInputElement).value).toBe("Female");
  });
});
