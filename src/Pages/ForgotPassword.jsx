import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
const { VITE_BACKEND_URL } = import.meta.env;

import "../app.css"

export default function ForgotPassword() {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();


  const onSubmit = (data) => {
    handleEmail(data);
    reset();
  };

  function handleEmail(data) {
    fetch(`${VITE_BACKEND_URL}/forgotPassword`, {
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
            // sessionStorage.setItem("_tk", result.token);
            console.log(result.message);
            // setIsLoggedIn(true);
            navigate("/Dashboard");
          }catch (error) {
            console.log("helo1")
            console.log(error);
          }
        }
      })
      .catch((error) => {
        console.log("helo2")
        console.log(error);
      });
  }


  return (
    <div class="flex justify-center items-center font-anta bg-gradient2">
      <div class="md:w-1/3 w-1/2 md:h-1/2 h-1/3 md:mt-4 rounded-md p-6  card-gradient">
        <div class="space-y-2 text-center">
          <h5 class="text-xl text-white">Check Inbox After entering Email</h5>
        </div>

        <form className="space-y-6 mt-10" onSubmit={handleSubmit(onSubmit)}>
        <input
            name="email"
            className="w-full p-3 rounded-full text-xl text-black outline-none border-none px-5  shadow-xl"
            placeholder="Enter your Email"
            type="email"
            {...register("email", { required: "This is required" })}
            // disabled={isLoading}
          />
          <p>{errors.email?.message}</p>
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
            {isLoading ? "Loading" : "Send Mail"}
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
            Don't have an Email?{" "}
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
