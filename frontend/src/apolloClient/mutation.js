import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($input: login) {
    login(input: $input) {
      data {
        token
        user {
          originalId
          createdAt
          deletedAt
          firstName
          lastName
          email
          password
          role
        }
      }
      message
      status
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($input: UsersData) {
    registerUser(input: $input) {
      message
      data {
        firstName
        lastName
        email
        role
        password
      }
      status
    }
  }
`;

export const DELETE_USER = gql`
  mutation Mutation($input: deletedUser) {
    deletedUser(input: $input) {
      message
      data {
        originalId
      }
      status
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUserData($input: UsersData) {
    updateUserData(input: $input) {
      data {
        originalId
        name
        email
        contactNo
        department
        location
        empId
      }
    }
  }
`;