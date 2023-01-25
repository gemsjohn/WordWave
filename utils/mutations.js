import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        role
        username
        email
        profilepicture
        games {
          _id
          userid
          username
          score
          stage
          date
        }
        tokens
        resetToken
        resetTokenExpiry
      }
    }
  }
`;

export const UPDATE_USER_PASSWORD = gql`
  mutation UpdateUserPassword($password: String) {
    updateUserPassword(password: $password) {
      _id
      role
      username
      email
      profilepicture
      games {
        _id
        userid
        username
        score
        stage
        date
      }
      tokens
      resetToken
      resetTokenExpiry
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($username: String, $email: String, $profilepicture: String) {
    updateUser(username: $username, email: $email, profilepicture: $profilepicture) {
      _id
      role
      username
      email
      profilepicture
      games {
        _id
        userid
        username
        score
        stage
        date
      }
      tokens
      resetToken
      resetTokenExpiry
    }
  }
`;

export const REQUEST_RESET = gql`
  mutation RequestReset($email: String) {
    requestReset(email: $email) {
      _id
      role
      username
      email
      profilepicture
      games {
        _id
        userid
        username
        score
        stage
        date
      }
      tokens
      resetToken
      resetTokenExpiry
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($email: String, $password: String, $confirmPassword: String, $resetToken: String) {
    resetPassword(email: $email, password: $password, confirmPassword: $confirmPassword, resetToken: $resetToken) {
      _id
      role
      username
      email
      profilepicture
      games {
        _id
        userid
        username
        score
        stage
        date
      }
      tokens
      resetToken
      resetTokenExpiry
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!, $role: [String!], $profilepicture: String, $tokens: String) {
    addUser(username: $username, email: $email, password: $password, role: $role, profilepicture: $profilepicture, tokens: $tokens) {
      token
      user {
        _id
        role
        username
        email
        profilepicture
        games {
          _id
          userid
          username
          score
          stage
          date
        }
        tokens
        resetToken
        resetTokenExpiry
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($deleteUserId: ID!, $echo: String) {
    deleteUser(id: $deleteUserId, echo: $echo)
  }
`;

export const ADD_GAME = gql`
  mutation AddGame($userid: String, $username: String, $score: String, $stage: String, $date: String) {
    addGame(userid: $userid, username: $username, score: $score, stage: $stage, date: $date) {
      _id
      userid
      username
      score
      stage
      date
    }
  }
`;
export const DELETE_GAME = gql`
  mutation DeleteGame($deleteGameId: ID!, $echo: String) {
    deleteGame(id: $deleteGameId, echo: $echo)
  }
`;


