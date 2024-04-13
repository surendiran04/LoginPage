import { Link } from "react-router-dom";
import { useAuthContext } from "../Contexts/AuthContext";
import { FileX2 } from "lucide-react";

export default function NotFound() {
  const { isLoggedIn } = useAuthContext();

  return (
    <div className="bg-gray-100 flex items-center justify-center  h-screen">
      <div className="bg-white rounded-lg shadow-md p-6 w-96">
        <div className="p-4 flex">
          <h3 className="text-xl font-semibold mb-2 mr-6">404 NOT FOUND</h3>
          <FileX2 size={36} />
          </div>
          <h5>
            Page that you are looking for is either NOT FOUND or You're not
            allowed to that page
          </h5>
          <p>
            Please Go Back to{" "}
            <Link
              to={isLoggedIn ? "/dashboard" : "/"}
              className="text-blue-700 underline cursor-pointer font-bold "
            >
              {isLoggedIn ? "dashboard" : "Login"}
            </Link>
          </p>
      </div>
    </div>
  );
}
