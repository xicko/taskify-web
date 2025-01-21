"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Icons from "@/components/Icons";
import { useAtom } from "jotai";
import { navIndexAtom } from "@/state/baseAtoms";

export const NavBar = () => {
  const [navIndex, setNavIndex] = useAtom(navIndexAtom);

  // Handle navbar index
  const handleNavigate = (index: number) => {
    setNavIndex(index);

    // Clear url query param whenever navbarindex changes
    window.history.replaceState(null, "", window.location.pathname);
  };

  return (
    <div className="w-[12vw] h-[85vh] flex flex-col justify-start overflow-hidden bg-[#296085] bg-opacity-60">
      <div className="flex justify-center h-[25vh] relative">
        <div className="flex justify-center pt-[4vh] overflow-hidden">
          <div className="w-[7vw] h-[7vh]">
            <Image
              src={"/logo1500white.png"}
              alt={"Logo"}
              height={4000}
              width={4000}
              draggable={false}
            />
          </div>
        </div>
        <div className="self-center absolute top-[19vh] text-white select-none text-4xl transition-all animate-fontWeightPulse">
          Taskify
        </div>
      </div>

      <div className="grid h-[57vh] grid-cols-1 grid-rows-3 justify-center place-items-center">
        <Link
          href=""
          onClick={() => handleNavigate(0)}
          draggable={false}
          className={`${
            navIndex === 0 && `bg-sky-50 bg-opacity-10`
          } w-[12vw] h-[18vh] flex flex-col justify-center items-center text-white font-normal hover:font-semibold hover:scale-110 transition-all ease-in-out duration-300`}
        >
          <div className="w-[50px] h-[50px]">
            {navIndex === 0 ? Icons.AssignmentFilled : Icons.AssignmentOutline}
          </div>
          <span className="text-lg">My Lists</span>
        </Link>
        <Link
          href=""
          draggable={false}
          onClick={() => handleNavigate(1)}
          className={`${
            navIndex === 1 && `bg-sky-50 bg-opacity-10`
          } w-[12vw] h-[18vh] flex flex-col  justify-center items-center text-white font-normal hover:font-semibold hover:scale-110 transition-all ease-in-out duration-300`}
        >
          <div className="w-[50px] h-[50px]">
            {navIndex === 1 ? Icons.ExploreFilled : Icons.ExploreOutline}
          </div>

          <span className="text-lg">Discover</span>
        </Link>
        <Link
          href=""
          draggable={false}
          onClick={() => handleNavigate(2)}
          className={`${
            navIndex === 2 && `bg-sky-50 bg-opacity-10`
          } w-[12vw] h-[18vh] flex flex-col  justify-center items-center text-white font-normal hover:font-semibold hover:scale-110 transition-all ease-in-out duration-300`}
        >
          <div className="w-[50px] h-[50px]">
            {navIndex === 2 ? Icons.PersonFilled : Icons.PersonOutline}
          </div>
          <span className="text-lg">Me</span>
        </Link>
      </div>
    </div>
  );
};
