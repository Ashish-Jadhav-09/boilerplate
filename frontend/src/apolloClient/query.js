import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query getUserData($role: String) {
    getUserData(role: $role) {
      originalId
      firstName
      lastName
      email
      role
      createdAt
      deletedAt
      password
    }
  }
`;

export const GET_PROFILE = gql`
  query getProfile {
    getProfile {
      originalId
      createdAt
      deletedAt
      firstName
      lastName
      email
      password
      role
      contactNo
      bio
      website
    }
  }
`;
