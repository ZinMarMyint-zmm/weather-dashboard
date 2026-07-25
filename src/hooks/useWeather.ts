import { useEffect, useState, type ChangeEvent } from "react";
import type { WeatherType, ForecastType, OptionType } from "../types/weather";
import { useTheme } from "../context/ThemeContext";

export default function useWeather() {
  const [search, setSearch] = useState<string>("");
  const [options, setOptions] = useState<[]>([]);
  const [city, setCity] = useState<OptionType | null>(null);
  const [weather, setWeather] = useState<WeatherType | null>(null);
  const [forecast, setForecast] = useState<ForecastType | null>(null);
  const [loading, setLoading] = useState();
  const { theme, toggleTheme } = useTheme();

  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const getSearchOptions = (value: string) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${apiKey}`,
    )
      .then((res) => res.json())
      .then((data) => setOptions(data));
  };
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setSearch(value);

    if (value === "") return;

    getSearchOptions(value);
  };

  const getWeather = async (city: OptionType) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${apiKey}`,
      );

      const data = await response.json();

      console.log("Weather:", data);

      setWeather(data);
    } catch (error) {
      console.error("Weather error:", error);
    }
  };

  const getForecast = async (city: OptionType) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${apiKey}`,
      );

      const data = await response.json();

      const forecastData = {
        ...data.city,
        list: data.list.slice(0, 7),
      };

      console.log("Forecast:", forecastData);

      setForecast(forecastData);
    } catch (error) {
      console.error("Forecast error:", error);
    }
  };

  const onSubmit = () => {
    if (!city) return;
    getForecast(city);
    getWeather(city);
  };

  const onOptionSelect = (option: OptionType) => {
    setCity(option);
    // fetch(
    //   `https://api.openweathermap.org/data/2.5/weather?lat=${option.lat}&lon=${option.lon}&appid=${apiKey}`,
    // ).then((res) => res.json().then((data) => console.log({ data })));
  };

  useEffect(() => {
    if (city) {
      setSearch(city.name);
      setOptions([]);
    }
  }, [city]);
  return {
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
