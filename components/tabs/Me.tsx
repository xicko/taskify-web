import React from "react";
import NoAuth from "@/components/screens/NoAuth";
import { isUserLoggedInAtom } from "@/state/authAtoms";
import { useAtomValue } from "jotai";
import MeScreen from "@/components/me/MeScreen";

const Me = () => {
  const isUserLoggedIn = useAtomValue(isUserLoggedInAtom);

  // Showing login screen if not logged in
  if (isUserLoggedIn === false)
    return (
      <div className="w-[63vw] h-[85vh] flex justify-center items-center bg-[#8fd2ff] bg-opacity-60">
        <div className="relative w-[58vw] h-[75vh] flex flex-row justify-between rounded-2xl overflow-hidden">
          <NoAuth />
        </div>
      </div>
    );

  // Main
  return (
    <div className="w-[63vw] h-[85vh] bg-[#8fd2ff] bg-opacity-60 p-12 shadow-lg flex flex-row justify-between items-start">
      <MeScreen />
    </div>
  );
};

export default Me;
