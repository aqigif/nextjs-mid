import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";

export const FIND_COURSES = gql`
  query Courses($name: String!) {
    courses(where: { name: $name }) {
      name
      sections {
        id
        name
        lessons {
          id
          name
          lessonType
        }
      }
    }
  }
`;

const useCourses = (options) => {
  const findCourse = useQuery(FIND_COURSES, { skip: true, ...options.filter });

  return {
    findCourse,
  };
};

export default useCourses;
