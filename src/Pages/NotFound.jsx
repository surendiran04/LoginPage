import { Link } from "react-router-dom";
import { useAuthContext } from "../Contexts/AuthContext";
import { FileX2 } from "lucide-react";

export default function NotFound() {
  const { isLoggedIn } = useAuthContext();
  
  return (
    <div className="flex align-items-center justify-center ">
      <div>
      <h3 >404 NOT FOUND</h3>
      <FileX2 size={36}/>
      <h5>Page that you are looking for is either NOT FOUND or You're not allowed to that page</h5>
      <p>
        Please Go Back to <Link to={isLoggedIn?"/dashboard":"/"}  className="text-blue-700 underline cursor-pointer font-bold ">{ isLoggedIn?"dashboard":"Login"}</Link>
      </p>
    </div>
    </div>
  );
}
