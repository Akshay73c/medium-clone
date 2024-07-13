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
      <div className="flex justify-center">
        <div className="max-w-xl">
          {blogs.map((blog) => (
            <BlogCard
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              id={blog.id}
              publishedDate={"2nd feb 2024"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
