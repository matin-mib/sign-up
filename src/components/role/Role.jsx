import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Role = () => {
  const { t } = useTranslation();

  return (
    <div className="h-[100vh] flex flex-col justify-center items-center bg-green-color">
      <h1 className="text-center font-bold text-[25px]">{t('roleSelection')}</h1>

      <div className="flex flex-wrap sm:flex-nowrap gap-5 sm:gap-0 justify-center items-end py-10">

        <Link
          type="button"
          to='/signup/freelance'
          className="border flex justify-center items-center font-bold border-green-500 sm:rounded-tr-3xl h-[150px] w-[300px] bg-green-500 text-white hover:bg-transparent hover:text-green-500 transition"
        >
          {t('freelancer')}
        </Link>

        <Link
          type="button"
          to='/signup/employer'
          className="border flex justify-center items-center font-bold border-green-500 sm:rounded-tl-3xl h-[150px] sm:h-[200px] w-[300px] text-green-500 hover:bg-green-500 hover:text-white transition"
        >
          {t('employer')}
        </Link>
      </div>
    </div>
  );
};

export default Role;
