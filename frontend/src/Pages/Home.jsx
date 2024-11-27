import React from 'react'
import RoleManagement from "../Components/RoleManagement/RoleManagement";
import UserManagement from "../Components/UserManagement/UserManagement";
const Home = () => {
const [activetab,setActivetab] = React.useState("user");
  return (
    <div className="">
      <div className="flex space-x-5 mb-6 border-b justify-center items-center border-gray-200">
        <button
          className={`px-4 py-2 font-medium ${
            activetab === "user"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
          onClick={() => setActivetab("user")}
        >
         View User
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activetab === "role"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-600"
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
