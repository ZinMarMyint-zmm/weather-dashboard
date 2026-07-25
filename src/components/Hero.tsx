export default function Hero() {
  return (
    <div className="flex justify-center align-middle my-5">
      <div className="bg-white dark:bg-gray-800 dark:text-white w-full max-w-xl p-5 rounded-2xl shadow-xs">
        <h1 className="text-xl font-bold">Welcome to Weather Dashboard!</h1>
        <p className="text-sm font-bold">🌤️ No weather data yet</p>
        <p>Search for a city to see the current weather and hourly forecast.</p>
      </div>
    </div>
  );
}
