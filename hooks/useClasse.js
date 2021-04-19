import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";

export const CLASSES = gql`
  query {
    classes {
      id
      name
      desc
      thumbnail
      paths(where: { status: PUBLISH }) {
        id
        name
        thumbnail
      }
    }
  }
`;

const useClasses = (options) => {
  const classes = useQuery(CLASSES);

  return {
    classes,
  };
};

export default useClasses;
