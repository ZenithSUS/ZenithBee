import { FaSadCry } from "react-icons/fa";

export default function Error() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5">
      <FaSadCry className="text-8xl" />
      <h1 className="text-center text-2xl font-bold">Something went wrong</h1>
      <p className="text-md">500</p>
      <button
        onClick={() => window.location.reload()}
        className="cursor-pointer"
      >
        Refresh Page
      </button>
    </div>
  );
}
