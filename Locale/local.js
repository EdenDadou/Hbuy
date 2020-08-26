import fr from "./fr.json";
import en from "./en.json";

const data = {
    fr,
    en
  };

  export const translate = (keyWord,lang) => {
    return data[lang].hasOwnProperty(keyWord) && data[lang][keyWord]
  };