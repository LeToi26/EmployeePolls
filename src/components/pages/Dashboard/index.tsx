import { connect } from "react-redux";
import { InitialState, Question, User, Users } from "shared/model/poll";
import Card from "./Card";
import { useState } from "react";

export interface DashboardPropsStaff {
  authedUser: User;
  questions: Question[];
  users: Users;
}


export const Dashboard = ({ authedUser, questions, users }: DashboardPropsStaff) => {
  const [isAnswerd, setIsAnswerd] = useState(false);
  const [isNew, setIsNew] = useState(true);
  

  const answered = (question: Question) =>
    question.optionTwo.votes.includes(authedUser.id) ||
    question.optionOne.votes.includes(authedUser.id);


  const unanswered = (question: Question) =>
    !question.optionTwo.votes.includes(authedUser.id) &&
    !question.optionOne.votes.includes(authedUser?.id);

  const onClickAnswered = () => {
    setIsNew(false);
    setIsAnswerd(true);
  };
  const onClickNew = () => {
    setIsNew(true);
    setIsAnswerd(false);
  };

  return (
    <div className="home">
      <h1 className="text-3xl font-bold mt-9" data-testid="dashboard">
        Dashboard
      </h1>

      <ul
        className="mb-5 flex list-none flex-col flex-wrap pl-0 md:flex-row justify-center"
        id="pills-tab"
        role="tablist"
        data-te-nav-ref
      >
        <li role="presentation" onClick={onClickNew}>
          <a
            href="#new"
            className="my-2 block rounded bg-neutral-100 px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 data-[te-nav-active]:!bg-primary-100 data-[te-nav-active]:text-primary-700 dark:bg-neutral-700 dark:text-white dark:data-[te-nav-active]:text-primary-700 md:mr-4"
            id="new-tab"
            data-te-toggle="pill"
            data-te-target="#new"
            data-te-nav-active
            role="tab"
            aria-controls="new"
            aria-selected="true"
          >
            New Questions
          </a>
        </li>
        <li role="presentation" onClick={onClickAnswered}>
          <a
            href="#answered"
            className="my-2 block rounded bg-neutral-100 px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 data-[te-nav-active]:!bg-primary-100 data-[te-nav-active]:text-primary-700 dark:bg-neutral-700 dark:text-white dark:data-[te-nav-active]:text-primary-700 md:mr-4"
            id="answered-tab"
            data-te-toggle="pill"
            data-te-target="#answered"
            role="tab"
            aria-controls="answered"
            aria-selected="false"
          >
            Answered Questions
          </a>
        </li>
      </ul>

      {isNew && (
        <div>
          <h2 className="text-2xl font-bold mt-6">New Questions</h2>
          <ul className="divide-y divide-gray-100">
            {questions.filter(unanswered).map((question) => (
              <li key={question.id}>
                <Card
                  authedUser={authedUser}
                  question={question}
                  author={users[question.author]}
                />
              </li>
            ))}
          </ul>
        </div>
      )}

      {isAnswerd && (
        <div>
          <h2 className="text-2xl font-bold mt-6">Answered Questions</h2>
          <ul className="divide-y divide-gray-100">
            {questions.filter(answered).map((question) => (
              <li key={question.id}>
                <Card
                  authedUser={authedUser}
                  question={question}
                  author={users[question.author]}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const mapPropFromStates = ({ State }: { State: InitialState }) => ({
  authedUser: State.authedUser,
  questions: Object.values(State.questions).sort(
    (a: any, b: any) => b.timestamp - a.timestamp
  ),
  users: State.users,
});

export default connect(mapPropFromStates)(Dashboard);

