import { User } from "shared/model/poll";
import {
  _getQuestions,
  _getUsers,
  _saveQuestion,
  _saveQuestionAnswer,
} from "../ultis/_DATA";

const productApi = {
  getInitialData: function () {
    return Promise.all([_getUsers(), _getQuestions()]).then(
      ([users, questions]) => ({
        users,
        questions,
      })
    );
  },

  saveQuestion: function (
    optionOneText: string,
    optionTwoText: string,
    user: User
  ) {
    return _saveQuestion(optionOneText, optionTwoText, user);
  },

  saveQuestionAnswer: function (
    authedUserId: string,
    qid: string,
    answer: string
  ) {
    return _saveQuestionAnswer({
      authedUser: authedUserId,
      qid,
      answer,
    });
  },
};

export default productApi;
