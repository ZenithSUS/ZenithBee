import Modal from "react-modal";
import UserSvg from "../../assets/svg/user";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUpdateUserAddress } from "../../hooks/users";
import { toast } from "react-toastify";
import { FaRegWindowClose } from "react-icons/fa";
import { useEffect, useState, useTransition } from "react";
import { useQueryClient } from "@tanstack/react-query";

type AddressModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
  addresses: string[];
};

type AddressFormSchemaType = z.infer<typeof AddressFormSchema>;

const AddressFormSchema = z.object({
  address1: z.string().min(1, { message: "Address is required!" }),
  address2: z.string().optional(),
  address3: z.string().optional(),
});

const AddressModal = ({
  isModalOpen,
  setIsModalOpen,
  userId,
  addresses,
}: AddressModalProps) => {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const [modalScale, setModalScale] = useState(false);
  const [internalOpen, setInternalOpen] = useState(false);

  const form = useForm<AddressFormSchemaType>({
    resolver: zodResolver(AddressFormSchema),
    defaultValues: {
      address1: addresses[0],
      address2: addresses[1],
      address3: addresses[2],
    },
  });

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

  const submitAddresses = (data: AddressFormSchemaType) => {
    try {
      if (Object.keys(form.formState.errors).length > 0) return;
      const addresses = [data.address1, data.address2, data.address3];
      const addressesFinal = addresses.filter(
        (address): address is string => address !== undefined && address !== "",
      );

      startTransition(async () => {
        await useUpdateUserAddress(userId, addressesFinal);
        await queryClient.invalidateQueries({ queryKey: ["user"] });
      });
      setIsModalOpen(false);
      toast.success("Updated Successfully!");
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
          <h3 className="text-xl font-semibold">Add address</h3>
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
          onSubmit={form.handleSubmit(submitAddresses)}
        >
          <div>
            <label
              htmlFor="address1"
              className="mb-2 block text-base font-medium"
            >
              Address 1
            </label>
            <div className="relative text-gray-400">
              {UserSvg()}
              <input
                type="text"
                {...form.register("address1")}
                id="address1"
                className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-3 pl-12 text-gray-600 ring-3 ring-transparent focus:border-transparent focus:ring-1 focus:ring-gray-400 focus:outline-hidden sm:text-sm"
                placeholder="Address 1"
              />
            </div>
            <span className="h-6 text-red-500">
              {form.formState.errors.address1?.message}
            </span>
          </div>
          <div>
            <label
              htmlFor="address2"
              className="mb-2 block text-base font-medium"
            >
              Address 2 {"(Optional)"}
            </label>
            <div className="relative text-gray-400">
              {UserSvg()}
              <input
                type="text"
                {...form.register("address2")}
                id="address2"
                className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-3 pl-12 text-gray-600 ring-3 ring-transparent focus:border-transparent focus:ring-1 focus:ring-gray-400 focus:outline-hidden sm:text-sm"
                placeholder="Address 2"
              />
            </div>
            <span className="h-6 text-red-500">
              {form.formState.errors.address2?.message}
            </span>
          </div>

          <div>
            <label
              htmlFor="address3"
              className="mb-2 block text-base font-medium"
            >
              Address 3 {"(Optional)"}
            </label>
            <div className="relative text-gray-400">
              {UserSvg()}
              <input
                type="text"
                {...form.register("address3")}
                id="address3"
                className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-3 pl-12 text-gray-600 ring-3 ring-transparent focus:border-transparent focus:ring-1 focus:ring-gray-400 focus:outline-hidden sm:text-sm"
                placeholder="Address 3"
              />
            </div>
            <span className="h-6 text-red-500">
              {form.formState.errors.address3?.message}
            </span>
          </div>

          <div className="mt-4 flex w-full gap-2">
            <button
              type="submit"
              className="cursor-pointer rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:bg-gray-500"
              disabled={isPending}
            >
              {isPending ? "Adding..." : "Add Address"}
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

export default AddressModal;
