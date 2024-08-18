import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const Appbar = () => {
  return (
    <div className="border-b flex justify-between px-10 py-4 font-['Open_Sans']">
      <Link className="flex justify-center flex-col font-bold text-4xl pl-20" to={"/blogs"}>
        Medium
      </Link>

      <div className="flex">
        <Link to={"/publish"}>
          <button
            type="button"
            className="mr-4 focus:outline-none text-gray-700 hover:text-black focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 flex "
          >
            <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
            </div>
            <div className="font-bold text-lg">Write</div>
          </button>
        </Link>
        <Link to={"/user"} className="pt-1">
          <Avatar name="akshay" />
        </Link>
      </div>
    </div>
  );
};
