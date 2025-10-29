import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/get-all-users")  // Updated Route
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4 p-6">
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user._id} className="bg-white shadow-md rounded-lg p-4 w-64">
            <h3 className="text-lg font-semibold text-center mt-2">{user.name}</h3>
            <p className="text-gray-500 text-center">{user.email}</p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No users found.</p>
      )}
    </div>
  );
};

export default Users;
