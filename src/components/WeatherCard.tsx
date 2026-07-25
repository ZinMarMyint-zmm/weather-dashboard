import { WiHumidity, WiThermometer, WiStrongWind } from "react-icons/wi";
import type { WeatherType } from "../types/weather";

type Props = {
  weather: WeatherType;
};
export default function WeatherCard({ weather }: Props) {
  return (
    <div className="flex md:flex-row flex-col gap-4 justify-center mb-5">
      <div className="w-full md:flex-1 bg-white p-6 rounded-2xl shadow">
        <div className="flex flex-col items-center">
          <WiThermometer className="text-5xl mb-2" />

          <h2 className="text-lg">Temperature</h2>

          <p className="md:text-3xl text-2xl font-bold">{weather.main.temp}°</p>
        </div>
      </div>
      <div className="w-full md:flex-1 bg-white p-6 rounded-2xl shadow">
        <div className="flex flex-col items-center">
          <WiHumidity className="text-5xl mb-2" />

          <h2 className="text-lg">Humidity</h2>

          <p className="md:text-3xl text-2xl font-bold">
            {weather.main.humidity}%
          </p>
        </div>
      </div>

      <div className="w-full md:flex-1 bg-white p-6 rounded-2xl shadow">
        <div className="flex flex-col items-center">
          <WiStrongWind className="text-5xl mb-2" />

          <h2 className="text-lg">Wind</h2>

          <p className="md:text-3xl text-2xl font-bold">
            {weather.wind.speed} km/h
          </p>
        </div>
      </div>
    </div>
  );
}
