// Lucide Library
import { MapPin } from "lucide-react";

// Types
import { Country } from "./hooks/useCountries";
type CountryDetailsCardProps = {
  country: Country;
  countryLanguages: string;
  currencyKey: string;
  countryBorders: JSX.Element[];
};

function CountryDetailsCard({
  country,
  countryLanguages,
  currencyKey,
  countryBorders,
}: CountryDetailsCardProps) {
  return (
    <article className="flex flex-wrap items-center justify-between">
      <figure className="mb-4">
        <img
          className="h-[225px] rounded-md shadow-md md:h-[300px]"
          src={country.flags.png}
          alt={country.name.common}
          width={innerWidth > 768 ? 380 : 325}
          height={250}
        />
      </figure>
      <div className="flex flex-col gap-6">
        <h3 className="text-3xl font-extrabold">{country?.name.common}</h3>
        <div className="flex flex-wrap gap-10 md:gap-16">
          <div className="space-y-2">
            <p>
              <b>Native Name:</b>{" "}
              <span className="dark:text-gray-400">
                {country?.name.official}
              </span>
            </p>
            <p>
              <b>Population:</b>{" "}
              <span className="dark:text-gray-400">
                {country?.population.toLocaleString()}
              </span>
            </p>
            <p>
              <b>Region:</b>{" "}
              <span className="dark:text-gray-400">{country?.region}</span>
            </p>
            {country?.subregion && (
              <p>
                <b>Sub Region:</b>{" "}
                <span className="dark:text-gray-400">
                  {country?.subregion}{" "}
                </span>
              </p>
            )}
            <p>
              <b>Capital:</b>{" "}
              <span className="dark:text-gray-400">{country?.capital}</span>
            </p>
          </div>
          <div className="space-y-2">
            <p>
              <b>Currencies:</b>{" "}
              <span className="dark:text-gray-400">
                {country?.currencies && country?.currencies[currencyKey]?.name}{" "}
                {country?.currencies &&
                  country?.currencies[currencyKey]?.symbol}
              </span>
            </p>
            <p>
              <b>Languages:</b>{" "}
              <span className="dark:text-gray-400">{countryLanguages}</span>
            </p>
            <p>
              <b>Area:</b> {country?.area?.toLocaleString()} <sup>km²</sup>
            </p>
            {country?.maps && (
              <a
                className="flex items-center gap-1 text-neutral-600 underline underline-offset-2 duration-300 ease-in-out hover:text-neutral-800 dark:text-gray-400 hover:dark:text-gray-300"
                href={country?.maps.googleMaps}
                target="_blank"
                title={`Location of ${country?.name.common}`}
                aria-label={`Location of ${country?.name.common}`}
              >
                <b>Location:</b> <MapPin size={20} />
              </a>
            )}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <b className="mb-1 block">Border Countries:</b>{" "}
          {country.borders?.length ? (
            <div className="flex flex-wrap items-center justify-center gap-2">
              {countryBorders}
            </div>
          ) : (
            <p>No border countries for this country.</p>
          )}
        </div>
      </div>
    </article>
  );
}

export default CountryDetailsCard;
