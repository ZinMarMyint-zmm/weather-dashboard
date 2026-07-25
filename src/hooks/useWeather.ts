import { useState, type ChangeEvent } from "react";
import type {
  WeatherType,
  ForecastType,
  OptionType,
} from "../types/weather";
import { useTheme } from "../context/ThemeContext";

export default function useWeather() {
  // Search input value
  const [search, setSearch] = useState("");

  // City search suggestions
  const [options, setOptions] = useState<OptionType[]>([]);

  // Selected city
  const [city, setCity] = useState<OptionType | null>(null);

  // Weather data
  const [weather, setWeather] = useState<WeatherType | null>(null);

  // Forecast data
  const [forecast, setForecast] = useState<ForecastType | null>(null);

  // Loading state
  // Initially false because we don't want
  // the loader to show when the app first opens.
  const [loading, setLoading] = useState(false);

  const { theme, toggleTheme } = useTheme();

  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  // ------------------------------------
  // Get city search suggestions
  // ------------------------------------
  const getSearchOptions = async (value: string) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${apiKey}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch city options");
      }

      const data: OptionType[] = await response.json();

      setOptions(data);
    } catch (error) {
      console.error("City search error:", error);
      setOptions([]);
    }
  };

  // ------------------------------------
  // Input change
  // ------------------------------------
  const onInputChange = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;

    setSearch(value);

    // If input is empty,
    // remove city suggestions.
    if (value.trim() === "") {
      setOptions([]);
      setCity(null);
      return;
    }

    // Get city suggestions
    getSearchOptions(value);
  };

  // ------------------------------------
  // Get weather data
  // ------------------------------------
  const getWeather = async (
    selectedCity: OptionType,
  ): Promise<WeatherType> => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${selectedCity.lat}&lon=${selectedCity.lon}&units=metric&appid=${apiKey}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data: WeatherType = await response.json();

    console.log("Weather:", data);

    return data;
  };

  // ------------------------------------
  // Get forecast data
  // ------------------------------------
  const getForecast = async (
    selectedCity: OptionType,
  ): Promise<ForecastType> => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${selectedCity.lat}&lon=${selectedCity.lon}&units=metric&appid=${apiKey}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch forecast data");
    }

    const data = await response.json();

    const forecastData: ForecastType = {
      ...data.city,
      list: data.list.slice(0, 7),
    };

    console.log("Forecast:", forecastData);

    return forecastData;
  };

  // ------------------------------------
  // Search button
  // ------------------------------------
  const onSubmit = async () => {
    // Don't search if no city was selected
    if (!city) {
      return;
    }

    try {
      // --------------------------------
      // START LOADING
      // --------------------------------
      setLoading(true);

      // Remove old data while loading
      setWeather(null);
      setForecast(null);

      // --------------------------------
      // Fetch weather and forecast
      // at the same time
      // --------------------------------
      const [weatherData, forecastData] =
        await Promise.all([
          getWeather(city),
          getForecast(city),
        ]);

      // --------------------------------
      // Save new data
      // --------------------------------
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (error) {
      console.error(
        "Error loading weather data:",
        error,
      );
    } finally {
      // --------------------------------
      // STOP LOADING
      // --------------------------------
      setLoading(false);
    }
  };

  // ------------------------------------
  // Select city from suggestion
  // ------------------------------------
  const onOptionSelect = (
    option: OptionType,
  ) => {
    setCity(option);

    setSearch(option.name);

    // Hide suggestions
    setOptions([]);
  };

  // ------------------------------------
  // Return everything to App
  // ------------------------------------
  return {
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
  };
}