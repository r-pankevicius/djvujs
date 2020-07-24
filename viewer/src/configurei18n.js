import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

// While we don't support many languages we import all language resources statically
import enResources from './locales/en/resources.json';
import svResources from './locales/sv/resources.json';

/**
 * The function to configure i18n.
 * @param {*} configOverrides Optional config parameter that you can use to override default
 * configuration that will be passed to i18next.init() as options parameter.
 * 
 * See https://react.i18next.com/guides/quick-start for quick intro.
 * 
 * See https://www.i18next.com/overview/configuration-options to learn how to configure localization.
 * 
 * See https://github.com/i18next/i18next-browser-languageDetector for language dector options.
 */
function configurei18n(configOverrides) {
    const defaultConfig = {
        supportedLngs: ['en', 'sv'],
        fallbackLng: 'en',
        keySeparator: false, // we do not use keys in form messages.welcome
        interpolation: {
          escapeValue: false // react already safes from xss
        },
        resources: {
          en: enResources,
          sv: svResources
        },
        detection : {
          order: ['querystring', 'navigator'],
          lookupQuerystring: 'lang'
        }
    };

    let rootOverrides = configOverrides;

    // Apply language detector options separately
    if (configOverrides && configOverrides.detection) {
      const { detection } = configOverrides;
      defaultConfig.detection = Object.assign({}, defaultConfig.detection, detection);
      delete rootOverrides.detection;
    }

    const mergedConfig = Object.assign({}, defaultConfig, rootOverrides);

    return i18n
      .use(LanguageDetector)
      .use(initReactI18next) // passes i18n down to react-i18next
      .init(mergedConfig);
}

export default configurei18n;