import Loading from "../../components/loading";
import { useState } from "react";
import { useGetUserById } from "../../hooks/users";
import AddressModal from "../../components/modals/address";
import formatDate from "../../utils/functions/format-date";

export default function Account() {
  const userId = JSON.parse(localStorage.getItem("id") || "") as string;
  const { data: userInfo, isLoading } = useGetUserById(userId);
  const [activeModal, setActiveModal] = useState<string | null>();

  if (isLoading) return <Loading />;

  const openModal = (modalType: string) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="mt-3 flex flex-col gap-5">
      <AddressModal
        isModalOpen={activeModal === "address"}
        setIsModalOpen={() => closeModal()}
        userId={userId}
      />
      <h1 className="text-2xl font-bold">Account</h1>

      <div className="bg-primary-color dark:bg-primary-dark-color">
        <div className="hero-content flex w-full flex-col items-start justify-center">
          <div className="flex w-full flex-col gap-5 md:flex-row">
            <img
              src={userInfo?.profileImage}
              className="max-w-sm rounded-lg shadow-2xl"
            />

            <div className="flex w-full flex-col gap-2">
              <h1 className="text-2xl">
                Name:{" "}
                <span className="font-bold">{userInfo?.fullname}</span>{" "}
              </h1>

              <div className="text-md grid grid-cols-1 gap-2 md:grid-cols-2">
                <p>Email: {userInfo?.email}</p>
                <p>
                  Addresses:{" "}
                  {userInfo?.address.length === 0 ? "No Address Yet" : ""}
                </p>
                <p>Registered At: {formatDate(userInfo?.$createdAt || "")}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <button
              className="bg-accent-color dark:bg-accent-dark-color hover:bg-accent-color/80 dark:hover:bg-accent-dark-color/80 cursor-pointer rounded-md p-2 text-white transition duration-300 ease-in-out hover:scale-105"
              onClick={() => openModal("address")}
            >
              Add Address
            </button>
            <button className="bg-accent-color dark:bg-accent-dark-color hover:bg-accent-color/80 dark:hover:bg-accent-dark-color/80 cursor-pointer rounded-md p-2 text-white transition duration-300 ease-in-out hover:scale-105">
              Change Password
            </button>
            <button className="bg-accent-color dark:bg-accent-dark-color hover:bg-accent-color/80 dark:hover:bg-accent-dark-color/80 cursor-pointer rounded-md p-2 text-white transition duration-300 ease-in-out hover:scale-105">
              Change Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
