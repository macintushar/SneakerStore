import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AdminNavbar from "./admin-navbar";

function AdminLogin(){  
  function handleLogin(event) {
    event.preventDefault();
    
    let username = event.target.username.value;
    let password = event.target.password.value;

    console.log(username,password)
    checkCredentials(username,password)

    var userToken = window.sessionStorage.getItem('admin-token')

    if (userToken)
    {
        window.location = "/admin"
    }
  }

  async function checkCredentials(username,password) {
    if(username === "tushar" || password === "Tusharsk911") {
      window.sessionStorage.setItem("admin-token","76c93e41-8bfa-4d58-8673-82e173c8f885")
    }

  }

  return(
    <>
    <AdminNavbar />
      <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12 xl:w-5/12 border border-2 p-3 m-10 mx-auto">
        <h1 className="text-black text-center">Admin Login</h1>
        <p className="text-black text-center">Please Login to continue</p>
          <form onSubmit={handleLogin}>    
              <div class="relative mb-6" data-te-input-wrapper-init>
              <input
                  type="text"
                  class="peer placeholder-gray-500 block min-h-[auto] w-full rounded border-2 px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear text-gray-700"
                  id="username"
                  placeholder="Username" name="Username" />
              </div>
              <div class="relative mb-6" data-te-input-wrapper-init>
              <input
                  type="password"
                  // class="peer placeholder-black-400 block min-h-[auto] w-full rounded border-2  px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200"
                  class="peer placeholder-gray-500 block min-h-[auto] w-full rounded border-2 px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear text-gray-700"
                  id="password"
                  placeholder="Password" name="password" />
              </div>
              <div class="text-center mx-auto">
              <button
                  class="inline-block rounded bg-black px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] mx-auto"
                  data-te-ripple-init
                  data-te-ripple-color="light">
                  Login
              </button>
              </div>
          </form>
      </div>
    </>
  )
}

export default AdminLogin