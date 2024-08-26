import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useState, useLayoutEffect, useEffect, useMemo } from "react";

// Custom Components
import Header from "./components/Header";
import SearchCountries from "./components/SearchCountries";
import FilterCountries from "./components/FilterCountries";
import CountriesList from "./components/CountriesList";
import Pagination from "./components/Pagination";
import CountryDetails from "./components/CountryDetails";
import ErrorPage from "./components/ErrorPage";

// Custom Hooks
import useCountries from "./components/hooks/useCountries";

import { motion } from "framer-motion";

// Utils
import applyTheme from "./utils/applyTheme";

// Types
export type MotionType = typeof motion;

const CountriesPerPage = window.innerWidth > 767 ? 12 : 6;

const App = () => {
  const {
    countries,
    filteredCountries,
    currentRegion,
    setCurrentRegion,
    searchQuery,
    setSearchQuery,
    isLoading,
    setIsLoading,
    isDropdownVisible,
    setDropdownVisible,
  } = useCountries();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePreviousPage = () => {
    setCurrentPage((prevState) => prevState - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevState) => prevState + 1);
  };

  const displayedCountries = useMemo(
    () =>
      countries.filter(
        (country) =>
          currentRegion === "All Regions" || country.region === currentRegion,
      ),
    [countries, currentRegion],
  );

  const totalPages = useMemo(
    () => Math.ceil(displayedCountries.length / CountriesPerPage),
    [displayedCountries.length],
  );

  const handleRegionChange = (region: string) => {
    setCurrentRegion(region);
  };

  useLayoutEffect(() => {
    applyTheme(setIsDarkMode);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [currentRegion]);

  return (
    <div className="app min-h-screen bg-dark-gray-600 text-dark-blue-700 transition-[background-color] duration-300 ease-in-out dark:bg-dark-blue-600 dark:text-white">
      <Router>
        <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <main>
                  <section className="flex-center-between container relative mb-10">
                    <h2 className="sr-only">
                      Search for a country and filter by region
                    </h2>
                    <SearchCountries
                      setSearchQuery={setSearchQuery}
                      searchQuery={searchQuery}
                      isDropdownVisible={isDropdownVisible}
                      setDropdownVisible={setDropdownVisible}
                      filteredCountries={filteredCountries}
                      motion={motion}
                    />
                    <FilterCountries
                      currentRegion={currentRegion}
                      setCurrentRegion={setCurrentRegion}
                      handleRegionChange={handleRegionChange}
                    />
                  </section>

                  <CountriesList
                    isDarkMode={isDarkMode}
                    displayedCountries={displayedCountries}
                    isLoading={isLoading}
                    motion={motion}
                    currentPage={currentPage}
                    pageSize={CountriesPerPage}
                  />
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
            }
          ></Route>
          <Route
            path="/country/:countryName"
            element={
              <CountryDetails
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                isDarkMode={isDarkMode}
                motion={motion}
              />
            }
          />
          <Route path="*" element={<ErrorPage motion={motion} />} />
        </Routes>
      </Router>
    </div>
  );
};
export default App;
