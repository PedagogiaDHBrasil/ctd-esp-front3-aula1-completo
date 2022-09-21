import { locales } from "./constants";
import { EN_CONTENT } from "./en_EN";
import { ES_CONTENT } from "./es_ES";
import { PT_CONTENT } from "./pt_BR";

const { EN_US, ES_ES, PT_BR } = locales;

// Exportamos um objeto com cada idioma e seu conteúdo para podermos
// consome no aplicativo
const CONTENT_BY_LOCALE = {
  [EN_US]: EN_CONTENT,
  [ES_ES]: ES_CONTENT,
  [PT_BR]: PT_CONTENT,
};

export default CONTENT_BY_LOCALE;
