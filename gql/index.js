import gql from "graphql-tag";

export const LESSON = gql`
  query LESSON($id: String!) {
    lesson(id: $id) {
      id
      name
      contents(limit: 100) {
        id
        name
        contentType
      }
    }
  }
`;

export const CONTENT = gql`
  query CONTENT($id: String!) {
    content(id: $id) {
      id
      name
      contentType
      content
      option
      answer
      timer
      instruction
      desc
      correction
      score
    }
  }
`;

export const LESSONS = gql`
  query LESSONS($userId: String) {
    lessonsConnection(limit: 1000) {
      data {
        id
        name
        desc
        thumbnail
        contents {
          id
        }
        userAnswers(where: { userId: $userId }) {
          id
          content {
            id
          }
          score
        }
      }
    }
  }
`;

export const LOGIN = gql`
  mutation LOGIN($input: LoginInput) {
    login(input: $input) {
      token
      user {
        id
        firstName
        email
        phoneNumber
      }
    }
  }
`;

export const SUBSCRIPTION_USER_ANSWERS = gql`
  subscription SUBSCRIPTION_USER_ANSWERS($where: UserAnswerFilter) {
    userAnswersUpdated(where: $where) {
      name
      contents {
        id
      }
      user
      answers {
        id
        content {
          id
        }
      }
    }
  }
`;

export const USER_ANSWERS = gql`
  query USER_ANSWERS($where: UserAnswerFilter) {
    userAnswers(where: $where) {
      answer
      content {
        id
      }
      user {
        id
      }
    }
  }
`;

export const CREATE_USER_ANSWER = gql`
  mutation CREATE_USER_ANSWER($input: CreateUserAnswerInput!) {
    createUserAnswer(input: $input) {
      id
      answer
    }
  }
`;
