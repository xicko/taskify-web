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
      <div className="w-[63vw] h-[85vh] flex justify-center items-center ">
        <div className="relative w-[58vw] h-[75vh] flex rounded-2xl overflow-hidden">
          <NoAuth />
        </div>
      </div>
    );

  // Main
  return (
    <div className="w-[63vw] h-[85vh] p-12 shadow-lg flex justify-center items-center">
      <MeScreen />
    </div>
  );
};

export default Me;
