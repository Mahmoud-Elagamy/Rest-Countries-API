import { useEffect, useMemo, useState, useCallback } from "react";

import { useParams, useNavigate, Link } from "react-router-dom";

// Lucide Library
import { ArrowBigLeft } from "lucide-react";

// Custom Components
import CountryDetailsCard from "./CountryDetailsCard";
import CountryDetailsSkeleton from "./skeletons/CountryDetailsSkeleton";

// Custom Hooks
import useCountriesContext from "../hooks/useCountries";

// Types
import { MotionType } from "../App";
import { Country } from "../types/country";
type CountryDetailsProps = {
  isDarkMode: boolean;
  motion: MotionType;
};

function CountryDetails({ isDarkMode, motion }: CountryDetailsProps) {
  const { countries, getCountryByName, isLoading, setIsLoading } =
    useCountriesContext();

  const [country, setCountry] = useState<Country | null>(null);
  const [borderCountries, setBorderCountries] = useState<Country[]>([]);

  const { countryName } = useParams();
  const navigate = useNavigate();

  const getBorderCountries = useCallback(
    async (borders: string[]) => {
      if (!borders?.length) return [];
      const borderData = borders
        .map((code) => countries.find((country) => country.cca3 === code))
        .filter((country) => country !== undefined);
      return borderData;
    },
    [countries],
  );

  const countryLanguages = useMemo(() => {
    return Object.keys(country?.languages || {})
      .map((key) => country?.languages && country?.languages[key])
      .join(", ");
  }, [country]);

  const currencyKey = useMemo(() => {
    return Object.keys(country?.currencies || {}).join("");
  }, [country]);

  const countryBorders = useMemo(() => {
    return borderCountries?.map((country: Country) => (
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
    const loadCountryData = async () => {
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 200));

      const selectedCountry = getCountryByName(
        countryName?.replace(/-/g, " ") || "",
      );

      if (selectedCountry) {
        setCountry(selectedCountry);

        const borderData = await getBorderCountries(
          selectedCountry.borders || [],
        );
        setBorderCountries(borderData);
      }

      setIsLoading(false);
    };

    loadCountryData();
  }, [countryName, getCountryByName, getBorderCountries, setIsLoading]);

  useEffect(() => {
    if (country) {
      document.title = `${country?.name.common}`;
    } else {
      document.title = "Loading country details...";
    }
  }, [country]);

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
