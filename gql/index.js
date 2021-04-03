import gql from "graphql-tag";

export const LESSON = gql`
  query LESSON {
    lesson(id: "605dae799f922e0039dcbeb6") {
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
    }
  }
`;
