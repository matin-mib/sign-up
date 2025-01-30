import { useState } from "react";


const Header = () => {

  const [flag, setFlag] = useState("/images/az.jpg");

  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;

    const flagUrls = {
      az: "/images/az.jpg",
      en: "/images/en.png",
      ru: "/images/ru.png",
    };

    setFlag(flagUrls[selectedLang]);
  };

  return (
    <div className="flex justify-between px-2 py-3 bg-transparent">
      <div className="uppercase font-bold text-xl relative">
        <h1 className="after:content after:absolute after:w-[12px] after:h-[12px] after:bg-green-600  after:rounded-full after:right-[-12px] after:top-[-3px] after:z-20">getjob</h1>
      </div>
      <div className="flex items-center space-x-2 relative">
        <img src={flag} alt="Selected Flag" className="w-6 h-6 absolute left-3" />
        <select
          name="language"
          className="outline-none language-dropdown px-2 py-1 border rounded-md"
          onChange={handleLanguageChange}
        >
          <option value="az">AZ</option>
          <option value="en">EN</option>
          <option value="ru">RU</option>
        </select>
      </div>
    </div>
  )
}

export default Header