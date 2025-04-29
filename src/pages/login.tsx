import ZenithBee from "../assets/ui/zenithbee.png";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="3xl:w-1/3 3xl:p-14 mx-auto my-2 flex w-full flex-col justify-center rounded-2xl bg-[#ffffff] p-8 shadow-xl md:w-1/2 md:p-10 xl:w-2/5 2xl:w-2/5 2xl:p-12">
        <div className="mx-auto flex flex-col items-center justify-center gap-3 pb-4">
          <div>
            <img src={ZenithBee} alt="Logo" width="63" />
          </div>

          <h1 className="my-auto text-3xl font-bold text-[#4B5563]">
            ZenithBee
          </h1>
        </div>
        <div className="mx-auto pb-8 text-base font-light text-[#6B7280]">
          Login to your account on ZenithBee.
        </div>

        <form className="flex flex-col">
          <div className="pb-2">
            <label
              htmlFor="email"
              className="mb-2 block text-base font-medium text-[#111827]"
            >
              Email
            </label>
            <div className="relative text-gray-400">
              <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-mail"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              </span>
              <input
                type="email"
                name="email"
                id="email"
                className="mb-2 block w-full rounded-lg rounded-l-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-3 pl-12 text-gray-600 ring-3 ring-transparent focus:border-transparent focus:ring-1 focus:ring-gray-400 focus:outline-hidden sm:text-sm"
                placeholder="name@company.com"
              />
            </div>
          </div>
          <div className="pb-6">
            <label
              htmlFor="password"
              className="mb-2 block text-base font-medium text-[#111827]"
            >
              Password
            </label>
            <div className="relative text-gray-400">
              <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-square-asterisk"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                  <path d="M12 8v8"></path>
                  <path d="m8.5 14 7-4"></path>
                  <path d="m8.5 10 7 4"></path>
                </svg>
              </span>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••••"
                className="mb-2 block w-full rounded-lg rounded-l-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-3 pl-12 text-gray-600 ring-3 ring-transparent focus:border-transparent focus:ring-1 focus:ring-gray-400 focus:outline-hidden sm:text-sm"
              />
            </div>
          </div>
          <button
            type="submit"
            className="focus:ring-primary-300 mb-6 w-full rounded-lg bg-[#FF5C28] px-5 py-2.5 text-center text-sm font-medium text-[#FFFFFF] focus:ring-4 focus:outline-hidden"
          >
            Login
          </button>
          <div className="text-base font-light text-[#6B7280]">
            Don't have an accout yet?{" "}
            <a
              onClick={() => navigate("/register")}
              className="cursor-pointer font-medium text-[#FF5C28] hover:underline"
            >
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
