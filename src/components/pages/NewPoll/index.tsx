import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { handleCreateQuestion } from "shared/store/actions";

export interface NewPollProps {
  dispatch: any;
}

/* eslint-disable @typescript-eslint/no-unused-vars */
export const NewPoll = ({ dispatch }: NewPollProps) => {
  const navigate = useNavigate();
  const [firstOption, setFirstOption] = useState("");
  const [secondOption, setSecondOption] = useState("");

  const handleFirstOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setFirstOption(value);
  };

  const onChangeSecondOption = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSecondOption(value);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(handleCreateQuestion(firstOption, secondOption));
    navigate("/");
  };
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          New Poll
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label
              htmlFor="firstOption"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              First Option
            </label>
            <div className="mt-2">
              <input
                value={firstOption}
                onChange={handleFirstOptionChange}
                type="text"
                name="firstOption"
                id="firstOption"
                data-testid="firstOption"
                className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="secondOption"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Second Option
              </label>
              <div className="text-sm"></div>
            </div>
            <div className="mt-2">
              <input
                value={secondOption}
                onChange={onChangeSecondOption}
                type="text"
                name="secondOption"
                id="secondOption"
                data-testid="secondOption"
                className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect()(NewPoll);
/* eslint-disable @typescript-eslint/no-unused-vars */
