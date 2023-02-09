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

export const UPDATE_USER_PASSWORD = gql`
  mutation Mutation($password: String) {
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
`;

export const UPDATE_USER = gql`
  mutation Mutation($username: String, $email: String, $profilepicture: String, $prevusername: String) {
  updateUser(username: $username, email: $email, profilepicture: $profilepicture, prevusername: $prevusername) {
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
`;

export const REQUEST_RESET = gql`
  mutation Mutation($email: String) {
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
`;

export const RESET_PASSWORD = gql`
  mutation Mutation($email: String, $password: String, $confirmPassword: String, $resetToken: String) {
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
`;

export const ADD_USER = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!, $role: [String!], $profilepicture: String, $tokens: String) {
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

export const DELETE_USER = gql`
  mutation Mutation($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId)
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

export const UPDATE_MAX_SCORE_AND_STAGE = gql`
  mutation Mutation($maxstage: String, $highscore: String) {
  updateMaxScoreAndStage(maxstage: $maxstage, highscore: $highscore) {
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
`;

export const UPDATE_TOKEN_COUNT = gql`
  mutation UpdateTokenCount($remove: String, $add: String, $amount: String, $userid: String) {
  updateTokenCount(remove: $remove, add: $add, amount: $amount, userid: $userid) {
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
`;

export const ADD_SAVED_GAME = gql`
mutation Mutation($userid: String, $stage: String, $score: String, $level: String, $crashes: String, $letterPocket: String, $displayLetters: String, $currentLetterCountValue: String, $date: String) {
  addSavedGame(userid: $userid, stage: $stage, score: $score, level: $level, crashes: $crashes, letterPocket: $letterPocket, displayLetters: $displayLetters, currentLetterCountValue: $currentLetterCountValue, date: $date) {
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

export const TO_BE_CONTINUED = gql`
mutation Mutation($userid: String, $username: String, $score: String, $stage: String, $date: String) {
  addToBeContinued(userid: $userid, username: $username, score: $score, stage: $stage, date: $date) {
    _id
    userid
    username
    score
    stage
    date
  }
}
`;

export const DELETE_SAVED_GAME = gql`
mutation DeleteSavedGame($deleteSavedGameId: ID!, $echo: String) {
  deleteSavedGame(id: $deleteSavedGameId, echo: $echo)
}
`;




