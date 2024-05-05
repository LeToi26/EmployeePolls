import React from "react";

const { _saveQuestionAnswer, _saveQuestion } = require("./_DATA");
describe("_saveQuestionAnswer", () => {
  it("should return true", async () => {
    const response = await _saveQuestionAnswer({
      authedUser: "sarahedo",
      qid: "8xf0y6ziyjabvozdd253nd",
      answer: "optionOne",
    });

    expect(response).toBeTruthy();
  });

  it("should return error", async () => {
    const response = await _saveQuestionAnswer({
      authedUser: "sarahedo",
      qid: undefined,
      answer: "optionOne",
    }).catch((e: Error) => e);

    expect(response).toBe("Please provide authedUser, qid, and answer");
  });

  it("should should show warning", async () => {
    const response = await _saveQuestion({
      optionOneText: "",
      optionTwoText: "",
      answer: null,
    }).catch((e: Error) => e);

    expect(response).toBe(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});
