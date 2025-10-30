import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Update = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName]  = useState("");
  const [username,  setUsername]  = useState("");
  const [password,  setPassword]  = useState("");
  const [status,   setStatus]    = useState(null);  

  const token = localStorage.getItem("token");
  const navigate=useNavigate();

  const handleUpdate = async () => {
  
    const payload = {};
    if (firstName.trim()) payload.firstName = firstName.trim();
    if (lastName.trim())  payload.lastName  = lastName.trim();
    if (username.trim())  payload.username  = username.trim();
    if (password.trim())  payload.password  = password.trim();

    if (Object.keys(payload).length === 0) {
      setStatus("Nothing to update — make a change first.");
      return;
    }

    try {
      await axios.put(
        "http://localhost:3000/app/v1/user/update",  
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setStatus("Profile updated successfully!"); 
      setFirstName(""); setLastName(""); setUsername(""); setPassword("");
      navigate("/signin");

    } catch (err) {
      setStatus(err?.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-300">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold text-center">Update Profile</h2>

        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="email"
          placeholder="Email / Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />

        <button
          onClick={handleUpdate}
          className="w-full bg-black text-white py-2 rounded hover:bg-slate-600"
        >
          Update
        </button>
         <button
          onClick={()=>{navigate("/signin")}}
          className="w-full bg-black text-white py-2 rounded hover:bg-slate-600"
        >
          Back
        </button>
        {status && (
          <p className="text-center text-sm pt-2">
            {status}
          </p>
        )}
      </div>
    </div>
  );
};
