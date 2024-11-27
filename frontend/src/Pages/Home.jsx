import React from 'react'
import RoleManagement from "../Components/RoleManagement/RoleManagement";
import UserManagement from "../Components/UserManagement/UserManagement";
const Home = () => {
const [activetab,setActivetab] = React.useState("user");
  return (
    <div className="">
      <div className="flex space-x-5 mb-6 border-b justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600 border-gray-200 p-2">
        <button
          className={`px-4 py-2 font-medium rounded-2xl text-white ${
            activetab === "user"
              ? " bg-gray-500"
              : ""
          }`}
          onClick={() => setActivetab("user")}
        >
         View User
        </button>
        <button
          className={`px-4 py-2 font-medium rounded-2xl text-white ${
            activetab === "role"
              ? "text-white bg-gray-500"
              : ""
          }`}
          onClick={() => setActivetab("role")}
        >
          View Role
        </button>
      </div>

      <div className="">
        {activetab === "user" ? <UserManagement /> : <RoleManagement />}
      </div>
    </div>
  )
}

export default Home
