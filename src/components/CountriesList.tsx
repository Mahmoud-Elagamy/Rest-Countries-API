// Custom Components
import CountryCard from "./CountryCard";
import CountrySkeleton from "./skeletons/CountrySkeleton";

import { COUNTRIES_PER_PAGE } from "../utils/constants";
import useCountriesContext from "../hooks/useCountries";

// Types
import { Country } from "../types/country";
import { MotionType } from "../App";
type CountriesListProps = {
  isDarkMode: boolean;
  displayedCountries: Country[];
  motion: MotionType;
  currentPage: number;
};

const CountriesList = ({
  isDarkMode,
  displayedCountries,
  motion,
  currentPage,
}: CountriesListProps) => {
  const { isLoading } = useCountriesContext();
  const startIndex = (currentPage - 1) * COUNTRIES_PER_PAGE;

  const slicedCountries = displayedCountries.slice(
    startIndex,
    startIndex + COUNTRIES_PER_PAGE,
  );

  if (isLoading) {
    return (
      <div className="container grid grid-cols-main-grid place-content-center gap-5 md:gap-[77px]">
        {Array.from({ length: 10 }).map((_, index) => (
          <CountrySkeleton key={index} isDarkMode={isDarkMode} />
        ))}
      </div>
    );
  }

  return (
    <motion.section
      className={`countries-list container text-sm ${
        displayedCountries?.length && "grid"
      } place-content-center gap-12 md:grid-cols-alt-grid md:gap-[77px] xl:grid-cols-main-grid`}
    >
      <h2 className="sr-only">Countries</h2>
      {!!displayedCountries?.length &&
        slicedCountries.map((country, index) => (
          <CountryCard key={index} country={country} motion={motion} />
        ))}
    </motion.section>
  );
};

export default CountriesList;
