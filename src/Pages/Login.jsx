import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Contexts/AuthContext";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
const { VITE_BACKEND_URL } = import.meta.env;
import "../App.css";

export default function Login() {
  // const { setLoggedIn } = useAuthContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const toggleState = () => {
    setIsShow(!isShow);
  };

  const onSubmit = (data) => {
    console.log(data);
    handleLogin(data);
    reset();
  };

  function handleLogin(data) {
    fetch(`${VITE_BACKEND_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.success) {
          try {
            sessionStorage.setItem("_tk", result.token);
            console.log(result.token);
            // setIsLoggedIn(true);
            navigate("/Dashboard");
          } catch (error) {
            console.log(error);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="flex justify-center items-center font-anta bg-gradient">
      <div className="md:w-1/3 w-1/2 md:h-3/4 h-1/3 md:mt-4 rounded-md p-6  card-gradient">
        <div className="flex items-center justify-center flex-col gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-12 h-12 p-2 rounded-full shadow-lg text-white bg-purple-500"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clipRule="evenodd"
            />
          </svg>
          <h1
            className="text-3xl font-bold  text-white  tracking-wide text-center mb-6
            italic"
          >
            Login
          </h1>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <input
            name="email"
            className="w-full p-3 rounded-full text-xl text-black outline-none border-none px-5  shadow-xl"
            placeholder="Enter your Email"
            type="email"
            {...register("email", { required: "This is required" })}
            // disabled={isLoading}
          />
          <p>{errors.email?.message}</p>
          <div className="flex">
          <input
            name="password"
            type={isShow ? "text" : "password"}
            placeholder="Enter your Password "
            className="w-full p-3 rounded-full text-xl text-black outline-none border-none px-5 z-0"
            // disabled={isLoading}
            {...register("password",{
              required: "this is required",
              minLength: { value: 8, message: "Minimum length should be 8" },
            })}
          />
          <div onClick={toggleState} classname="cursor-pointer  mt-10">
            {isShow ? <Eye size={36} /> : <EyeOff size={36} />}
          </div>
          </div>
          <p>{errors.password?.message}</p>
          <Link
              to="/forgotPassword"
              className="text-blue-700 cursor-pointer font-bold "
            >
              Forgot Password
            </Link>
          <button
            className={`
        w-full
        rounded-full
         font-semibold hover:text-white py-3 px-4 border hover:border-transparent transition duration-500 outline-none ${
           isLoading
             ? "bg-green-400 hover:bg-green-600 text-white"
             : "bg-transparent border-purple-500 hover:bg-purple-500 text-purple-700"
         }`}
            type="submit"
          >
            {isLoading ? "Loading" : "Login"}
          </button>
          {/* {errorMsg !== null && errorMsg[0] && (
            <div className="bg-red-500 text-white rounded-3xl w-full text-xl sm:text-md text-center my-8 p-4 h-full">
              {errorMsg.map((error, i) => (
                <p key={i}>{error}</p>
              ))}
            </div>
          )} */}
        </form>
        <div className="text-center mt-7">
          <p className="text-white font-semibold text-[18px]">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-700 cursor-pointer font-bold "
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
