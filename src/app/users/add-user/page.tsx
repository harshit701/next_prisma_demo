"use client";

import UserForm from "@/app/components/userForm";
import { useRouter } from "next/navigation";

export default function AddUser() {
  const router = useRouter();
  const handleBtnClick = async (formData: { name: string; email: string }) => {
    await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    console.log(formData);

    return false;

    router.push("/");
  };

  return (
    <div className="flext items-center justify-center w-full h-screen">
      <h1 className="text-center text-2xl">Add User</h1>
      <UserForm btnLabel="Add User" btnClick={handleBtnClick} />
    </div>
  );
}
