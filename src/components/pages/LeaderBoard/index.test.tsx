/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */

import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "shared/store/store";
import { BrowserRouter } from "react-router-dom";
import LeaderBoard from "./index";

describe("LeaderBoard", () => {
  it("should render the component", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <LeaderBoard />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });
});
