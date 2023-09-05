import React from "react";
import { Link } from "react-router-dom";

function Login() {
    function handleLogin(event) {
        event.preventDefault();
        
        let email = event.target.email.value;
        let password = event.target.password.value;

        console.log(email,password)
        checkCredentials(email,password)

        var userToken = window.sessionStorage.getItem('token')

        if (userToken)
        {
            window.location = "/"
        }
    }

    async function checkCredentials(email,password) {
        var account = {
            'email':email,
            'password':password
        }
        const response = await fetch("http://65.1.76.191:5001/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(account),
          });
      
        const result = await response.json();
        
        if(result.user_id) {
            console.log(result)
            window.sessionStorage.setItem("token",result.user_id)
            window.location = "/"
        }

        else {
            alert("Invalid Username or Password.")
        }

    }

    return(
        <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12 xl:w-5/12 border border-2 p-3 m-10 mx-auto">
            <h1 className="text-black text-center logo-text">Buyer Login</h1>
            <p className="text-black text-center">Please Login to continue</p>
            <form onSubmit={handleLogin}>    
                <div class="relative mb-6 mt-4" data-te-input-wrapper-init>
                <input
                    type="text"
                    class="peer placeholder-gray-500 block min-h-[auto] w-full rounded border-2 px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear text-gray-700"
                    id="email"
                    placeholder="Email" name="Email" />
                </div>

            
                <div class="relative mb-6" data-te-input-wrapper-init>
                <input
                    type="password"
                    class="peer placeholder-gray-500 block min-h-[auto] w-full rounded border-2 px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear text-gray-700"
                    id="password"
                    placeholder="Password" name="password" />
                </div>


            
                <div class="text-center mx-auto">
                <button
                    class="inline-block rounded bg-black mb-4 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] mx-auto"
                    data-te-ripple-init
                    data-te-ripple-color="light">
                    Login
                </button>

                
                </div>
            </form>
            <Link>
                <p>Don't have an account yet? Sign up!</p>        
            </Link>
        </div>
        
    )
}

export default Login