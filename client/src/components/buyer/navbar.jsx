import { Link } from "react-router-dom";
import {useState} from "react";

import LoginBtn from "./buttons/loginBtn";
import LogoutBtn from "./buttons/logoutBtn";

function Navbar( {login} ) {
    let button;
    console.log(login);
    if (login === false) {
        button = <LoginBtn />
    } else {
        button = <LogoutBtn />
    }
    return (
        <>
            <div className="antialiased bg-gray-200 mb-20">
                <header className="lg:px-16 px-6 bg-green-100 flex flex-wrap items-center lg:py-0 py-2">
                    <div className="flex-1 flex justify-between items-center">
                        <Link to="/">
                            <img style={{"width":"35%", "paddingTop":"10px"}} src="https://res.cloudinary.com/dhzdzjgtd/image/upload/v1677169600/SneakerStreet/logos/Sneaker-Street-Logo-Long-transparent.png" alt="Sneaker Street" />
                        </Link>
                    </div>

                    <label htmlFor="menu-toggle" className="pointer-cursor lg:hidden block"><svg className="fill-current text-gray-900" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><title>menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path></svg></label>
                    <input className="hidden" type="checkbox" id="menu-toggle" />

                    <div className="hidden lg:flex lg:items-center lg:w-auto w-full" id="menu">
                        <nav>
                            <ul className="lg:flex items-center justify-between text-base text-gray-700 pt-4 lg:pt-0">
                                <li>
                                    <Link to="/" className="lg:p-4 text-black hover:text-blue-300 py-3 px-0 block border-b-2 border-transparent hover:border-blue-400" href="#">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/products" className="lg:p-4 text-black hover:text-blue-300 py-3 px-0 block border-b-2 border-transparent hover:border-blue-400" href="#">
                                        Products
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/about-us" className="lg:p-4 text-black hover:text-blue-300 py-3 px-0 block border-b-2 border-transparent hover:border-blue-400" href="#">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/cart">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 96 960 960" width="48"><path d="M280.402 984.761q-31.579 0-53.838-22.488-22.26-22.488-22.26-54.067t22.488-53.838q22.488-22.259 54.067-22.259t53.838 22.488q22.26 22.488 22.26 54.067 0 31.578-22.488 53.838-22.488 22.259-54.067 22.259Zm408.513 0q-31.679 0-53.819-22.488-22.139-22.488-22.139-54.067t22.423-53.838q22.423-22.259 53.911-22.259 31.799 0 53.939 22.488t22.14 54.067q0 31.578-22.388 53.838-22.387 22.259-54.067 22.259ZM238.022 316.87l104.652 216.304H632L750.174 316.87H238.022Zm-36.957-74.435h601.314q25.329 0 38.823 23.63 13.494 23.631.298 47.5L703.45 561.529q-11.311 20.175-30.675 33.247-19.365 13.072-42.851 13.072h-305.62l-50 92.956h494.457v74.435H270.63q-46.717 0-66.576-31.859-19.858-31.858.62-70.337l62-115.043-150.565-320.13h-81.24v-74.435h129.196l37 79Zm141.609 290.739H632 342.674Z"/></svg>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/qna" className="lg:p-4 text-white hover:text-green-300 py-3 px-0 block" href="#">
                                        <button className="bg-green-500 py-2 px-3">Ask ChatGPT!</button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/profile" className="lg:p-4 text-white hover:text-blue-300 block" href="#">
                                        <button className="bg-blue-500 py-2 px-3">Profile</button>
                                    </Link>
                                </li>
                                <li className="ml-8">
                                    {button}
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>
            </div>
        </>
    );
  }
  
  export default Navbar;
  