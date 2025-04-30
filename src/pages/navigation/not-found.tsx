import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5">
      <h1 className="text-2xl font-bold">
        The page you try to navigate dosen't exist
      </h1>
      <p className="text-md">404</p>
      <Link to="/">Go Back Home</Link>
    </div>
  );
}
