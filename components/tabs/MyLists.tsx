import React from "react";
import NoAuth from "@/components/screens/NoAuth";
import { useAtomValue } from "jotai";
import { isUserLoggedInAtom } from "@/state/authAtoms";
import MyListScreen from "@/components/mylists/MyListScreen";

const MyLists = () => {
  const isUserLoggedin = useAtomValue(isUserLoggedInAtom);

  return (
    <div className="w-[63vw] h-[85vh] flex justify-center items-center">
      <div className="relative w-[58vw] h-[75vh] flex flex-row justify-between rounded-2xl overflow-hidden">
        {isUserLoggedin === true && <MyListScreen />}

        {isUserLoggedin === false && <NoAuth />}
      </div>
    </div>
  );
};

export default MyLists;
