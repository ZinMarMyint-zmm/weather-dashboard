import { WiMoonAltThirdQuarter, WiDaySunny } from "react-icons/wi";

type Props = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

export default function ThemeToggle({ theme, toggleTheme }: Props) {
  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />

      <div
        className="
          relative
          w-11
          h-6
          bg-gray-300
          rounded-full
          transition-colors
          peer-checked:bg-blue-600

          after:content-['']
          after:absolute
          after:top-0.5
          after:left-0.5
          after:w-5
          after:h-5
          after:bg-white
          after:rounded-full
          after:transition-all

          peer-checked:after:translate-x-5
        "
      />

      <span className="ml-2 text-2xl text-gray-800 dark:text-white">
        {theme === "dark" ? <WiMoonAltThirdQuarter /> : <WiDaySunny />}
      </span>
    </label>
  );
}
