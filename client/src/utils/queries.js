import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      exercises {
        _id
        exerciseDesc
        createdAt
      }
    }
  }
`;

export const QUERY_EXERCISES = gql`
  query getExercises {
    exercises {
      _id
      exerciseDesc
      exerciseUser
      createdAt
    }
  }
`;

export const QUERY_SINGLE_EXERCISE = gql`
  query getSingleExercise($exerciseId: ID!) {
    exercise(exerciseId: $exerciseId) {
      _id
      exerciseDesc
      exerciseUser
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      exercises {
        _id
        exerciseDesc
        exerciseUser
        createdAt
      }
    }
  }
`;
