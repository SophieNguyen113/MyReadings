import { useState } from "react";

export default function UserAvatar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = {
    avatarUrl:
      "https://avatars.githubusercontent.com/u/123401167?v=4",
    username: "SophieNguyen113",
    name: "Sophie Nguyen",
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div>
      <img
        src={user.avatarUrl}
        alt="User Avatar"
        className="w-10 h-10 object-cover rounded-full cursor-pointer border border-gray-300"
        onClick={toggleModal}
      />

      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={toggleModal}
        >
          <div
            className="bg-white p-8 rounded-2xl shadow-2xl w-80 text-black relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-semibold text-center mb-6">User Information</h2>

            <img
              src={user.avatarUrl}
              alt="User Avatar"
              className="w-24 h-24 object-cover rounded-full mx-auto border-4 border-gray-200 mb-4"
            />

            <div className="text-center">
              <p className="text-lg font-medium">{user.name}</p>
              <p className="text-gray-500">@{user.username}</p>
            </div>

            <button
              className="mt-6 w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
              onClick={toggleModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
