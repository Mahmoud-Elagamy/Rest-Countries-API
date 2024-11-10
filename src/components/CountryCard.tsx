import { useState } from "react";
import { Link } from "react-router-dom";

// Types
import { MotionType } from "../App";
import { Country } from "../types/country";
import { LinkIcon } from "lucide-react";

const CountryCard = ({
  country,
  motion,
}: {
  country: Country;
  motion: MotionType;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`country-card flex flex-col justify-between rounded-lg bg-white shadow-light-box-shadow transition-[background-color,box-shadow,transform] duration-300 ease-in-out dark:bg-dark-blue-500 dark:shadow-dark-box-shadow ${
        isHovered && "-translate-y-2"
      }`}
    >
      <figure className="mb-4">
        <img
          className="h-[160px] rounded-tl-lg rounded-tr-lg object-cover"
          src={country.flags.png}
          alt={country.name.common}
          width={250}
          height={160}
        />
      </figure>
      <div className="p-2 font-bold">
        <h3 className="mb-2 max-w-[234px] text-balance text-lg font-extrabold tracking-wide">
          {country.name.common}
        </h3>
        <p className="mb-1">
          Population:{" "}
          <span className="font-normal dark:text-zinc-300">
            {country.population.toLocaleString()}
          </span>
        </p>
        <p className="mb-1">
          Capital:{" "}
          <span className="font-normal dark:text-zinc-300">
            {country.capital}
          </span>
        </p>
        <p>
          Region:{" "}
          <span className="font-normal dark:text-zinc-300">
            {country.region}
          </span>
        </p>
      </div>
      <Link
        to={`/country/${country.name.common.replace(/\s+?/g, "-")}`}
        className="border-slate-[#ccc] mb-2 ml-auto mr-2 flex w-fit cursor-pointer items-center gap-1 rounded-lg border px-2 py-1 shadow duration-300 ease-in-out hover:bg-slate-200 active:scale-95 dark:border-[#5555555d] dark:hover:bg-dark-blue-600 md:active:scale-50"
        title={`View more details about ${country.name.common}`}
        aria-label={`View more details about ${country.name.common}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <LinkIcon size={14} />
        Details
      </Link>
    </motion.article>
  );
};
export default CountryCard;
