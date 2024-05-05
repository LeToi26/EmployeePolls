import { InitialState, Questions, User, Users } from "shared/model/poll";
import productApi from "../api/productApi";
import { Dispatch } from "@reduxjs/toolkit";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";

export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";

export const CREATE_QUESTION = "CREATE_QUESTION";
export const ADD_ANSWER_QUESTION = "ADD_ANSWER_QUESTION";

export const ADD_ANSWER_USER = "ADD_ANSWER_USER";
export const CREATE_QUESTION_USER = "CREATE_QUESTION_USER";

export function initialData() {
  return (dispatch: Dispatch) => {
    return productApi
      .getInitialData()
      .then(({ users, questions }: { users: any; questions: any }) => {
        dispatch(receiveUsers(users));
        dispatch(receiveQuestions(questions));
      });
  };
}

export function receiveUsers(users: Users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function receiveQuestions(questions: Questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function handleLogout() {
  return (dispatch: Dispatch) => {
    return dispatch(logoutCurrentUser());
  };
}

export function logoutCurrentUser() {
  return {
    type: LOGOUT_CURRENT_USER,
  };
}

export function handleLogin(username: string, password: string) {
  return (dispatch: Dispatch, getState: () => { State: InitialState }) => {
    const { State } = getState();
    const user: any = Object.values(State.users).find(
      (user: any) => user.id === username && user.password === password
    );
    if (!!user) {
      return dispatch(setCurrentUser(user));
    }
  };
}

export function setCurrentUser(authedUser: User | {}) {
  return {
    type: SET_CURRENT_USER,
    authedUser,
  };
}

export function handleAddAnswer(questionId: string, answer: string) {
  return (dispatch: Dispatch, getState: () => { State: InitialState }) => {
    const { State } = getState();
    return productApi
      .saveQuestionAnswer(State.authedUser.id, questionId, answer)
      .then(() => {
        dispatch(addAnswerQuestion(State.authedUser.id, questionId, answer));
        dispatch(addAnswerUser(State.authedUser.id, questionId, answer));
      });
  };
}

function addAnswerQuestion(author: string, qid: string, answer: string) {
  return {
    type: ADD_ANSWER_QUESTION,
    author,
    qid,
    answer,
  };
}

export function addAnswerUser(authedUser: string, qid: string, answer: string) {
  return {
    type: ADD_ANSWER_USER,
    authedUser,
    qid,
    answer,
  };
}

export function handleCreateQuestion(
  firstOption: string,
  secondOption: string
) {
  return (dispatch: Dispatch, getState: () => { State: InitialState }) => {
    const { State } = getState();

    return productApi
      .saveQuestion(firstOption, secondOption, State.authedUser)
      .then((question) => {
        dispatch(createQuestion(question));
        dispatch(createQuestionUser(question));
      });
  };
}

export function createQuestionUser(question: any) {
  const { author, id } = question;
  return {
    type: CREATE_QUESTION_USER,
    author,
    qid: id,
  };
}

function createQuestion(question: any) {
  return {
    type: CREATE_QUESTION,
    question,
  };
}
