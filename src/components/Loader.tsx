import type { LoadingSpinnerType } from "../types/weather";

export default function Loader({
  size = "md",
  color = "text-blue-600",
  message = "Loading...",
}: LoadingSpinnerType) {
  const sizeClasses = {
    sm: "h-6 w-6 border-2",
    md: "h-10 w-10 border-4",
    lg: "h-16 w-16 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-3">
      <div
        className={`
          ${sizeClasses[size]} 
          ${color} 
          animate-spin 
          rounded-full 
          border-t-transparent 
          border-current
        `}
        role="status"
        aria-label="loading"
      />

      {/* Optional Loading Text */}
      {message && (
        <span className="text-sm font-medium text-gray-500 animate-pulse">
          {message}
        </span>
      )}
    </div>
  );
}
