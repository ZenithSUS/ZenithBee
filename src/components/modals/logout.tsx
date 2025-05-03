import Modal from "react-modal";
import { account } from "../../appwrite";
import { useEffect, useState } from "react";
Modal.setAppElement("#root");

type LogoutModal = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function LogoutModal({ isModalOpen, setIsModalOpen }: LogoutModal) {
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

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      localStorage.clear();
      setIsModalOpen(false);
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
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
        <div className="flex flex-col">
          <div className="ml-3 text-left">
            <h3 className="text-lg font-bold">Logout</h3>
            <p className="text-sm">Are you sure you want to logout?</p>
          </div>

          <div className="flex items-center justify-end gap-4 pt-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-accent-color dark:bg-accent-dark-color cursor-pointer rounded-md p-2 text-sm font-bold"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="cursor-pointer rounded-md bg-red-600 p-2 text-sm font-bold"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
