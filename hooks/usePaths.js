import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";

export const GET_PATHS = gql`
  query {
    paths {
      name
      id
    }
  }
`;

const usePaths = (options) => {
  const getPaths = useQuery(GET_PATHS);

  return {
    getPaths,
  };
};

export default usePaths;
