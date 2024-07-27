// Lucide Library
import { SearchSlash } from "lucide-react";

// Custom Components
import CountryCard from "./CountryCard";
import CountrySkeleton from "./skeletons/CountrySkeleton";

// Types
import { Country } from "../App";
import { MotionType } from "../App";
type CountriesList = {
  isDarkMode: boolean;
  filteredCountries: Country[];
  isLoading: boolean;
  searchQuery: string;
  motion: MotionType;
  currentPage: number;
  pageSize: number;
};

const CountriesList = ({
  isDarkMode,
  filteredCountries,
  isLoading,
  searchQuery,
  motion,
  currentPage,
  pageSize,
}: CountriesList) => {
  const startIndex = (currentPage - 1) * pageSize;

  const slicedCountries = filteredCountries.slice(
    startIndex,
    startIndex + pageSize,
  );

  const countriesToDisplay = searchQuery ? filteredCountries : slicedCountries;

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
        filteredCountries?.length && "grid"
      } place-content-center gap-12 md:grid-cols-large-devices md:gap-[77px]`}
    >
      <h2 className="sr-only">Countries</h2>
      {filteredCountries?.length ? (
        countriesToDisplay.map((country, index) => (
          <CountryCard key={index} country={country} motion={motion} />
        ))
      ) : (
        <motion.p
          className="flex items-center justify-center gap-2 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <SearchSlash size={16} />
          No results found for "{searchQuery}" in this region.
        </motion.p>
      )}
    </motion.section>
  );
};

export default CountriesList;
