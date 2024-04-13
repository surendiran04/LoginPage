import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
const { VITE_BACKEND_URL } = import.meta.env;
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../App.css";

export default function ForgotPassword() {
  let notify = () =>
  toast.warn( errors.email?.message);
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
  
     //using then catch block
    // fetch(`${VITE_BACKEND_URL}/forgotPassword`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((result) => {
    //     if (result.success) {
    //       toast.success(result.message);
    //     }
    //     else{
    //       toast.info(result.message);
    //     }
    //   })
    //   .catch((error) => {
    //     toast.error(error.message);
    //   })
    // };

  const handleEmail=async(data) =>{
    try {
      setIsLoading(true); // Set isLoading to true when the request starts

      const response = await fetch(`${VITE_BACKEND_URL}/forgotPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {

        toast.success(result.message);
      } else {
        toast.info(result.message);
      }
    } catch (error) {
  
      toast.error(error.message);
      console.error(error);
    } finally {
      setIsLoading(false); // Set isLoading back to false after the request completes
    }
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
            disabled={isLoading}
          />
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
            onClick={notify}
            disabled={isLoading}
          >
            {isLoading ? "Loading" : "Send Mail"}
          </button>
        </form>
        <div className="text-center mt-7">
          <p className="text-white font-semibold text-[18px]">
            Don't have an Email?{" "}
            <Link
              to="/signup"
              className="text-blue-700 underline cursor-pointer font-bold "
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
    </div>
  );
}
