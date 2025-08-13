import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const User = ({ user, onDelete }) => {
  const navigate = useNavigate();
  const initials =
    (user.firstName?.[0] || "").toUpperCase() +
    (user.lastName?.[0] || "").toUpperCase();
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-6">
        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-sm font-medium">
          {initials}
        </div>
        <div>
          <p className="font-medium">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-sm text-slate-500">{user.username}</p>
        </div>
      </div>
      <div className="flex gap-4">
        <button
          onClick={() =>
            navigate("/send", {
              state: { id: user._id, name: user.firstName },
            })
          }
          className="bg-black text-white px-5 py-2 rounded"
        >
          Send Money
        </button>

        <button
          onClick={() => onDelete(user._id)}
          className="bg-slate-500 text-white px-5 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};


export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u._id !== id));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fetchUsers = async () => {
        const { data } = await axios.get(
          "http://localhost:3000/app/v1/user/bulk?filter=" + filter
        );
        setUsers(data.user);
      };
      fetchUsers();
    }, 300);
    return () => clearTimeout(timeout);
  }, [filter]);

  return (
    <>
      <h2 className="font-bold mt-6 text-lg">Users</h2>

      <input
        onChange={(e) => setFilter(e.target.value)}
        type="text"
        placeholder="Search users..."
        className="w-full my-2 px-3 py-2 border rounded border-slate-300"
      />

      {users.length === 0 ? (
        <p className="text-slate-500">No users found.</p>
      ) : (
        <div className="divide-y">
          {users.map((u) => (
            <User key={u._id} user={u} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </>
  );
};
