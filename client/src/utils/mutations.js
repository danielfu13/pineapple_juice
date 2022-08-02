import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_EXERCISE = gql`
  mutation addExercise($exerciseDesc: String!) {
    addExercise(exerciseDesc: $exerciseDesc) {
      _id
      exerciseDesc
      exerciseUser
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($exerciseId: ID!, $commentText: String!) {
    addComment(exerciseId: $exerciseId, commentText: $commentText) {
      _id
      exerciseDesc
      exerciseUser
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
