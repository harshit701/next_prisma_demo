"use client";

import { Field, Label, Input, Button } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Image from "next/image";

interface userFormProps {
  btnLabel: string;
  btnClick: (formData: { name: string; email: string }) => void;
  initialData?: { name: string; email: string; file?: string | null };
}

export default function UserForm({
  btnLabel,
  btnClick,
  initialData = { name: "", email: "", file: null },
}: userFormProps) {
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: initialData,
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      file: Yup.mixed().required("A file is required"),
      // .test("fileSize", "File too large", (value) => {
      //   if (
      //     !(
      //       !value ||
      //       (value instanceof File && value.size <= 1024 * 1024 * 2)
      //     )
      //   ) {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // })
      // .test(
      //   "fileType",
      //   "Unsupported file format",
      //   (value) =>
      //     !value ||
      //     (value instanceof File &&
      //       ["image/jpeg", "image/png"].includes(value.type))
      // ),
    }),
    onSubmit: (values) => {
      btnClick(values);
    },
  });

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let file: string | File;
    file = event?.target?.files?.[0] as File;

    if (file) {
      setFilePreview(URL.createObjectURL(file));
      file = await toBase64(file);
      formik.setFieldValue("file", file);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-container">
        <div className="w-full max-w-md px-4">
          <Field>
            <Label className="text-sm/6 font-medium text-black">Name</Label>
            <Input
              className={clsx(
                "mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25"
              )}
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-400">{formik.errors.name}</div>
            ) : null}
          </Field>
        </div>

        <div className="w-full max-w-md px-4">
          <Field>
            <Label className="text-sm/6 font-medium text-black">Email</Label>
            <Input
              className={clsx(
                "mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25"
              )}
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-400">{formik.errors.email}</div>
            ) : null}
          </Field>
        </div>

        <div className="w-full max-w-md px-4">
          <Field>
            <Label className="text-sm/6 font-medium text-black">
              Profile Image:
            </Label>
            <input
              type="file"
              name="file"
              onChange={handleFileUpload}
              accept="image/*"
            />
            {formik.touched.file && formik.errors.file ? (
              <div className="text-red-400">{formik.errors.file}</div>
            ) : null}
          </Field>
        </div>

        {filePreview && (
          <div className="w-full max-w-md px-4 mt-3">
            <Image
              src={filePreview}
              alt="File Preview"
              className="w-40 h-40 object-cover rounded-md"
              width={250}
              height={250}
            />
          </div>
        )}

        <div className="w-full max-w-md px-4 mt-5">
          <Button
            className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
            type="submit">
            {btnLabel}
          </Button>{" "}
          <Button
            className="inline-flex items-center gap-2 rounded-md bg-red-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-red-600 data-[open]:bg-red-700 data-[focus]:outline-1 data-[focus]:outline-white"
            type="submit">
            <Link href="/">Cancel</Link>
          </Button>
        </div>
      </div>
    </form>
  );
}
