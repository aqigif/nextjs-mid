import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";

export const FIND_SECTIONS = gql`
  query Sections($query: JSON) {
    sections(query: $query) {
      name
      lessons {
        name
        lessonType
      }
    }
  }
`;

export const FILTER_SECTIONS = gql`
  query Sections($query: JSON, $userAnswerFilter: JSON) {
    sections(query: $query) {
      name
      id
      lessons {
        id
        desc
        thumbnail
        name
        lessonType
        contents {
          id
        }
        userAnswers(query: $userAnswerFilter) {
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

const useSections = (options) => {
  const filterSections = useQuery(FILTER_SECTIONS, {
    skip: true,
    ...options.filter,
  });

  return {
    filterSections,
  };
};

export default useSections;
