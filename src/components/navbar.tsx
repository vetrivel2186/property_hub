'use client'
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
export default function Navbar() {
  const router =useRouter();
  let user:any = "";
  console.log(user)

  const logoutFunc =()=>{
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken")
    console.log("logout")
}
  useEffect(() => {
    user = JSON.parse(localStorage.getItem("loginUser")||"");
    console.log(user)
  }, [])

  return (
    <nav className="flex justify-between items-center p-4 shadow">
      <h1 onClick={()=>router.push('/')} className="text-2xl font-bold text-blue-600 cursor-pointer">
        Property Hub
      </h1>

      <div className="flex gap-6">
        <a href="/">Home</a>
        <a href="/properties">Properties</a>
        {
          user ? <><a href="/login">Login</a>
        <a href="/register">Register</a></>:<a href="/" onClick={()=>{logoutFunc()}}>logout</a>
        }
      </div>
    </nav>
  );
}