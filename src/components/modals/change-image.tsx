import Modal from "react-modal";
import { useState, useEffect, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
} from "../../utils/constants/image-file";
import { FaRegWindowClose, FaUpload, FaUser } from "react-icons/fa";
import changeImage from "../../utils/functions/change-image";

import { toast } from "react-toastify";

type ChangeImageModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
};

type ChangeImageSchemaType = z.infer<typeof ChangeImageSchema>;

const ChangeImageSchema = z.object({
  profileImage: z
    .instanceof(FileList)
    .refine(
      (files) => files.length === 0 || files.length === 1,
      "Please upload exactly one file",
    )
    .refine(
      (files) => files.length === 0 || files[0].size <= MAX_FILE_SIZE,
      `Max file size is 5MB`,
    )
    .refine(
      (files) =>
        files.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files[0].type),
      "Only .jpg, .jpeg, and .png formats are supported",
    ),
});

export const ChangeImageModal = ({
  isModalOpen,
  setIsModalOpen,
}: ChangeImageModalProps) => {
  const userId = JSON.parse(localStorage.getItem("id") || "") as string;
  const [isPending, startTransition] = useTransition();
  const [modalScale, setModalScale] = useState(false);
  const [internalOpen, setInternalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<boolean>(false);

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
        setPreviewImage(null);
      }, 300);
    }
  }, [isModalOpen]);

  const form = useForm<ChangeImageSchemaType>({
    resolver: zodResolver(ChangeImageSchema),
    defaultValues: {
      profileImage: undefined,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      setSelectedImage(true);
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleChangeImage = (data: ChangeImageSchemaType) => {
    if (Object.keys(form.formState.errors).length > 0) return;

    try {
      startTransition(async () => {
        await changeImage(userId, data.profileImage[0] as File);
        toast.success("Image Changed Successfully");
      });
    } catch (error) {
      console.error("Error Updating Images:", error);
      toast.error("Error Updating Images");
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
          <h3 className="text-xl font-semibold">Change Profile Image</h3>
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
          onSubmit={form.handleSubmit(handleChangeImage)}
        >
          <div className="mb-4">
            <label
              htmlFor="profileImage"
              className="mb-2 block text-center text-base font-medium"
            >
              Upload New Image
            </label>

            {/* Image preview section */}
            {previewImage ? (
              <div className="mb-4 flex flex-col items-center">
                <img
                  src={previewImage}
                  alt="Profile preview"
                  className="h-40 w-40 rounded-full border-2 border-gray-300 object-cover"
                />
                <button
                  type="button"
                  className="mt-2 w-full cursor-pointer rounded-md bg-red-500 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700"
                  onClick={() => {
                    setPreviewImage(null);
                    setSelectedImage(false);
                    form.reset();
                  }}
                >
                  Remove Image
                </button>
              </div>
            ) : (
              <div className="mb-4 flex items-center justify-center">
                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gray-200">
                  <FaUser className="inset-0" size={30} color="#000000" />
                </div>
              </div>
            )}

            {/* File input with custom styling */}
            <div className="relative">
              <input
                type="file"
                {...form.register("profileImage")}
                id="profileImage"
                className="hidden"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => {
                  form.register("profileImage").onChange(e);
                  handleFileChange(e);
                }}
              />
              <label
                htmlFor="profileImage"
                className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-600 hover:bg-gray-100"
              >
                <FaUpload className="h-5 w-5" />
                <span>Choose File</span>
              </label>
            </div>

            {form.formState.errors.profileImage && (
              <span className="mt-1 block h-6 text-red-500">
                {form.formState.errors.profileImage.message}
              </span>
            )}
          </div>

          <div className="mt-4 flex w-full gap-2">
            <button
              type="submit"
              className="bg-accent-color dark:bg-accent-dark-color hover:bg-accent-color/80 dark:hover:bg-accent-dark-color/80 cursor-pointer rounded-lg px-5 py-2.5 text-sm font-medium text-white disabled:bg-gray-500 hover:disabled:bg-gray-600"
              disabled={isPending || !selectedImage}
            >
              {isPending ? "Processing..." : "Save Changes"}
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

export default ChangeImageModal;
