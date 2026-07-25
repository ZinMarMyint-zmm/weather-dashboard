import type { ChangeEvent } from "react";

type Props = {
  search: string;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
};

export default function SearchBar({ search, onInputChange, onSubmit }: Props) {
  return (
    <>
      <main>
        <form className="max-w-md mx-auto">
          <label
            htmlFor="search"
            className="block mb-2.5 text-sm font-medium text-heading sr-only "
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 inset-s-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              value={search}
              onChange={onInputChange}
              type="text"
              id="search"
              className="block w-full dark:text-white dark:placeholder:text-gray-300 py-3 pl-10 pr-28 border border-default-medium text-heading text-sm rounded-base shadow-xs"
              placeholder="Enter City Name"
            />
            <button
              type="button"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-5 py-2 rounded-lg bg-blue-300 text-blue-900 hover:bg-blue-600"
              onClick={onSubmit}
            >
              Search
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
