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

  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      })
      .then((response) => {
        setBlogs(response.data.posts);
        setLoading(false);
      }).catch((err) => {
        if (err.response.status === 401) {
          navigate('/signin')
        }
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

  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      })
      .then((response) => {
        setBlog(response.data.post);
        setLoading(false);
      }).catch((err) => {
        if (err.response.status === 401) {
          navigate('/signin')
        }
      });;
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
  const [user, setUser] = useState<User>();
  const [userLoading, setLoading] = useState(true);

  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/user`, {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      })
      .then((response) => {
        setUser(response.data.userData);
        setLoading(false);
      }).catch((err) => {
        if (err.response.status === 401) {
          navigate('/signin')
        }
      });
  }, []);

  return {
    userLoading,
    user,
  };
};