// src/app/article/_components/form.jsx

"use client";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useState } from "react";
import { createArticle } from "@/app/action";
import Cookies from "js-cookie";
import axios from "axios";

export default function Form() {
  const token = Cookies.get("currentUser");
  const [form, setForm] = useState({
    title: "",
    author: "",
    keyword: "",
    thumbnail: "",
    meta_description: "",
    content: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const inputElements = [
    {
      label: "Title",
      type: "text",
      name: "title",
    },
    {
      label: "Author",
      type: "text",
      name: "author",
    },
    {
      label: "Keyword",
      type: "text",
      name: "keyword",
    },
    {
      label: "Thumbnail",
      type: "file",
      name: "thumbnail",
    },
    {
      label: "Meta Description",
      type: "textarea",
      name: "meta_description",
    },
    {
      label: "Content",
      type: "ckeditor",
      name: "content",
    },
  ];

  async function handleImages(e) {
    setIsLoading(true);
    const files = Array.from(e.target.files);

    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const { data } = await axios.post("/api/images", formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });

      setForm({
        ...form,
        thumbnail: data.images[0],
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      {/* <!-- Input Fields --> */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Article Form
          </h3>
        </div>
        <form
          onSubmit={async (e) => {
            try {
              e.preventDefault();
              setIsLoading(true);

              await createArticle(form);
            } catch (err) {
              console.log(err);
            } finally {
              setIsLoading(false);
            }
          }}
        >
          <div className="grid grid-cols-2 flex-col gap-5.5 p-6.5">
            {inputElements.map((input, i) => (
              <div
                key={i}
                className={`${input.type === "textarea" || input.type === "ckeditor" ? "col-span-2" : null}`}
              >
                <label
                  htmlFor={input.name}
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                >
                  {input.label}
                </label>
                {input.type === "ckeditor" ? (
                  <CKEditor
                    key={i}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setForm({
                        ...form,
                        content: data,
                      });
                    }}
                    editor={ClassicEditor}
                    data={form.content}
                  />
                ) : input.type === "textarea" ? (
                  <textarea
                    name={input.name}
                    value={form[input.name]}
                    onChange={handleChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    id={input.name}
                  ></textarea>
                ) : input.type === "file" ? (
                  <input
                    disabled={isLoading}
                    type="file"
                    accept="image/*"
                    // onChange={handleImages}
                    onChange={handleImages}
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                ) : (
                  <input
                    disabled={isLoading}
                    type="text"
                    value={form[input.name]}
                    onChange={handleChange}
                    placeholder={input.label}
                    name={input.name}
                    id={input.name}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                )}
              </div>
            ))}
          </div>

          <button
            type="submit"
            // disabled={isLoading}
            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
