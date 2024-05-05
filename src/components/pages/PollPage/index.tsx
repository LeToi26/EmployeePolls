import { connect } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { InitialState, Question, User } from "shared/model/poll";
import { handleAddAnswer } from "shared/store/actions";

export interface PollPageEmployeeProps {
  dispatch: any;
  authedUser?: User;
  question?: Question;
  author?: User;
}

/* eslint-disable @typescript-eslint/no-unused-vars */
export const PollPage = ({
  dispatch,
  authedUser,
  question,
  author,
}: PollPageEmployeeProps) => {
  const navigate = useNavigate();

  if (!authedUser || !question || !author) {
    return <Navigate to="/not-found" />;
  }

  const isVotedForOptionOne = question.optionOne.votes.includes(authedUser.id);
  const isVotedForOptionTwo = question.optionTwo.votes.includes(authedUser.id);
  const isVoted = isVotedForOptionOne || isVotedForOptionTwo;

  const onChooseOptionOne = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    dispatch(handleAddAnswer(question.id, "optionOne"));
    navigate("/");
  };

  const onChooseOptionTwo = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    dispatch(handleAddAnswer(question.id, "optionTwo"));
    navigate("/");
  };

  const calculate = (option: string, question: Question) => {
    const numberVotesTotal =
      question.optionOne.votes.length + question.optionTwo.votes.length;
    switch (option) {
      case "optionOne":
        return (
          (question.optionOne.votes.length / numberVotesTotal) * 100 + " %"
        );
      case "optionTwo":
        return (
          (question.optionTwo.votes.length / numberVotesTotal) * 100 + " %"
        );
      default:
        return "";
    }
  };

  return (
    <div className="pollpage">
      <h1 className="flex justify-center text-3xl font-bold mt-9">
        Poll by {author.id}
      </h1>

      <div className="flex justify-center">
        <img src={author.avatarURL} alt="Profile" className="h-24 w-24" />
      </div>

      <div className="flex justify-center">
        <h2 className="text-2xl font-bold mt-6">Would you rather?</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <button
          type="button"
          onClick={onChooseOptionOne}
          disabled={isVoted}
          className={
            "p-2 rounded-xl bg-zinc-100 hover:shadow-xl transition " +
            (isVotedForOptionOne ? "border-2 border-sky-500" : "")
          }
        >
          <div className={isVotedForOptionOne ? "chosen" : ""}>
            <p className="font-bold mb-2">{question.optionOne.text}</p>
            {!isVoted && <p className=" underline-offset-4 mb-3">Choose</p>}
            {isVoted && (
              <p className="text-xs">
                Votes: {question.optionOne.votes.length} (
                {calculate("optionOne", question)})
              </p>
            )}
          </div>
        </button>

        <button
          type="button"
          onClick={onChooseOptionTwo}
          disabled={isVoted}
          className={
            "p-2 rounded-xl bg-zinc-100 hover:shadow-xl transition " +
            (isVotedForOptionTwo ? "border-2 border-sky-500" : "")
          }
        >
          <p className="font-bold mb-2">{question.optionTwo.text}</p>
          {!isVoted && <p className="underline-offset-4 mb-3">Choose</p>}
          {isVoted && (
            <p className="text-xs">
              Votes: {question.optionTwo.votes.length} (
              {calculate("optionTwo", question)})
            </p>
          )}
        </button>
      </div>
    </div>
  );
};

const mapPropFromStates = ({ State }: { State: InitialState }) => {
  try {
    const question = Object.values(State.questions).find(
      (question) => question.id === useParams().id
    );
    let author;
    if (question) {
      author = Object.values(State.users).find(
        (user) => user.id === question.author
      );
    } else {
      author = {};
    }
    return {
      authedUser: State.authedUser,
      question,
      author,
    };
  } catch (error) {
    return <Navigate to="/not-found" />;
  }
};

export default connect(mapPropFromStates)(PollPage);

