import { Link } from "react-router-dom";
import { Question, User } from "shared/model/poll";

export interface CardProps {
  authedUser: any;
  question: Question;
  author: User;
}

export default function Card({ authedUser, question, author }: CardProps) {
  const isVotedForOptionOne = question.optionOne.votes.includes(authedUser.id);
  const isVotedForOptionTwo = question.optionTwo.votes.includes(authedUser.id);
  const isVoted = isVotedForOptionOne || isVotedForOptionTwo;

  return (
    <Link to={"questions/" + question.id}>
      <div className="flex justify-between gap-x-6 py-5">
        <div className="flex gap-x-4">
          <img
            className="h-12 w-12 flex-none rounded-full bg-gray-50"
            src={author?.avatarURL}
            alt=""
          />
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              {question.author}
            </p>
            {isVoted && (
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Higher vote rate:{" "}
                {question.optionOne.votes.length >
                question.optionTwo.votes.length
                  ? question.optionOne.text
                  : question.optionTwo.text}
              </p>
            )}
          </div>
        </div>
        <div className="hidden sm:flex sm:flex-col sm:items-end">
          <p className="text-sm leading-6 text-gray-900">Show</p>
          <p className="mt-1 text-xs leading-5 text-gray-500">
            Time{" "}
            <time dateTime={new Date(question.timestamp).toDateString()}>
              {new Date(question.timestamp).toDateString()}
            </time>
          </p>
        </div>
      </div>
    </Link>
  );
}
