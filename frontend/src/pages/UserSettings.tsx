import { useState } from "react";
import { Appbar } from "../componnets/Appbar";
import { User, useUser } from "../hooks";
import { BlogSkeleton } from "../componnets/BlogSkeleton";
import axios from "axios";
import { BACKEND_URL } from "../config";

export default function UserSettings() {

    const { user, userLoading } = useUser();

    if (userLoading || !user) {
        return (
            <div>
                <Appbar />
                <div className="flex justify-center">
                    <div>
                        //Todo : add User Skeleton
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
        <div>
            <div className="p-12 text-4xl font-bold">
                Settings
            </div>
            <div>
                <UserInfo user={user} />
            </div>
        </div>
    </div>
}

function UserInfo({ user }: { user: User }) {
    const [userData, setUserData] = useState({
        name: user.name,
        username: user.email, // Assuming email is present in the user object
        password: user.password, // Assuming password is present in the user object
    });

    const sendReq = async () => {
        const response = await axios.put(`${BACKEND_URL}/api/v1/user/${user.id}`, userData, {
            headers: {
                Authorization: localStorage.getItem("jwt")
            }
        })
        alert("Updated Profile!")
        setUserData(response.data)
    }

    return (
        <div className="w-2/3 text-md">
            <div className="flex justify-between p-4 border-b border-slate-100">
                <div>
                    {user.name}
                </div>
                <input type="text"
                    value={userData.name}
                    onChange={(e) => {
                        setUserData({
                            ...userData, //means retain username and passowrd
                            name: e.target.value, // and update name
                        });
                    }} />
            </div>

            <div className="flex justify-between p-4 border-b border-slate-200">
                <div>
                    Email address
                </div>
                <input type="text"
                    value={userData.username}
                    onChange={(e) => {
                        setUserData({
                            ...userData, //means retain username and passowrd
                            username: e.target.value, // and update name
                        });
                    }} />
            </div>

            <div className="flex justify-between p-4 border-b border-slate-200">
                <div>
                    Password
                </div>
                <input type="text"
                    value={userData.password}
                    onChange={(e) => {
                        setUserData({
                            ...userData, //means retain username and passowrd
                            password: e.target.value, // and update name
                        });
                    }} />
            </div>
            <div className="pt-6 flex justify-center pr-40">
                <button type="button"
                    onClick={sendReq}
                    className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >Update Info</button>
            </div>
        </div>
    )
}