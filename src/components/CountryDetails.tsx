import { useEffect, useMemo, useState } from "react";

import { useParams, useNavigate, Link } from "react-router-dom";

// Lucide Library
import { ArrowBigLeft } from "lucide-react";

// Custom Components
import CountryDetailsCard from "./CountryDetailsCard";
import CountryDetailsSkeleton from "./skeletons/CountryDetailsSkeleton";

// Utils
import debounce from "../utils/debounce";

// Types
import { MotionType } from "../App";
import { Country } from "./hooks/useCountries";
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
        <CountryDetailsCard
          country={country}
          countryLanguages={countryLanguages}
          currencyKey={currencyKey}
          countryBorders={countryBorders}
        ></CountryDetailsCard>
      </section>
    </motion.main>
  );
}

export default CountryDetails;
