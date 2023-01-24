import { CommonActions } from '@react-navigation/native';
import { getTerm } from '../Localization';

const language = 'en';
export const resetActionHome = CommonActions.reset({
    index: 1,
    routes: [{ 
      name: `${getTerm('home', language, 'title')}`, 
      params: {} 
    }]
  });
  export const resetActionGame = CommonActions.reset({
    index: 1,
    routes: [{ 
      name: `${getTerm('game', language, 'title')}`, 
      params: {} 
    }]
  });
  export const resetActionProfile = CommonActions.reset({
    index: 1,
    routes: [{ 
      name: `${getTerm('profile', language, 'title')}`, 
      params: {} 
    }]
  });
  export const resetActionAuth = CommonActions.reset({
    index: 1,
    routes: [{ 
      name: `${getTerm('auth', language, 'title')}`, 
      params: {} 
    }]
  });