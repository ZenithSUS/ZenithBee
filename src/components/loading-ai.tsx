export const LoadingDots = () => (
  <div className="mt-1 flex space-x-1">
    <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400"></div>
    <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400 delay-150"></div>
    <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400 delay-300"></div>
  </div>
);

export default LoadingDots;
