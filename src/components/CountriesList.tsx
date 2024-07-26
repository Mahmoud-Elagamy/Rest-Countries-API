import { useEffect, useState } from "react";

// Lucide Library
import { SearchSlash } from "lucide-react";

// Custom Components
import CountryCard from "./CountryCard";
import Pagination from "./Pagination";
import CountrySkeleton from "./skeletons/CountrySkeleton";

// Types
import { Country } from "../App";
import { MotionType } from "../App";
type CountriesList = {
  isDarkMode: boolean;
  filteredCountries: Country[];
  currentRegion: string;
  isLoading: boolean;
  searchQuery: string;
  motion: MotionType;
};

const CountriesList = ({
  isDarkMode,
  filteredCountries,
  currentRegion,
  isLoading,
  searchQuery,
  motion,
}: CountriesList) => {
  const countriesPerPageBasedOnBreakPoints = window.innerWidth > 767 ? 12 : 6;

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(countriesPerPageBasedOnBreakPoints);

  const handlePreviousPage = () => {
    setCurrentPage((prevState) => prevState - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevState) => prevState + 1);
  };

  const totalPages = Math.ceil(filteredCountries.length / pageSize);

  const startIndex = (currentPage - 1) * pageSize;

  const slicedCountries = filteredCountries.slice(
    startIndex,
    startIndex + pageSize,
  );

  const countriesToDisplay = searchQuery ? filteredCountries : slicedCountries;

  useEffect(() => {
    setCurrentPage(1);
  }, [currentRegion]);

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
    <>
      <main>
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
      </main>
      <footer className="pb-3 pt-10">
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
          />
        )}
      </footer>
    </>
  );
};

export default CountriesList;
