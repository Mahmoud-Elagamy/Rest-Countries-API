import { useState } from "react";
import { Link } from "react-router-dom";
import { Country } from "../App";

const CountryCard = ({ country }: { country: Country }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      className={`country-card flex flex-col justify-between rounded-md bg-white shadow-light-box-shadow transition-[background-color,box-shadow,transform] duration-300 ease-in-out dark:bg-dark-blue-500 dark:shadow-dark-box-shadow ${
        isHovered && "-translate-y-2"
      }`}
    >
      <figure className="mb-4">
        <img
          className="h-[160px] rounded-tl-md rounded-tr-md object-cover"
          src={country.flags.png}
          alt={country.name.common}
          loading="lazy"
          width={250}
          height={160}
        />
      </figure>
      <div className="p-2 font-bold">
        <h3 className="mb-2 max-w-[234px] text-balance text-lg font-extrabold tracking-wide">
          {country.name.common}
        </h3>
        <p>
          Population:{" "}
          <span className="font-normal dark:text-zinc-300">
            {country.population.toLocaleString()}
          </span>
        </p>
        <p>
          Region:{" "}
          <span className="font-normal dark:text-zinc-300">
            {country.region}
          </span>
        </p>
        <p>
          Capital:{" "}
          <span className="font-normal dark:text-zinc-300">
            {country.capital}
          </span>
        </p>
      </div>
      <Link
        to={`/country/${country.name.common}`}
        className="border-slate-[#ccc] mb-2 ml-auto mr-2 block w-fit cursor-pointer rounded-md border px-2 py-1 shadow duration-300 ease-in-out hover:bg-slate-200 active:scale-95 dark:border-[#5555555d] dark:hover:bg-dark-blue-600 md:active:scale-50"
        title={`View more details about ${country.name.common}`}
        aria-label={`View more details about ${country.name.common}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Details
      </Link>
    </article>
  );
};
export default CountryCard;
