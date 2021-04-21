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
  query Sections($or: [SectionFilter], $userAnswerFilter: JSON) {
    sections(or: $or) {
      thumbnail
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

export const FILTER_COURSES_SECTIONS = gql`
  query Courses($query: JSON) {
    courses(query: $query) {
      id
      name
      desc
    }
  }
`;

export const ALREADY_OPENED_LESSONS = gql`
  query UserAnswers($where: UserAnswerFilter, $orderBy: UserAnswerOrderBy) {
    userAnswers(where: $where, orderBy: $orderBy) {
      lesson {
        id
        desc
        thumbnail
        name
        lessonType
      }
    }
  }
`;

const useSections = (options) => {
  const filterSections = useQuery(FILTER_SECTIONS, {
    skip: true,
    ...options.filter,
  });

  const continueLearning = useQuery(ALREADY_OPENED_LESSONS, {
    ...options.continue,
  });

  const filterCourse = useQuery(FILTER_COURSES_SECTIONS, {
    skip: true,
    ...options.courses,
  });

  return {
    filterSections,
    continueLearning,
    filterCourse,
  };
};

export default useSections;
