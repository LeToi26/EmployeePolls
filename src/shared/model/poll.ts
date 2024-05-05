export interface InitialState {
  authedUser: any;
  users: {
    [key: string]: User;
  };
  questions: {
    [key: string]: any;
  };
}

export interface Users {
  [key: string]: User;
}

export interface User {
  id: string;
  password: string;
  name: string;
  avatarURL: string;
  answers: {
    [key: string]: string;
  };
  questions: string[];
}

export interface Questions {
  [key: string]: Question;
}

export interface Question {
  id: string;
  author: string;
  timestamp: number;
  optionOne: {
    votes: string[];
    text: string;
  };
  optionTwo: {
    votes: string[];
    text: string;
  };
}
