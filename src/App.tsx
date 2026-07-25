import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import ThemeToggle from "./components/ThemeToggle";
import Hero from "./components/Hero";
import Loader from "./components/Loader";
import useWeather from "./hooks/useWeather";
import type { OptionType } from "./types/weather";

function App() {
  const {
    loading,
    search,
    options,
    weather,
    forecast,
    theme,
    toggleTheme,
    onSubmit,
    onInputChange,
    onOptionSelect,
  } = useWeather();

  return (
    <div className="container-fluid bg-blue-300 dark:bg-gray-700 flex md:flex-row flex-col min-h-screen">
      <div className="basis-1/4 bg-blue-500 bg-[url('./assets/weather-theme-bg.jpeg')] bg-cover bg-center min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center pb-15">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white dark:text-gray-200 text-center">
            Weather Dashboard
          </h1>

          <div className="relative w-full max-w-4xl flex justify-center pt-10">
            <SearchBar
              onInputChange={onInputChange}
              search={search}
              onSubmit={onSubmit}
            />
            <ul className="absolute top-full left-1 right-1 bg-white rounded-b-lg shadow-lg z-50">
              {options.map((option: OptionType, index: number) => (
                <li key={option.name + "-" + index}>
                  <button
                    className="text-left text-sm w-full hover:bg-blue-300 hover:text-white px-3 py-1"
                    onClick={() => onOptionSelect(option)}
                  >
                    {option.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="basis-3/4 w-full flex flex-col  min-h-screen">
        <div className="flex justify-end gap-4 p-6">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
        <div className="flex flex-row gap-3 md:my-10 my-5 justify-center align-middle">
          {forecast && !loading && (
            <h2 className="md:text-3xl text-2xl font-extrabold text-blue-700 dark:text-blue-200">
              {forecast.name},{" "}
              <span className="font-thin">{forecast.country}</span>
            </h2>
          )}
        </div>
        {loading ? (
          <div className="w-full flex justify-center items-center mt-20">
            <Loader />
          </div>
        ) : (
          <>
            {!weather && (
              <div className="w-full max-w-4xl mx-auto px-4 mt-8">
                <Hero />
              </div>
            )}

            <div className="w-full max-w-4xl mx-auto px-4 mt-8">
              {weather && <WeatherCard weather={weather} />}
            </div>
            <div className="w-full max-w-4xl mx-auto px-4 mt-8">
              {forecast && <ForecastCard forecast={forecast} />}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
