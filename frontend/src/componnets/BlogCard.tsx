import { Link } from "react-router-dom";

interface BlogCardProps {
  authorEmail: string;
  title: string;
  content: string;
  publishedDate: string;
  id: number;
}

export const BlogCard = ({
  authorEmail,
  title,
  content,
  publishedDate,
  id,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="border-b border-slate-200  p-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
          <Avatar name={authorEmail} />
          <div className="flex justify-center flex-col font-extralight pl-2 text-sm">
            @{authorEmail.split('@').at(0)}
          </div>
          <div className="flex justify-center flex-col pl-2 font-thin text-slate-400 text-sm">
            {publishedDate}
          </div>
        </div>

        <div className="text-2xl font-bold pt-2">{title}</div>
        <div className="text-md font-thin">{content.slice(0, 200) + "..."}</div>
        <div className="text-slate-500 text-sm font-thin pt-4 flex justify-between">
          <div>
            {`${Math.ceil(content.length / 100)} minutes`}
          </div>
          <button type="button" className="text-gray-700 border border-gray-700 hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
              <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );
};

export function Avatar({ name }: { name: string }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center w-9 h-9 overflow-hidden  rounded-full bg-gray-400`}
    >
      <span className="text-lg dark:text-gray-100">
        {name[0].toUpperCase()}
      </span>
    </div>
  );
}
