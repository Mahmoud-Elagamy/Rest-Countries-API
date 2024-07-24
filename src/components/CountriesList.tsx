import { useEffect, useState } from "react";

// Lucide Library
import { SearchSlash } from "lucide-react";

// Framer Motion Library
import { motion } from "framer-motion";

// Custom Components
import CountryCard from "./CountryCard";
import Pagination from "./Pagination";
import CountrySkeleton from "./CountrySkeleton";

// Types
import { Country } from "../App";
type CountriesList = {
  isDarkMode: boolean;
  filteredCountries: Country[];
  currentRegion: string;
  isLoading: boolean;
  searchQuery: string;
};

const CountriesList = ({
  isDarkMode,
  filteredCountries,
  currentRegion,
  isLoading,
  searchQuery,
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
    startIndex + pageSize
  );

  //* Don't forget to tell Mohab why i modified the logic.
  // const slicedCountries = filteredCountries.slice(
  //   searchQuery.length ? 0 : startIndex,
  //   startIndex + pageSize
  // );

  const countriesToDisplay = searchQuery ? filteredCountries : slicedCountries;

  useEffect(() => {
    setCurrentPage(1);
  }, [currentRegion]);

  if (isLoading) {
    return (
      <div className="container grid gap-5 grid-cols-large-devices md:gap-[77px]">
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
        <section className="countries-list text-sm container grid gap-12 grid-cols-sm-devices place-content-center md:gap-[77px] md:grid-cols-large-devices">
          <h2 className="sr-only">Countries</h2>
          {filteredCountries?.length ? (
            countriesToDisplay.map((country, index) => (
              <CountryCard key={index} country={country} />
            ))
          ) : (
            <motion.p
              className="text-2xl flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SearchSlash />
              No results found for "{searchQuery}" in this region.
            </motion.p>
          )}
        </section>
      </main>
      <footer className="pb-3 pt-12 md:pt-[77px]">
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
