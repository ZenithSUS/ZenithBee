import Modal from "react-modal";
import { useQueryClient } from "@tanstack/react-query";
import { useRemoveFromReserved } from "../../hooks/reserved";
import { FaRegWindowClose } from "react-icons/fa";
import { useEffect, useState, useTransition } from "react";
import { toast } from "react-toastify";
Modal.setAppElement("#root");

type DeleteModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reserveId: string;
  setReserveId: React.Dispatch<React.SetStateAction<string>>;
};

const DeleteModal = ({
  isModalOpen,
  setIsModalOpen,
  reserveId,
  setReserveId,
}: DeleteModalProps) => {
  const queryClient = useQueryClient();
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

  const handleDelete = () => {
    startTransition(async () => {
      await useRemoveFromReserved(reserveId);
      await queryClient.invalidateQueries({ queryKey: ["reserved"] });
      setIsModalOpen(false);
    });
    setReserveId("");
    if (!isPending) {
      toast.success("Reservation deleted successfully!");
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
        <div className="flex items-start justify-between p-4">
          <h3 className="text-xl font-semibold">Delete Reserved</h3>
          <button
            type="button"
            className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
            onClick={() => setIsModalOpen(false)}
          >
            <FaRegWindowClose className="h-5 w-5 cursor-pointer" color="red" />
          </button>
        </div>
        <div className="p-6 pt-0">
          <h3 className="mb-5 text-lg font-normal">
            Are you sure you want to delete this reserved?
          </h3>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsModalOpen(false)}
              className="cursor-pointer rounded-lg bg-gray-200 px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-300 disabled:bg-gray-500"
              disabled={isPending}
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="cursor-pointer rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:bg-gray-500"
              disabled={isPending}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
