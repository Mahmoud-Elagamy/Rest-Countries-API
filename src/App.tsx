import { useState, useLayoutEffect, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";

// Custom Components
import Header from "./components/Header";
import SearchCountries from "./components/SearchCountries";
import FilterCountries from "./components/FilterCountries";
import CountriesList from "./components/CountriesList";
import Pagination from "./components/Pagination";
import CountryDetails from "./components/CountryDetails";
import ErrorPage from "./components/ErrorPage";

// Custom Hooks
import useCountriesContext from "./hooks/useCountries";

// Utils
import applyTheme from "./utils/applyTheme";
import { COUNTRIES_PER_PAGE } from "./utils/constants";

// Types
export type MotionType = typeof motion;

const App = () => {
  const { countries, currentRegion } = useCountriesContext();

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
    () => Math.ceil(displayedCountries.length / COUNTRIES_PER_PAGE),
    [displayedCountries.length],
  );

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
                <main className="min-h-[1264px]">
                  <section className="flex-center-between container relative mb-10">
                    <h2 className="sr-only">
                      Search for a country and filter by region
                    </h2>
                    <SearchCountries motion={motion} />
                    <FilterCountries />
                  </section>

                  <CountriesList
                    isDarkMode={isDarkMode}
                    displayedCountries={displayedCountries}
                    motion={motion}
                    currentPage={currentPage}
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
            element={<CountryDetails isDarkMode={isDarkMode} motion={motion} />}
          />
          <Route path="*" element={<ErrorPage motion={motion} />} />
        </Routes>
      </Router>
    </div>
  );
};
export default App;
