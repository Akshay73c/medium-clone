import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export interface Blog {
  content: string;
  title: string;
  id: number;
  author: {
    name: string;
    email: string
  };
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((response) => {
        setBlogs(response.data.posts);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blogs,
  };
};

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((response) => {
        setBlog(response.data.post);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blog,
  };
};

export interface User {
  name: string;
  email: string;
  id: string;
  password: string
}

export const useUser = () => {
  const [userLoading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((response) => {
        setUser(response.data.userData);
        setLoading(false);
      }).catch((err) => {
        const navigate = useNavigate();
        // alert("You are not logged in")
        console.log(err)
        navigate('/signin')
      });
  }, []);

  return {
    userLoading,
    user,
  };
};