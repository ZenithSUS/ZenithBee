import { useEffect, useState } from "react";
import { ShowProducts } from "../../utils/types";
import { FaRegWindowClose } from "react-icons/fa";
import Modal from "react-modal";
Modal.setAppElement("#root");

type ProductModal = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: ShowProducts;
};

export function ProductModal({
  isModalOpen,
  setIsModalOpen,
  product,
}: ProductModal) {
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
      <div className="flex min-w-screen flex-col items-center justify-center md:min-w-[400px]">
        <div
          className={`card bg-primary-color dark:bg-primary-dark-color w-96 shadow-sm transition-all duration-300 ease-in-out ${
            modalScale ? "scale-100 opacity-100" : "scale-75 opacity-0"
          }`}
        >
          <figure className="relative">
            <FaRegWindowClose
              className="absolute top-5 right-5 cursor-pointer transition duration-300 ease-in-out hover:scale-105"
              color="red"
              size={30}
              onClick={() => {
                setIsModalOpen(false);
              }}
            />
            <img src={product.image} alt={product.name} />
          </figure>
          <div className="card-body">
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <h2 className="card-title">{product.name}</h2>
                <p className="text-gray-500">{product.foodType}</p>
              </div>

              <p className="text-end text-xl font-bold">${product.price}</p>
            </div>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
