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
      saved {
        _id
        userid
        stage
        score
        level
        crashes
        letterPocket
        displayLetters
        currentLetterCountValue
        date
      }
      tobecontinued {
        _id
        userid
        username
        score
        stage
        date
      }
      maxstage
      highscore
      tokens
      resetToken
      resetTokenExpiry
      currentVersion
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
      saved {
        _id
        userid
        stage
        score
        level
        crashes
        letterPocket
        displayLetters
        currentLetterCountValue
        date
      }
      tobecontinued {
      _id
      userid
      username
      score
      stage
      date
    }
      maxstage
      highscore
      tokens
      resetToken
      resetTokenExpiry
      currentVersion
    }
  }
`;

export const GET_USERS = gql`
  query Users($echo: String) {
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
      maxstage
      highscore
      tokens
      resetToken
      resetTokenExpiry
      saved {
        _id
        userid
        stage
        score
        level
        crashes
        letterPocket
        displayLetters
        currentLetterCountValue
        date
      }
      tobecontinued {
      _id
      userid
      username
      score
      stage
      date
    }
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
      saved {
        _id
        userid
        stage
        score
        level
        crashes
        letterPocket
        displayLetters
        currentLetterCountValue
        date
      }
      tobecontinued {
      _id
      userid
      username
      score
      stage
      date
    }
      maxstage
      highscore
      tokens
      resetToken
      resetTokenExpiry
    }
  }
}
`;

export const GAMES = gql`
  query Query {
  games {
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
  query LeaderBoard {
    leaderBoard {
      id
      username
      score
      position
    }
  }
`;

export const SAVED = gql`
query Query {
  saved {
    _id
    userid
    stage
    score
    level
    crashes
    letterPocket
    displayLetters
    currentLetterCountValue
    date
  }
}
`;
