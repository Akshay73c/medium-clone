import { Blog } from "../hooks";
import { Appbar } from "./Appbar";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-2xl">
          <div className="col-span-8">
            <div className="text-3xl font-extrabold">{blog.title}</div>
            <div>{blog.content}</div>
          </div>
          <div className="col-span-4 ">
            {blog.author.name || "Anonymous"}
            <div>Random catchphrase</div>
          </div>
        </div>
      </div>
    </div>
  );
};
