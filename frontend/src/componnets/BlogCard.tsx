import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: number;
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  id,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="border-b border-slate-200  p-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
          <Avatar name={authorName} />
          <div className="flex justify-center flex-col font-extralight pl-2 text-sm">
            {authorName}
          </div>
          <div className="flex justify-center flex-col pl-2 font-thin text-slate-400 text-sm">
            {publishedDate}
          </div>
        </div>

        <div className="text-xl font-semibold pt-2">{title}</div>
        <div className="text-md font-thin">{content.slice(0, 100) + "..."}</div>
        <div className="text-slate-500 text-sm font-thin pt-4">{`${Math.ceil(
          content.length / 100
        )} minutes`}</div>
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
