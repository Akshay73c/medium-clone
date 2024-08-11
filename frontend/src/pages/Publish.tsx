import { useState } from "react";
import { Appbar } from "../componnets/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function publishPost() {
    await axios.post(`${BACKEND_URL}/api/v1/blog`, { title, content }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      }
    });
    alert("Posted!")
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-center w-full">
        <div className="flex flex-col w-3/4 p-10">
          <textarea
            className="mt-4 p-2 pl-10 text-2xl border border-slate-600"
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value)
            }}
          >
          </textarea>
          <textarea
            className="mt-4 p-2 text-lg border h-96 border-slate-600 "
            placeholder="Tell your story"
            onChange={(e) => {
              setContent(e.target.value)
            }}
          >
          </textarea>
        </div>
      </div>
      <div className="flex justify-center">
        <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={publishPost}
        >Publish</button>
      </div>
    </div>
  );
};
