const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    exercises: [Exercise]!
  }

  type Exercise {
    _id: ID
    exerciseDesc: String
    exerciseUser: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    exercises(username: String): [Exercise]
    exercise(exerciseId: ID!): Exercise
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addExercise(exerciseDesc: String!): Exercise
    addComment(exerciseId: ID!, commentText: String!): Exercise
    removeExercise(exerciseId: ID!): Exercise
    removeComment(exerciseId: ID!, commentId: ID!): Exercise
  }
`;

module.exports = typeDefs;
