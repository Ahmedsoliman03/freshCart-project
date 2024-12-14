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
          className="bg-green-500 text-white  p-2 ml-2 rounded-lg"
        >
          English
        </button>
      ) : (
        <button
          onClick={() => switchLanguage("ar")}
          className="bg-green-500 text-white  p-2 ml-2 rounded-lg"
        >
          Arabic
        </button>
      )}
    </div>
  );
};

export default LanguageSwitcher;
