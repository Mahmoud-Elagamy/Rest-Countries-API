import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

// Lucide Library
import { ArrowBigLeft, MapPin } from "lucide-react";

// Custom Components
import CountryDetailsSkeleton from "./skeletons/CountryDetailsSkeleton";

// Utils
import debounce from "../utils/debounce";

// Types
import { Country, MotionType } from "../App";
type CountryDetailsProps = {
  isLoading: boolean;
  isDarkMode: boolean;
  motion: MotionType;
};

function CountryDetails({
  isLoading,
  isDarkMode,
  motion,
}: CountryDetailsProps) {
  const { countryName } = useParams();
  const [country, setCountry] = useState<Country | null>(null);
  const [borderCountries, setBorderCountries] = useState<Country[]>([]);
  const navigate = useNavigate();

  const fetchBorderCountries = async (borders: string[]) => {
    if (!borders?.length) return [];

    const borderCodes = borders.join(",");
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha?codes=${borderCodes}`,
    );
    const borderData = await response.json();
    return borderData.filter(
      (country: Country) => country.name.common !== "Israel",
    );
  };

  const countryLanguages = useMemo(() => {
    return Object.keys(country?.languages || {})
      .map((key) => country?.languages && country?.languages[key])
      .join(", ");
  }, [country]);

  const currencyKey = useMemo(() => {
    return Object.keys(country?.currencies || {}).join("");
  }, [country]);

  const countryBorders = useMemo(() => {
    return borderCountries.map((country: Country) => (
      <Link
        to={`/country/${country.name.common.replace(/\s+/g, "-")}`}
        key={country.cca3}
        className="rounded-md bg-slate-100 px-3 py-1 shadow duration-300 ease-in-out hover:-translate-y-1 dark:bg-dark-blue-500"
      >
        {country.name.common}
      </Link>
    ));
  }, [borderCountries]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${countryName?.replace(/-/g, " ")}`,
      );
      const data = await response.json();
      setCountry(data[0]);
      const borderCountries = await fetchBorderCountries(data[0].borders);
      setBorderCountries(borderCountries);
    };

    const debouncedFetchData = debounce(fetchData, 500);

    debouncedFetchData();

    return () => debouncedFetchData.cancel();
  }, [countryName]);

  if (!country || isLoading) {
    return (
      <div className="container">
        <CountryDetailsSkeleton isDarkMode={isDarkMode} />
      </div>
    );
  }

  return (
    <motion.main
      className="pb-6 dark:text-gray-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <section className="container">
        <h2 className="sr-only">Country Details</h2>
        <button
          className="mb-8 flex items-center gap-2 rounded-md bg-white px-3 py-1 tracking-wide shadow-md duration-300 ease-in-out hover:-translate-x-1 dark:bg-dark-blue-500"
          type="button"
          title="Back to previous page"
          onClick={() => navigate(-1)}
        >
          <ArrowBigLeft size={20} />
          Back
        </button>
        <article className="flex flex-wrap items-center justify-between">
          <figure className="mb-4">
            <img
              className="h-[225px] md:h-[300px]"
              src={country.flags.png}
              alt={country.name.common}
              width={innerWidth > 768 ? 380 : 325}
              height={250}
              loading="lazy"
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
                    {country?.currencies &&
                      country?.currencies[currencyKey]?.name}{" "}
                    {country?.currencies &&
                      country?.currencies[currencyKey]?.symbol}
                  </span>
                </p>
                <p>
                  <b>Languages:</b>{" "}
                  <span className="dark:text-gray-400">{countryLanguages}</span>
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
                <p>
                  <b>Area:</b> {country?.area?.toLocaleString()} <sup>km²</sup>
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <b className="mb-1 block">Border Countries:</b>{" "}
              {countryBorders.length ? (
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {countryBorders}
                </div>
              ) : (
                <p>No border countries for this country.</p>
              )}
            </div>
          </div>
        </article>
      </section>
    </motion.main>
  );
}

export default CountryDetails;
