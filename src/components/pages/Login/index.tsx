import { FormEvent, useState } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { InitialState } from "shared/model/poll";
import { handleLogin } from "shared/store/actions";

export interface LoginPropsEmployee {
  dispatch: any;
  authedUser: any;
}


export const LoginEmployee = ({ dispatch, authedUser }: LoginPropsEmployee) => {
  const [username, setUsername] = useState("sarahedo");
  const [password, setPassword] = useState("password123");

  if (authedUser) {
    const urlParams = new URLSearchParams(window.location.search);
    const previousUrl = urlParams.get("redirectTo");
    return <Navigate to={previousUrl ? previousUrl : "/"} />;
  }

  const onChangeUsernameStaff = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUsername(value);
  };

  const onChangePasswordStaff = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
  };

  const onSubmitData = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(handleLogin(username, password));
    setUsername("");
    setPassword("");
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2
          data-testid="login"
          className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
        >
          Login
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={onSubmitData}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                value={username}
                onChange={onChangeUsernameStaff}
                type="text"
                name="username"
                id="username"
                data-testid="username"
                autoComplete="username"
                required
                className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm"></div>
            </div>
            <div className="mt-2">
              <input
                value={password}
                onChange={onChangePasswordStaff}
                type="password"
                name="password"
                id="password"
                data-testid="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              data-testid="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapPropFromStates = ({ State }: { State: InitialState }) => ({
  authedUser: !!State.authedUser,
});

export default connect(mapPropFromStates)(LoginEmployee);

