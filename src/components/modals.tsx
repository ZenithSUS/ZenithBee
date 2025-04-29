import Modal from "react-modal";
import { FaRegWindowClose } from "react-icons/fa";
import { Products } from "../utils/types";
import { useEffect, useState } from "react";

Modal.setAppElement("#root");

type ModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ProductModal({
  isModalOpen,
  setIsModalOpen,
  product,
}: ModalProps & { product: Products }) {
  const [modalScale, setModalScale] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => {
        setModalScale(true);
      }, 50);
    } else {
      setModalScale(false);
    }
  }, [isModalOpen]);

  return (
    <Modal
      isOpen={isModalOpen}
      parentSelector={() => document.querySelector("#root") as HTMLElement}
      className={
        "bg-opacity-100 fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black/50 p-4 backdrop-blur-sm"
      }
      overlayClassName={"fixed inset-0 z-[100] bg-opacity-50 backdrop-blur-sm"}
    >
      <div className="flex min-w-screen flex-col md:min-w-[400px]">
        <div
          className={`card bg-base-100 w-96 shadow-sm transition-all duration-300 ease-in-out ${
            modalScale ? "scale-100 opacity-100" : "scale-75 opacity-0"
          }`}
        >
          <figure className="relative">
            <FaRegWindowClose
              className="absolute top-5 right-5 cursor-pointer transition duration-300 ease-in-out hover:scale-105"
              color="red"
              size={30}
              onClick={() => setIsModalOpen(!isModalOpen)}
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
