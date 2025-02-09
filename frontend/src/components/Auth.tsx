import { SignupInput } from "@yashgtech007/medeum-blog";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router";
import { BACKEND_URL } from "../config";
import { handleError, handleSuccess } from "../Utils";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
// import 'react-hot-toast/dist/react-hot-toast.css';

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });

  
  async function sendRequest() {
    try {
      console.log("yash before response");
      
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
        console.log(response,"yash");

        const jwt = response.data?.jwt
        console.log(response.data,"yash signup response");
        
        if (jwt) {
          localStorage.setItem("token", jwt); // Store the token
          navigate("/blogs"); // Navigate to the Home page
        } else {
          alert("Token not found in response.");
        }
      } catch (e) {
        alert("Error: " + e.message); // Log the error message
        console.error(" yash Error details:", e); // Optionally log the actual error for debugging
      }
}

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div className="px-10">
          <div>
            <div className="text-4xl font-bold pb-4 ">
              {type === "signup" ? "Sign Up" : "Sign In"}
            </div>
          </div>
          <div>
            {type === "signup" && (
              <LabeledInput
                label="Name"
                placeholder="yash gupta..."
                onChange={(e) => {
                  setPostInputs((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }));
                }}
              />
            )}
            <LabeledInput
              label="Email"
              placeholder="yashgupta@gmail.com"
              onChange={(e) => {
                setPostInputs((prev) => ({
                  ...prev,
                  email: e.target.value,
                }));
              }}
            />
            <LabeledInput
              label="Password"
              type={"password"}
              placeholder="password"
              onChange={(e) => {
                setPostInputs((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
              }}
            />
            <button
              onClick={sendRequest}
              type="button"
              className="w-full text-white bg-black focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-4 me-2 mb-2 mt-8"
            >
              {type === "signup" ? "Create an account" : "Sign in"}
            </button>
            <div className="text-lg font-normal text-center mb-4 text-slate-500">
              {type === "signin"
                ? "Don't have an account? "
                : "Already have an account?"}
              <Link
                className="pl-2 underline"
                to={type === "signin" ? "/signup" : "/signin"}
              >
                {type === "signin" ? "Sign up" : "Sign in"}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

interface LabeledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabeledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabeledInputType) {
  return (
    <div>
      <div>
        <label className="block mb-2 text-sm font-semibold text-black mt-4 ">
          {label}
        </label>
        <input
          onChange={onChange}
          type={type || "text"}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
}

export default Auth;
