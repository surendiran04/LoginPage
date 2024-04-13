import React from "react";
import { LogOut } from "lucide-react";
import { useAuthContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";


function Dashboard() {
  const { user,setLoggedIn } = useAuthContext();

  const navigate = useNavigate();

  const Logout = ()=>{
    sessionStorage.removeItem('_tk');
    sessionStorage.removeItem('user');
    setLoggedIn(false)
    navigate('/');
  }
  
  return (
    <div>
      <div className="bg-gray-100 flex items-center justify-center h-screen">
        <div className="bg-white rounded-lg shadow-md p-6 w-64">
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">Dashboard</h3>
            <p className="text-gray-600">
              <h5>UserName:{user}</h5>
            </p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md" onClick={Logout}>
              <LogOut />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
