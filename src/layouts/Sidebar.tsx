import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useUserStore } from "../stores/userStore";
import { logout } from "../services/authService";
import Modal from "react-modal";
import { useState } from "react";

function Sidebar() {
  const { logout: userLogout } = useUserStore();
  const { logout: authLogout } = useAuthStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    userLogout();
    authLogout();
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-gray-50 border-l border-gray-300 p-10 flex flex-col justify-between text-lg">
      <ul className="space-y-5">
        <li>
          <Link to="/dashboard" className="text-2xl">
            CoinView
          </Link>
        </li>
        <li className="hover:text-gray-600 cursor-pointer">
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className="hover:text-gray-600 cursor-pointer">
          <Link to="/portfolios">Portfolios</Link>
        </li>
        <li className="hover:text-gray-600 cursor-pointer">
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
      <ul>
        <li
          className="hover:text-red-600 cursor-pointer mt-10"
          onClick={openModal}
        >
          Logout
        </li>
      </ul>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Logout Confirmation"
        className="absolute top-1/2 left-1/2 bg-white border border-gray-300 p-4 outline-none transform -translate-x-1/2 -translate-y-1/2 w-xs"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-lg mb-4">Are you sure you want to log out?</h2>
        <div className="flex gap-4">
          <button
            onClick={closeModal}
            className="hover:text-gray-400 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="hover:text-red-600 cursor-pointer"
          >
            Yes, Logout
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Sidebar;
