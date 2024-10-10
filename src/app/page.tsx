"use client";

import { Button } from "@headlessui/react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the API route
  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users"); // API route path
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const handleUserDelete = async (userId: number) => {
    await fetch(`/api/users/${userId}`, {
      method: "DELETE",
    });

    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>User List</h1>{" "}
      <Button className="inline-flex items-center gap-2 rounded-md bg-green-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-green-600 data-[open]:bg-green-700 data-[focus]:outline-1 data-[focus]:outline-white">
        <Link href="/users/add-user">Add User</Link>
      </Button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
              <Link href={`/users/edit-user/${user.id}`}>Edit</Link>
            </Button>{" "}
            <Button
              className="inline-flex items-center gap-2 rounded-md bg-red-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-red-600 data-[open]:bg-red-700 data-[focus]:outline-1 data-[focus]:outline-white"
              onClick={() => handleUserDelete(user.id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
