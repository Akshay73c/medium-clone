import { Appbar } from "../componnets/Appbar";
import { Avatar, BlogCard } from "../componnets/BlogCard";
import { User, useUser, useUserBlogs } from "../hooks";
import { BlogSkeleton } from "../componnets/BlogSkeleton";
import { useNavigate } from "react-router-dom";

export default function UserPage() {

    const { loading, blogs } = useUserBlogs();
    const { userLoading, user } = useUser()

    if (loading || userLoading || !user) {
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

    return <div>
        <Appbar />
        <div className="md:grid md:grid-cols-5 flex justify-center flex-col">
            <div className="md:col-span-3 m-10">
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
            <div className="md:col-span-2 flex justify-center">
                <UserCard user={user} />
            </div>
        </div>
    </div>
}

export const UserCard = ({ user }: { user: User }) => {
    const navigate = useNavigate()
    return <div className="m-10">
        <figure className="flex flex-col justify-center p-10 text-center border border-blue-200 rounded-sm">
            <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 ">
                <h3 className="text-lg font-semibold text-gray-900 ">{user.name}</h3>
                <p className="my-4">About coming soon</p>
            </blockquote>
            <figcaption className="flex items-center justify-center ">
                <Avatar name={user.name[0]} />
                <div className="space-y-0.5 font-medium rtl:text-right ms-3">
                    <div>{user.email}</div>
                    <div className="text-sm text-gray-500 ">Developer</div>
                </div>
            </figcaption>
        </figure>
        <div className="flex justify-center pt-4">
            <button type="button"
                onClick={() => {
                    navigate('/user/settings/account')
                }}
                className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >Edit Profile</button>
        </div>
    </div>

}