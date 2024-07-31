import { Link } from "react-router-dom";
import { USER } from "../assets";
import { useChat } from "../hooks/ChatHooks";

const UsersList = () => {
  const { users, loading, error } = useChat();
  const ownerId = localStorage.getItem("onwerId");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div className="flex flex-col w-full h-[100vh] bg-[#282D2D] px-5">
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
                      className="flex items-center justify-between py-2 border-b border-gray-600"
                    >
                      <img
                        src={USER}
                        alt={user.username}
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="font-bold text-2xl text-[#d3d5d5]">
                        {user.username}
                      </span>
                      <div className="flex flex-col text-white">
                        <div className="text-xl text-[#d1d9a1] ">
                          {user.lastMessage}
                        </div>
                        <div>{formatDate(user.lastMessageDate)}</div>
                      </div>

                      <Link
                        to={`/chat/${user._id}`}
                        className="text-[#8abde6] font-semibold"
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
