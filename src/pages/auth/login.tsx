import ZenithBee from "../../assets/ui/zenithbee.png";
import EmailSvg from "../../assets/svg/email";
import PasswordSvg from "../../assets/svg/password";
import { z } from "zod";
import { account } from "../../appwrite";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTransition } from "react";
import { handleLoginError } from "../../utils/functions/login-error";

type loginSchemaType = z.infer<typeof loginSchema>;

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(1, { message: "Please enter your password" }),
});

export default function Login() {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const form = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const login = async (data: loginSchemaType) => {
    try {
      if (Object.keys(form.formState.errors).length > 0) return;

      const { email, password } = data;

      startTransition(async () => {
        try {
          const session = await account.createEmailPasswordSession(
            email,
            password,
          );
          localStorage.setItem("session", JSON.stringify(session.current));

          const acc = await account.get();
          localStorage.setItem("name", JSON.stringify(acc.name));
          localStorage.setItem("email", JSON.stringify(acc.email));
          localStorage.setItem("joined", JSON.stringify(acc.$createdAt));

          toast.success("Logged in successfully!");
          navigate("/");
        } catch (error) {
          handleLoginError(error);
        }
      });
    } catch (error) {
      handleLoginError(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="3xl:w-1/3 3xl:p-14 bg-primary-color dark:bg-primary-dark-color mx-auto my-2 flex w-full flex-col justify-center rounded-2xl p-8 shadow-xl md:w-1/2 md:p-10 xl:w-2/5 2xl:w-2/5 2xl:p-12">
        <div className="mx-auto flex flex-col items-center justify-center gap-3 pb-4">
          <div>
            <img
              src={ZenithBee}
              alt="Logo"
              width="63"
              className="dark:brightness-100 dark:invert"
            />
          </div>

          <h1 className="my-auto text-3xl font-bold dark:text-white">
            ZenithBee
          </h1>
        </div>
        <div className="mx-auto pb-8 text-base font-light text-[#6B7280]">
          Login to your account on ZenithBee.
        </div>

        <form className="flex flex-col" onSubmit={form.handleSubmit(login)}>
          <div className="pb-2">
            <label htmlFor="email" className="mb-2 block text-base font-medium">
              Email
            </label>
            <div className="relative text-gray-400">
              {EmailSvg()}
              <input
                type="email"
                {...form.register("email")}
                id="email"
                className="mb-2 block w-full rounded-lg rounded-l-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-3 pl-12 text-gray-600 ring-3 ring-transparent focus:border-transparent focus:ring-1 focus:ring-gray-400 focus:outline-hidden sm:text-sm"
                placeholder="name@company.com"
              />
            </div>
            <span className="h-6 text-red-500">
              {form.formState.errors.email?.message}
            </span>
          </div>
          <div className="pb-6">
            <label
              htmlFor="password"
              className="mb-2 block text-base font-medium"
            >
              Password
            </label>
            <div className="relative text-gray-400">
              {PasswordSvg()}
              <input
                type="password"
                {...form.register("password")}
                id="password"
                placeholder="••••••••••"
                className="mb-2 block w-full rounded-lg rounded-l-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-3 pl-12 text-gray-600 ring-3 ring-transparent focus:border-transparent focus:ring-1 focus:ring-gray-400 focus:outline-hidden sm:text-sm"
              />
            </div>
            <span className="h-6 text-red-500">
              {form.formState.errors.password?.message}
            </span>
          </div>
          <button
            type="submit"
            className="focus:ring-primary-300 bg-accent-color dark:bg-accent-dark-color mb-6 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:ring-4 focus:outline-hidden disabled:bg-gray-500"
            disabled={isPending}
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
          <div className="text-base font-light text-[#6B7280]">
            Don't have an account yet?{" "}
            <a
              onClick={() => navigate("/register")}
              className="text-accent-color dark:text-accent-dark-color cursor-pointer font-medium hover:underline"
            >
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
