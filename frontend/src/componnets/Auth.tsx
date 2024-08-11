import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@akshay15/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();

  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,

        postInputs
      );
      const jwt = response.data.jwt;
      localStorage.setItem("jwt", jwt);
      navigate("/blogs");
    } catch (e) {
      //alert the user req failed
      alert("Error Signing in");
    }
  }

  return (
    <div className=" h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold">Create an account</div>
            <div className="text-slate-500">
              {type === "signin"
                ? "Dont have an account"
                : "Already have an account?"}
              <Link
                to={type === "signin" ? "/signup" : "/signin"}
                className=" pl-2 underline"
              >
                {type === "signin" ? "Sign up" : "Login"}
              </Link>
            </div>
          </div>
          <div className="pt-8">
            {type === "signup" ? (
              <LabelledInput
                label="Name"
                placeholder="Akshay Chavan"
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs, //means retain username and passowrd
                    name: e.target.value, // and update name
                  });
                }}
              />
            ) : null}

            <LabelledInput
              label="Username"
              placeholder="akshay@gmail.com"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs, //means retain username and passowrd
                  username: e.target.value, // and update name
                });
              }}
            />
            <LabelledInput
              label="Password"
              placeholder="password"
              type="password"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs, //means retain username and passowrd
                  password: e.target.value, // and update name
                });
              }}
            />
            <button
              onClick={sendRequest}
              type="button"
              className="w-full mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {type === "signin" ? "Sign in" : "Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm font-extrabold text-black pt-4">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}