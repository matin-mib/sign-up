import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Header = () => {
  const [flag, setFlag] = useState("/images/az.jpg");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const currentLang = i18n.language;
    const flagUrls = {
      az: "/images/az.jpg",
      en: "/images/en.png",
      ru: "/images/ru.png",
    };
    setFlag(flagUrls[currentLang]);
  }, [i18n.language]);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    const flagUrls = {
      az: "/images/az.jpg",
      en: "/images/en.png",
      ru: "/images/ru.png",
    };
    setFlag(flagUrls[lang]);
  };

  return (
    <div className="flex justify-between px-2 py-3 bg-green-color">
      <div className="uppercase font-bold text-xl relative">
        <h1 className="after:content after:absolute after:w-[12px] after:h-[12px] after:bg-green-600  after:rounded-full after:right-[-12px] after:top-[-3px] after:z-20">
          <Link to="/">{t('header.home')}</Link>
        </h1>
      </div>
      <div className="flex items-center space-x-2 relative">
        <img src={flag} alt="Selected Flag" className="w-6 h-6 absolute left-3" />
        <select
          name="language"
          className="outline-none language-dropdown px-2 py-1 rounded-md bg-transparent border border-green-500"
          onChange={(e) => changeLanguage(e.target.value)}
        >
          <option value="az">{t('az')}</option>
          <option value="en">{t('en')}</option>
          <option value="ru">{t('ru')}</option>
        </select>
      </div>
    </div>
  );
};

export default Header;
