import type { ForecastType } from "../types/weather";

type Props = {
  forecast: ForecastType;
};

export default function ForecastCard({ forecast }: Props) {
  return (
    <>
      <div className="bg-white flex justify-center overflow-x-scroll my-5 rounded-2xl">
        <div className="w-full max-w-4xl p-5 shadow-xs">
          <div className="flex flex-row gap-5">
            {forecast.list.map((item, i) => (
              <div
                key={i}
                className="bg-white inline-block text-center w-24 shrink-0"
              >
                <p className="text-sm">
                  {i === 0
                    ? "Now"
                    : new Date(item.dt * 1000).getHours() + ":00"}
                </p>
                <img
                  className="w-14 h-14 mx-auto"
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt={`weather-icon-${item.weather[0].description}`}
                />

                <p className="text-sm">
                  feels{" "}
                  <span className="font-bold">{item.main.feels_like}°</span>
                </p>
                <p className="text-sm">
                  humidity{" "}
                  <span className="font-bold">{item.main.humidity}%</span>
                </p>
                <p className="text-sm">
                  temp <span className="font-bold">{item.main.temp}°</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
