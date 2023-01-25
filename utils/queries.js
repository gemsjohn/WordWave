import { gql } from '@apollo/client';



export const GET_ME = gql`
  query Query {
    me {
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

export const GET_USER_BY_ID = gql`
  query Query($id: ID!) {
    user(_id: $id) {
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

export const GET_USERS = gql`
  query Query($echo: String) {
    users(echo: $echo) {
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

export const GET_USERS_SEARCH = gql`
  query Query($search: String, $echo: String) {
    getUsers(search: $search, echo: $echo) {
      users {
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

export const GAMES = gql`
  query Query($echo: String) {
    games(echo: $echo) {
      _id
      userid
      username
      score
      stage
      date
    }
  }
`;

export const LEADERBOARD = gql`
  query Query {
    leaderBoard {
      id
      username
      score
      position
    }
  }
`;
