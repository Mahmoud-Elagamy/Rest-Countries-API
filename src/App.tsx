import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  useState,
  useLayoutEffect,
  useEffect,
  useMemo,
  useCallback,
} from "react";

// Custom Components
import Header from "./components/Header";
import SearchCountries from "./components/SearchCountries";
import FilterCountries from "./components/FilterCountries";
import CountriesList from "./components/CountriesList";
import Pagination from "./components/Pagination";
import CountryDetails from "./components/CountryDetails";
import ErrorPage from "./components/ErrorPage";

import { motion } from "framer-motion";

// Utils
import applyTheme from "./utils/applyTheme";
import debounce from "./utils/debounce";

// Types
export type Country = {
  name: {
    common: string;
    official?: string;
  };

  flags: {
    png: string;
  };

  population: number;
  region: string;
  capital?: string;
  subregion?: string;

  maps?: {
    googleMaps: string;
    openStreetMaps: string;
  };

  currencies?: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };

  languages?: {
    [key: string]: string;
  };

  borders?: [];
  cca3?: string;
  area?: number;
};

export type MotionType = typeof motion;

const countriesPerPageBasedOnBreakPoints = window.innerWidth > 767 ? 12 : 6;

const App = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentRegion, setCurrentRegion] = useState("All Regions");
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(countriesPerPageBasedOnBreakPoints);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handlePreviousPage = () => {
    setCurrentPage((prevState) => prevState - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevState) => prevState + 1);
  };

  const totalPages = Math.ceil(filteredCountries.length / pageSize);

  const displayedCountries = countries.filter(
    (country) =>
      currentRegion === "All Regions" || country.region === currentRegion,
  );

  const filterCountries = useCallback(() => {
    let filtered = countries;

    if (currentRegion !== "All Regions") {
      filtered = filtered.filter((country) => country.region === currentRegion);
    }

    if (searchQuery) {
      filtered = filtered.filter((country) =>
        country.name.common.toLowerCase().startsWith(searchQuery.toLowerCase()),
      );

      setDropdownVisible(true);
    } else {
      setDropdownVisible(false);
    }

    setFilteredCountries(filtered);
  }, [countries, currentRegion, searchQuery]);

  const handleFilterChange = (filter: string) => {
    setCurrentRegion(filter);
  };

  const debouncedFilter = useMemo(() => {
    return debounce(() => {
      filterCountries();
    }, 700);
  }, [filterCountries]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital",
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Country[] = await response.json();

        const wantedCountries = data.filter(
          (country) => country.name.common !== "Israel",
        );

        setCountries(wantedCountries);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const debouncedFetchData = debounce(fetchData, 500);

    debouncedFetchData();

    return () => debouncedFetchData.cancel();
  }, []);

  useEffect(() => {
    setFilteredCountries(countries);
  }, [countries]);

  useLayoutEffect(() => {
    applyTheme(setIsDarkMode);
  }, []);

  useEffect(() => {
    debouncedFilter();
    return () => {
      debouncedFilter.cancel();
    };
  }, [currentRegion, searchQuery, debouncedFilter]);

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
                      handleFilterChange={handleFilterChange}
                    />
                  </section>

                  <CountriesList
                    isDarkMode={isDarkMode}
                    displayedCountries={displayedCountries}
                    isLoading={isLoading}
                    motion={motion}
                    currentPage={currentPage}
                    pageSize={pageSize}
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
