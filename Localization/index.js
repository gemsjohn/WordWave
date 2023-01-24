import terms from './terms.json';

export const getTerm = (key, language, property) => {
  console.log("- - - -")
  console.log(key)
  console.log(language)
  console.log(property)
  return terms[language][key][property];
};
