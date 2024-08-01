import { Link } from "react-router-dom";
import { USER } from "../assets";
import { useChat, useUploadProfilePhoto } from "../hooks/ChatHooks";
import { useState } from "react";

const UsersList = () => {
  const { users, loading, error } = useChat();
  const ownerId = localStorage.getItem("onwerId");
  const [file, setFile] = useState(null);
  const { uploadProfilePhoto } = useUploadProfilePhoto();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file && ownerId) {
      await uploadProfilePhoto(file, ownerId);
      setFile(null); // Clear the file input after successful upload
    }
  };

  return (
    <div className="flex flex-col w-full h-[100vh] bg-[#282D2D] px-5">
      <form className="my-4" onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button
          className="bg-[#7f86c9] rounded-sm p-1"
          type="submit"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Profile"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
      <div className="border p-8 rounded-md">
        <h1 className="text-center text-xl text-[#c5b9fa] sm:text-3xl font-semibold">
          PeopleS
        </h1>
        <div className="w-full mt-8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {users && users.length === 0 ? (
                <div>No users available.</div>
              ) : (
                users
                  ?.filter((user) => user._id !== ownerId)
                  .map((user) => (
                    <li
                      key={user._id}
                      className="flex items-center justify-between bg-[#363d3d] mb-2  p-4 border-y border-gray-600 shadow-md  shadow-gray-700"
                    >
                      <img
                        src={user.image}
                        alt={user.username}
                        className="w-16 h-16 rounded-full"
                      />
                      <span className="font-bold text-2xl text-[#d3d5d5]">
                        {user.username}
                      </span>
                      <div className="flex flex-col gap-5 text-white">
                        <div className="text-xl text-[#f2f2f2] ">
                          {user.lastMessage}
                        </div>
                        <div className="text-sm ">
                          {formatDate(user.lastMessageDate)}
                        </div>
                      </div>

                      <Link
                        to={`/chat/${user._id}`}
                        className="text-[#8abde6] font-semibold text-lg"
                      >
                        Message
                      </Link>
                    </li>
                  ))
              )}
            </ul>
          )}
          {error && <p className="text-red-500 text-xs text-center">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default UsersList;
