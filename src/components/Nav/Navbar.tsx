"use client";
import { UserButton, useAuth } from "@clerk/clerk-react";
import { Drawer as SlidingBar } from "antd";
import { useState } from "react";
import Link from "next/link";

import dashboard from "@/assets/dashboard.svg";
import star from "@/assets/star.svg";
import circle from "@/assets/circle.svg";
import Image from "next/image";

const Navbar = () => {
  const { isSignedIn } = useAuth();
  const [navBarIsOpen, setNavBarIsOpen] = useState(false);

  const ToggleSlider = () => {
    setNavBarIsOpen(true);
  };

  const ToggleClose = () => {
    setNavBarIsOpen(false);
  };

  return (
    <nav className="border-b bg-[#F6F6F7] sticky top-0 left-0 border-b-[#C7CAD0] px-4 w-full lg:min-w-[80vw] min-w-[100vw] z-0 py-3">
      <div className="xl:justify-between justify-between flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="16"
          viewBox="0 0 18 16"
          fill="none"
          className="cursor-pointer outline-none flex-shrink-0 xl:hidden"
          onClick={ToggleSlider}
        >
          <path
            d="M0 0H18V2H0V0ZM0 7H12V9H0V7ZM0 14H18V16H0V14Z"
            fill="#252931"
          />
        </svg>
        <div className="ml-6 hidden relative lg:flex lg:justify-center lg:items-center xl:w-[420px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16.993"
            height="16.13"
            viewBox="0 0 18 18"
            fill="none"
            className="cursor-pointer absolute left-0"
          >
            <path
              d="M8.03228 0.934937C12.1881 0.934937 15.561 4.13657 15.561 8.08145C15.561 12.0263 12.1881 15.228 8.03228 15.228C3.87645 15.228 0.503601 12.0263 0.503601 8.08145C0.503601 4.13657 3.87645 0.934937 8.03228 0.934937ZM8.03228 13.6398C11.2675 13.6398 13.8879 11.1525 13.8879 8.08145C13.8879 5.01043 11.2675 2.52305 8.03228 2.52305C4.79704 2.52305 2.17664 5.01043 2.17664 8.08145C2.17664 11.1525 4.79704 13.6398 8.03228 13.6398ZM15.1304 13.6963L17.4964 15.9422L16.3134 17.0652L13.9474 14.8193L15.1304 13.6963Z"
              fill="#252931"
            />
          </svg>
          <input
            type="search"
            className="bg-[#E7E8EA] px-[14px] py-[10px] font-inter text-sm w-[460px] sm:min-w-[100%]  
              rounded-md placeholder:text-[14px] placeholder:text-black placeholder:pl-8 outline-none pl-2 md:mr-7 xl:mr-10"
            placeholder="Search"
          />
        </div>
        <div className="flex items-center gap-3">
          EN
          <div className="w-[1px] h-4 bg-[#82868F]"></div>
          {isSignedIn ? (
            <UserButton />
          ) : (
            <Link href="/sign-in" className="hover:text-gray-300">
              Log In
            </Link>
          )}
        </div>
      </div>
      <SlidingBar
        placement={"left"}
        closable={false}
        onClose={ToggleClose}
        open={navBarIsOpen}
        key={"left"}
      >
        <div className="mb-4 font-inter flex justify-between">
          <h1 className="mx-auto text-center text-lg font-inter font-semibold">
            Tasks App
          </h1>
          <button className="hover:text-gray-400" onClick={ToggleClose}>
            {"<"}
          </button>
        </div>
        <div className="flex flex-col  justify-start gap-2 font-inter text-sm">
          <Link
            href="/"
            className="hover:text-gray-300 flex items-center gap-2 "
          >
            <Image src={circle} width={20} alt="dash" /> Todos
          </Link>
          <Link
            href="/important"
            className="hover:text-gray-300 flex items-center gap-2 "
          >
            <Image src={star} width={20} alt="dash" /> Important
          </Link>
          <Link
            href="/my-day"
            className="hover:text-gray-300 flex items-center gap-2 "
          >
            <Image src={dashboard} width={20} alt="dash" /> Charts
          </Link>
        </div>
      </SlidingBar>
    </nav>
  );
};

export default Navbar;
