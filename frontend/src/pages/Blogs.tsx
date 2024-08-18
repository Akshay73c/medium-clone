import { Appbar } from "../componnets/Appbar";
import { BlogCard } from "../componnets/BlogCard";
import { BlogSkeleton } from "../componnets/BlogSkeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center">
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-start flex-col">
        <div className="pl-20"><div className=" border-b border-slate-600 w-fit font-serif text-gray-600">For you</div></div>
        <div className="flex justify-center">
          <div className="max-w-xl">
            {blogs.map((blog) => (
              <BlogCard
                authorEmail={blog.author.email}
                title={blog.title}
                content={blog.content}
                id={blog.id}
                publishedDate={"2nd feb 2024"}
              />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
