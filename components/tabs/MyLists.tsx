import React from "react";
import NoAuth from "@/components/screens/NoAuth";
import { useAtomValue } from "jotai";
import { isUserLoggedInAtom } from "@/state/authAtoms";
import UserListScreen from "@/components/mylists/MyListScreen";

const MyLists = () => {
  const isUserLoggedin = useAtomValue(isUserLoggedInAtom);

  return (
    <div className="w-[63vw] h-[85vh] flex justify-center items-center bg-[#8fd2ff] bg-opacity-60">
      <div className="relative w-[58vw] h-[75vh] flex flex-row justify-between rounded-2xl overflow-hidden">
        {isUserLoggedin === true && <UserListScreen />}

        {isUserLoggedin === false && <NoAuth />}
      </div>
    </div>
  );
};

export default MyLists;
