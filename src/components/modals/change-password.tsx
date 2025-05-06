import Modal from "react-modal";
import changePassword from "../../utils/functions/change-password";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaRegWindowClose } from "react-icons/fa";
import { useEffect, useState, useTransition } from "react";
import PasswordSvg from "../../assets/svg/password";

type ChangePasswordModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type ChangePasswordFormSchemaType = z.infer<typeof ChangePasswordFormSchema>;

const ChangePasswordFormSchema = z
  .object({
    oldPassword: z.string().min(1, { message: "Old Password is required" }),
    newPassword: z.string().min(1, { message: "New Password is required" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ChangePasswordModal = ({
  isModalOpen,
  setIsModalOpen,
}: ChangePasswordModalProps) => {
  const [isPending, startTransition] = useTransition();
  const [modalScale, setModalScale] = useState(false);
  const [internalOpen, setInternalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      setInternalOpen(true);
      setTimeout(() => {
        setModalScale(true);
      }, 50);
    } else {
      setModalScale(false);
      setTimeout(() => {
        setInternalOpen(false);
      }, 300);
    }
  }, [isModalOpen]);

  const form = useForm<ChangePasswordFormSchemaType>({
    resolver: zodResolver(ChangePasswordFormSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const submitChangePassword = (data: ChangePasswordFormSchemaType) => {
    try {
      if (Object.keys(form.formState.errors).length > 0) return;

      startTransition(async () => {
        await changePassword(data.newPassword, data.oldPassword);
      });
      setIsModalOpen(false);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      isOpen={internalOpen}
      parentSelector={() => document.querySelector("#root") as HTMLElement}
      className={
        "bg-opacity-100 fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black/50 p-4 backdrop-blur-sm"
      }
      overlayClassName={
        "fixed inset-0 z-[100] bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
      }
    >
      <div
        className={`bg-primary-color dark:bg-primary-dark-color w-full max-w-md transform overflow-hidden rounded-2xl p-6 transition-all duration-300 ease-in-out ${
          modalScale ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}
      >
        <div className="mb-2 flex items-start justify-between">
          <h3 className="text-xl font-semibold">Change Password</h3>
          <button
            type="button"
            className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
            onClick={() => setIsModalOpen(false)}
          >
            <FaRegWindowClose className="h-5 w-5 cursor-pointer" color="red" />
          </button>
        </div>

        <form
          className="flex flex-col"
          onSubmit={form.handleSubmit(submitChangePassword)}
        >
          <div>
            <label
              htmlFor="oldPassword"
              className="mb-2 block text-base font-medium"
            >
              Old Password
            </label>
            <div className="relative text-gray-400">
              {PasswordSvg()}
              <input
                type="password"
                {...form.register("oldPassword")}
                id="oldPassword"
                placeholder="••••••••••"
                className="mb-2 block w-full rounded-lg rounded-l-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-3 pl-12 text-gray-600 ring-3 ring-transparent focus:border-transparent focus:ring-1 focus:ring-gray-400 focus:outline-hidden sm:text-sm"
              />
            </div>
            <span className="h-6 text-red-500">
              {form.formState.errors.oldPassword?.message}
            </span>
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className="mb-2 block text-base font-medium"
            >
              New Password
            </label>
            <div className="relative text-gray-400">
              {PasswordSvg()}
              <input
                type="password"
                {...form.register("newPassword")}
                id="newPassword"
                placeholder="••••••••••"
                className="mb-2 block w-full rounded-lg rounded-l-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-3 pl-12 text-gray-600 ring-3 ring-transparent focus:border-transparent focus:ring-1 focus:ring-gray-400 focus:outline-hidden sm:text-sm"
              />
            </div>
            <span className="h-6 text-red-500">
              {form.formState.errors.newPassword?.message}
            </span>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-base font-medium"
            >
              Confirm Password
            </label>
            <div className="relative text-gray-400">
              {PasswordSvg()}
              <input
                type="password"
                {...form.register("confirmPassword")}
                id="confirmPassword"
                placeholder="••••••••••"
                className="mb-2 block w-full rounded-lg rounded-l-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-3 pl-12 text-gray-600 ring-3 ring-transparent focus:border-transparent focus:ring-1 focus:ring-gray-400 focus:outline-hidden sm:text-sm"
              />
            </div>
            <span className="h-6 text-red-500">
              {form.formState.errors.confirmPassword?.message}
            </span>
          </div>

          <div className="mt-4 flex w-full gap-2">
            <button
              type="submit"
              className="bg-accent-color dark:bg-accent-dark-color hover:bg-accent-color/80 dark:hover:bg-accent-dark-color/80 cursor-pointer rounded-lg px-5 py-2.5 text-sm font-medium text-white disabled:bg-gray-500"
              disabled={isPending}
            >
              {isPending ? "Processing..." : "Change Password"}
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="cursor-pointer rounded-lg bg-gray-200 px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-300 disabled:bg-gray-500"
              disabled={isPending}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ChangePasswordModal;
