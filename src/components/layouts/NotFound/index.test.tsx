/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */

import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "shared/store/store";
import { BrowserRouter } from "react-router-dom";
import NotFound from "./index";

describe("NotFound", () => {
  it("should render the component when access wrong path", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });
});
