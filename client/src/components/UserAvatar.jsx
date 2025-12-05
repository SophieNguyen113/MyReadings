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
        className="w-10 h-10 object-cover rounded-full cursor-pointer border border-amber-200 shadow-sm hover:shadow-md transition"
        onClick={toggleModal}
      />

      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50"
          onClick={toggleModal}
        >
          <div
            className="bg-white p-8 rounded-2xl shadow-md w-80 text-amber-900 relative border border-amber-100"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-semibold text-center mb-6 text-amber-900">User Information</h2>

            <img
              src={user.avatarUrl}
              alt="User Avatar"
              className="w-24 h-24 object-cover rounded-full mx-auto ring-4 ring-amber-200 mb-4"
            />

            <div className="text-center">
              <p className="text-lg font-medium text-amber-900">{user.name}</p>
              <p className="text-amber-700/80">@{user.username}</p>
            </div>

            <button
              className="mt-6 w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
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
