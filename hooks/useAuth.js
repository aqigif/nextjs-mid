import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

export const SIGNUP = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      token
      user {
        id
        firstName
        email
      }
    }
  }
`;

const useAuth = (options) => {
  const [signUp] = useMutation(SIGNUP);

  return {
    signUp,
  };
};

export default useAuth;
