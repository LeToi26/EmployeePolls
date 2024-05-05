import { InitialState } from "shared/model/poll";
import {
  SET_CURRENT_USER,
  LOGOUT_CURRENT_USER,
  RECEIVE_USERS,
  RECEIVE_QUESTIONS,
  CREATE_QUESTION,
  CREATE_QUESTION_USER,
  ADD_ANSWER_USER,
  ADD_ANSWER_QUESTION,
} from "./actions";

const initialState: InitialState = {
  authedUser: null,
  users: {},
  questions: {},
};

export default function State(state = initialState, action: any) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        authedUser: action.authedUser,
      };
    case LOGOUT_CURRENT_USER:
      return {
        ...state,
        authedUser: null,
      };
    case RECEIVE_USERS:
      return {
        ...state,
        users: action.users,
      };
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        questions: action.questions,
      };
    case ADD_ANSWER_USER:
      return {
        ...state,
        users: {
          ...state.users,
          [action.authedUser]: {
            ...state.users[action.authedUser as keyof typeof state],
            answers: {
              ...state.users[action.authedUser as keyof typeof state].answers,
              [action.qid]: action.answer,
            },
          },
        },
      };
    case ADD_ANSWER_QUESTION:
      return {
        ...state,
        questions: {
          ...state.questions,
          [action.qid]: {
            ...state.questions[action.qid as keyof typeof state],
            [action.answer]: {
              ...state.questions[action.qid as keyof typeof state][
                action.answer
              ],
              votes: state.questions[action.qid as keyof typeof state][
                action.answer
              ].votes.concat(action.author),
            },
          },
        },
      };
    case CREATE_QUESTION_USER:
      return {
        ...state,
        users: {
          ...state.users,
          [action.author]: {
            ...state.users[action.author as keyof typeof state],
            questions: state.users[
              action.author as keyof typeof state
            ].questions.concat(action.qid),
          },
        },
      };
    case CREATE_QUESTION:
      return {
        ...state,
        questions: {
          ...state.questions,
          [action.question.id]: action.question,
        },
      };
    default:
      return state;
  }
}
