// Custom Components
import CountryCard from "./CountryCard";
import CountrySkeleton from "./skeletons/CountrySkeleton";

// Types
import { Country } from "../App";
import { MotionType } from "../App";
type CountriesList = {
  isDarkMode: boolean;
  displayedCountries: Country[];
  isLoading: boolean;
  motion: MotionType;
  currentPage: number;
  pageSize: number;
};

const CountriesList = ({
  isDarkMode,
  displayedCountries,
  isLoading,
  motion,
  currentPage,
  pageSize,
}: CountriesList) => {
  const startIndex = (currentPage - 1) * pageSize;

  const slicedCountries = displayedCountries.slice(
    startIndex,
    startIndex + pageSize,
  );

  if (isLoading) {
    return (
      <div className="container grid grid-cols-large-devices place-content-center gap-5 md:gap-[77px]">
        <CountrySkeleton isDarkMode={isDarkMode} />
        <CountrySkeleton isDarkMode={isDarkMode} />
        <CountrySkeleton isDarkMode={isDarkMode} />
        <CountrySkeleton isDarkMode={isDarkMode} />
        <CountrySkeleton isDarkMode={isDarkMode} />
        <CountrySkeleton isDarkMode={isDarkMode} />
      </div>
    );
  }

  return (
    <motion.section
      className={`countries-list container text-sm ${
        displayedCountries?.length && "grid"
      } place-content-center gap-12 md:grid-cols-large-devices md:gap-[77px]`}
    >
      <h2 className="sr-only">Countries</h2>
      {displayedCountries?.length &&
        slicedCountries.map((country, index) => (
          <CountryCard key={index} country={country} motion={motion} />
        ))}
    </motion.section>
  );
};

export default CountriesList;
