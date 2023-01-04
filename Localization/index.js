import terms from './terms.json';

export const getTerm = (key, language, property) => {
  return terms[language][key][property];
};
