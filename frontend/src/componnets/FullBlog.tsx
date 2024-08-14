import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center p-4">
        <div className="grid grid-cols-12 w-3/4 pt-200 max-w-screen-2xl">
          <div className="col-span-8  m-2 p-2">
            <div className="text-4xl font-extrabold">{blog.title}</div>
            <div className="flex justify-start pt-4 text-sm px-4">
              <div className="flex flex-col justify-center">
                <Avatar name={blog.author.name} />
              </div>
              <div className="flex justify-start flex-col pl-2">
                {blog.author.name || "Anonymous"}
                <div>
                  {"Published on 13th aug"}
                </div>
              </div>
            </div>
            <div className="mt-4 text-xl">{blog.content}</div>
          </div>
          <div className="col-span-4 m-2 flex justify-center">
            Random catchphrase
          </div>
        </div>
      </div>
    </div>
  );
};
