import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const switchLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div>
      {i18n.language == "ar" ? (
        <button
          onClick={() => switchLanguage("en")}
          className="bg-green-500 dark:bg-yellow-500 text-white dark:text-gray-900 p-2 ml-2 rounded-lg hover:bg-green-600 dark:hover:bg-yellow-600"
        >
          English
        </button>
      ) : (
        <button
          onClick={() => switchLanguage("ar")}
          className="bg-green-500 dark:bg-yellow-500 text-white dark:text-gray-900 p-2 ml-2 rounded-lg hover:bg-green-600 dark:hover:bg-yellow-600"
        >
          Arabic
        </button>
      )}
    </div>
  );
};

export default LanguageSwitcher;
