import { useState } from "react";
import { Link } from "react-router-dom";

const CountryCard = ({ country }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      className={`country-card bg-white dark:bg-dark-blue-500 shadow-light-box-shadow dark:shadow-dark-box-shadow rounded-md transition-[background-color,box-shadow,transform] duration-300 ease-in-out ${
        isHovered && "-translate-y-2"
      }`}
    >
      <figure className="mb-4">
        <img
          className="rounded-tr-md rounded-tl-md h-[160px]"
          src={country.flags.png}
          alt={country.name.common}
          loading="lazy"
          width={250}
          height={160}
        />
      </figure>
      <div className="p-2 font-bold">
        <h3 className="font-extrabold mb-2 tracking-wide text-lg max-w-[234px] text-balance">
          {country.name.common}
        </h3>
        <p>
          Population:{" "}
          <span className="dark:text-zinc-300 font-normal">
            {country.population.toLocaleString()}
          </span>
        </p>
        <p>
          Region:{" "}
          <span className="dark:text-zinc-300 font-normal">
            {country.region}
          </span>
        </p>
        <p>
          Capital:{" "}
          <span className="dark:text-zinc-300 font-normal">
            {country.capital}
          </span>
        </p>
      </div>
      <Link
        to={`/country/${country.name.common.replaceAll(" ", "")}`}
        className=" block mr-2 mb-2 py-1 px-2 w-fit ml-auto border border-slate-[#ccc] dark:border-[#5555555d] rounded-md shadow cursor-pointer duration-300 ease-in-out hover:bg-slate-200 dark:hover:bg-dark-blue-600 active:scale-95  md:active:scale-50"
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
