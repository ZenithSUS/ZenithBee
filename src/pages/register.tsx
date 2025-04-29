import { z } from "zod";
import { ID } from "appwrite";
import { account } from "../appwrite";
import { useNavigate } from "react-router-dom";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createUser } from "../actions/users";
import ZenithBee from "../assets/ui/zenithbee.png";
import UserSvg from "../assets/svg/user";
import EmailSvg from "../assets/svg/email";
import PasswordSvg from "../assets/svg/password";

type registerSchemaType = z.infer<typeof registerSchema>;

const registerSchema = z
  .object({
    firstName: z.string().min(1, { message: "First Name is required" }),
    middleName: z.string().optional(),
    lastName: z.string().min(1, { message: "Last Name is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Email is invalid" }),
    password: z.string().min(8, { message: "Password requires 8 characters" }),
    confirmpassword: z
      .string()
      .min(1, { message: "Confirm password is required " }),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"],
  });

export default function Register() {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const form = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
  });

  const registerAcc = async (data: registerSchemaType) => {
    try {
      if (Object.keys(form.formState.errors).length > 0) return;
      console.log(data);
      startTransition(async () => {
        const fullName = `${data.firstName} ${data.middleName} ${data.lastName}`;

        const acc = await account.create(
          ID.unique(),
          data.email,
          data.password,
          fullName,
        );

        const session = await account.createEmailPasswordSession(
          data.email,
          data.password,
        );

        const userData = {
          ...data,
          $id: acc.$id,
        };
        await createUser(userData);

        localStorage.setItem("session", JSON.stringify(session.current));
        const userResponse = await account.get();
        localStorage.setItem("name", JSON.stringify(userResponse.name));
        localStorage.setItem("email", JSON.stringify(userResponse.email));
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flexw-full flex-col items-center justify-center rounded-2xl bg-[#ffffff] p-8 px-4 shadow-xl">
        <div className="mx-auto flex flex-col items-center justify-center gap-3 pb-4">
          <div>
            <img src={ZenithBee} alt="Logo" width="63" />
          </div>

          <h1 className="my-auto text-3xl font-bold text-[#4B5563]">
            ZenithBee
          </h1>
        </div>
        <div className="mx-auto pb-8 text-center text-base font-light text-[#6B7280]">
          Sign up for an account on ZenithBee.
        </div>

        <form
          className="flex flex-col"
          onSubmit={form.handleSubmit(registerAcc)}
        >
          <div className="grid grid-cols-3 gap-4 pb-2">
            <div>
              <label
                htmlFor="firstName"
                className="mb-2 block text-base font-medium text-[#111827]"
              >
                First Name
              </label>
              <div className="relative text-gray-400">
                {UserSvg()}
                <input
                  type="text"
                  {...form.register("firstName")}
                  id="firstName"
                  className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-3 pl-12 text-gray-600 ring-3 ring-transparent focus:border-transparent focus:ring-1 focus:ring-gray-400 focus:outline-hidden sm:text-sm"
                  placeholder="First"
                />
              </div>
              <span className="h-6 text-red-500">
                {form.formState.errors.firstName?.message}
              </span>
            </div>

            <div>
              <label
                htmlFor="middleName"
                className="mb-2 block text-base font-medium text-[#111827]"
              >
                Middle Name
              </label>
              <div className="relative text-gray-400">
                {UserSvg()}
                <input
                  type="text"
                  {...form.register("middleName")}
                  id="middleName"
                  className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-3 pl-12 text-gray-600 ring-3 ring-transparent focus:border-transparent focus:ring-1 focus:ring-gray-400 focus:outline-hidden sm:text-sm"
                  placeholder="Middle"
                />
              </div>
              <span className="h-6 text-red-500">
                {form.formState.errors.middleName?.message}
              </span>
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="mb-2 block text-base font-medium text-[#111827]"
              >
                Last Name
              </label>
              <div className="relative text-gray-400">
                {UserSvg()}
                <input
                  type="text"
                  {...form.register("lastName")}
                  id="lastName"
                  className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-3 pl-12 text-gray-600 ring-3 ring-transparent focus:border-transparent focus:ring-1 focus:ring-gray-400 focus:outline-hidden sm:text-sm"
                  placeholder="Last"
                />
              </div>
              <span className="h-6 text-red-500">
                {form.formState.errors.lastName?.message}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="pb-2">
              <label
                htmlFor="email"
                className="mb-2 block text-base font-medium text-[#111827]"
              >
                Email
              </label>
              <div className="relative text-gray-400">
                {EmailSvg()}
                <input
                  type="email"
                  {...form.register("email")}
                  id="email"
                  className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-3 pl-12 text-gray-600 ring-3 ring-transparent focus:border-transparent focus:ring-1 focus:ring-gray-400 focus:outline-hidden sm:text-sm"
                  placeholder="name@company.com"
                />
              </div>
              <span className="h-6 text-red-500">
                {form.formState.errors.email?.message}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="pb-6">
                <label
                  htmlFor="password"
                  className="mb-2 block text-base font-medium text-[#111827]"
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
                    className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-3 pl-12 text-gray-600 ring-3 ring-transparent focus:border-transparent focus:ring-1 focus:ring-gray-400 focus:outline-hidden sm:text-sm"
                  />
                </div>
                <span className="h-6 text-red-500">
                  {form.formState.errors.password?.message}
                </span>
              </div>

              <div className="pb-6">
                <label
                  htmlFor="confirmpassword"
                  className="mb-2 block text-base font-medium text-[#111827]"
                >
                  Confirm Password
                </label>
                <div className="relative text-gray-400">
                  {PasswordSvg()}
                  <input
                    type="password"
                    {...form.register("confirmpassword")}
                    id="confirmpassword"
                    placeholder="••••••••••"
                    className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-3 pl-12 text-gray-600 ring-3 ring-transparent focus:border-transparent focus:ring-1 focus:ring-gray-400 focus:outline-hidden sm:text-sm"
                  />
                </div>
                <span className="h-6 text-red-500">
                  {form.formState.errors.confirmpassword?.message}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <button
              type="submit"
              className="focus:ring-primary-300 hover:bg-accent-color/85 col-span-3 mb-6 w-full cursor-pointer rounded-lg bg-[#ff5c28] px-5 py-2.5 text-center text-sm font-medium text-[#FFFFFF] transition duration-300 ease-in-out hover:scale-95 focus:ring-4 focus:outline-hidden disabled:bg-gray-500"
              disabled={isPending}
            >
              Sign Up
            </button>
          </div>

          <div className="text-base font-light text-[#6B7280]">
            Already have an account?{" "}
            <a
              onClick={() => navigate("/login")}
              className="cursor-pointer font-medium text-[#ff5c28] hover:underline"
            >
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
