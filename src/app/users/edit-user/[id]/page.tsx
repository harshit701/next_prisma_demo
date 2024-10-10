"use client";

import UserForm from "@/app/components/userForm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  email: string;
  name: string;
  createdAt?: Date;
  id?: number;
}

export default function EditUser({ params }: { params: { id: string } }) {
  const router = useRouter();
  const userId = params.id;
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();

      setUserData(data);
    };

    fetchUser();
  }, [userId]);

  const handleBtnClick = async (formData: { email: string; name: string }) => {
    await fetch(`/api/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify(formData),
    });

    router.push("/");
  };

  return (
    <div className="flext items-center justify-center w-full h-screen">
      <h1 className="text-center text-2xl">Edit User</h1>
      {userData ? (
        <UserForm
          btnLabel="Edit User"
          btnClick={handleBtnClick}
          initialData={{ name: userData?.name, email: userData?.email }}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
