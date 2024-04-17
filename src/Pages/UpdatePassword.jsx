import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { useJwt } from "react-jwt";
const { VITE_BACKEND_URL } = import.meta.env;
import "../App.css";

export default function UpdatePassword() {
  const { id, token } = useParams();
  const { decodedToken, isExpired } = useJwt(token || "");
  let notify = () => toast.warn(errors.password?.message);
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
    if(isExpired || decodedToken.id!=id){
       toast.info('Time expired or mismatching Link');
    }
    else{ 
    changePassword(data);
    }
    reset();
  };

  const changePassword = async(data)=>{
    try{
      setIsLoading(true)
    const response = await fetch(`${VITE_BACKEND_URL}/resetPassword/${id}/${token}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      const result=await response.json()
        if (result.success) {
          toast.success(result.message);
          navigate("/");
        }
        else{
          toast.info(result.message);
        }
      }
      catch(error)  {
        toast.error(error.message);
      }finally {
        setIsLoading(false); // Set isLoading back to false after the request completes
      };
  }

  return (
    <div className="flex justify-center items-center font-anta bg-gradient3">
      <div class="md:w-1/3 w-1/2 md:h-1/2 h-1/3 md:mt-4 rounded-md p-6  card-gradient">
        <div class="space-y-2 text-center mb-10">
          <h3 class="text-2xl tracking-wide text-white italic">
            Reset password
          </h3>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex">
            <input
              name="password"
               type={isShow ? "text" : "password"}
              placeholder="Enter your new Password "
              className="w-full p-3 rounded-full text-xl text-black outline-none border-none px-5 z-0"
              disabled={isLoading}
              {...register("password", {
                required: "this is required",
                minLength: { value: 8, message: "Minimum length should be 8" },
              })}
            />
             <div onClick={toggleState} classname="cursor-pointer flex-grow ">
              {isShow ? (
                <Eye size={32} color={"white"} />
              ) : (
                <EyeOff size={32} color={"white"} />
              )}
            </div>
          </div>
          <button
            className={`
        w-full
        rounded-full
         font-semibold py-3 px-4 border hover:border-transparent transition duration-500 outline-none ${
           isLoading
             ? "bg-green-400 hover:bg-green-600 text-white"
             : "bg-transparent border-slate-500 hover:bg-cyan-500 hover:text-slate-800 text-cyan-400"
         }`}
            type="submit"
            onClick={notify}
            disabled={isLoading}
          >
            {isLoading ? "Loading" : "Change new Password"}
          </button>
        </form>
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
