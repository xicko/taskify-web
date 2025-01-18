import React, { useState } from "react";
import Image from "next/image";
import { useAtomValue, useSetAtom } from "jotai";
import { isUserLoggedInAtom, userEmailAtom } from "@/state/authAtoms";
import { deleteAllListsAtom } from "@/state/methods/deleteAllListsAtom";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@headlessui/react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

const MeScreen = () => {
  const setIsUserLoggedIn = useSetAtom(isUserLoggedInAtom);
  const setUserEmail = useSetAtom(userEmailAtom);

  // For displaying user email address
  const userEmail = useAtomValue(userEmailAtom);

  // For feedback text
  const setStatus = useState<string | null>(null)[1];

  // Delete All User Lists
  const [deleteMessage, setDeleteMessage] = useState("Delete all lists");
  const deleteAllLists = useSetAtom(deleteAllListsAtom);
  const handleDeleteAllLists = () => {
    deleteAllLists();
    setDeleteMessage("All lists have been deleted");
  };

  const handleSignOut = async () => {
    try {
      // Call Supabase's signOut method
      await supabase.auth.signOut();

      // Update Jotai atoms to reflect the signed-out state
      setIsUserLoggedIn(false); // Set the user as not logged in
      setUserEmail(null); // Clear the stored email

      console.log("User signed out successfully");
      setStatus("Successfully logged out");
    } catch (error) {
      console.error("Error signing out:", error);
      setStatus("Sign out unsuccessful");
    }
  };

  return (
    <div className="bg-white w-[58vw] h-[75vh] flex flex-row justify-start gap-x-20 px-11 py-8 selection:bg-[#8fd2ff] selection:text-black rounded-2xl overflow-y-auto custom-scrollbar">
      {/* Left */}
      <div className="flex flex-col justify-between">
        <>
          <span className="font-semibold text-2xl select-none">
            Account Settings
          </span>
          <div className="flex items-center my-6">
            <div className="w-[100px] h-[100px] overflow-hidden rounded-full flex justify-center items-center mr-6">
              <Image
                src={"/avatarrnd.webp"}
                alt="Avatar"
                draggable={false}
                width={200}
                height={200}
                className="select-none"
              />
            </div>
            <div className="flex flex-col justify-start items-start gap-y-2">
              <p className="text-xl font-medium text-black -mt-1">
                {userEmail}
              </p>{" "}
              <button
                onClick={() => {
                  handleSignOut();
                }}
                className="w-fit text-zinc-800 bg-zinc-200 hover:bg-zinc-300 transition-all px-2 rounded-lg font-medium select-none"
              >
                Log out
              </button>
            </div>
          </div>
        </>

        <div className="flex flex-col mb-10 items-start">
          <span className="mb-2 font-medium text-lg select-none">
            Change Email
          </span>
          <div className="flex flex-row justify-start">
            <Input
              className="w-full py-1 bg-transparent text-lg outline-none border-b-2 border-gray-200 focus:border-gray-600 transition-all"
              placeholder="example@gmail.com"
            />
            <button
              onClick={() => {}}
              className="font-medium px-3  rounded-r-md"
            >
              <span className="bg-[#83ceff] bg-opacity-50 hover:bg-opacity-70 -ml-1 px-2 py-1 rounded-md transition-all">
                Change
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-col items-start mb-10">
          <span className="mb-2 font-medium text-lg select-none">
            Update Password
          </span>
          <Input
            className="w-full py-1 bg-transparent text-lg outline-none border-b-2 border-gray-200 focus:border-gray-600 transition-all mb-2"
            placeholder="Current password"
          />
          <Input
            className="w-full py-1 bg-transparent text-lg outline-none border-b-2 border-gray-200 focus:border-gray-600 transition-all mb-2"
            placeholder="New password"
          />
          <Input
            className="w-full py-1 bg-transparent text-lg outline-none border-b-2 border-gray-200 focus:border-gray-600 transition-all mb-2"
            placeholder="Confirm new password"
          />
          <button
            onClick={() => {}}
            className="mt-1 font-medium bg-[#83ceff] bg-opacity-50 hover:bg-opacity-70 px-6 py-2 rounded-md select-none transition-all"
          >
            Update
          </button>
        </div>

        <div className="flex flex-row justify-between gap-x-4 mb-2">
          <button className="w-full h-fit py-2 border-2 hover:bg-gray-200 bg-white text-black rounded-md font-medium transition-colors ">
            Export all lists
          </button>
          <button
            onClick={() => handleDeleteAllLists()}
            className="w-full h-fit py-2 border-2 hover:border-red-500 hover:bg-red-500 bg-white text-black hover:text-white rounded-md font-medium transition-colors"
          >
            <span>Delete all lists</span>
          </button>
        </div>
      </div>

      {deleteMessage}

      {/* Right */}
      <div className="bg-zinc-200 h-full p-8 rounded-xl relative w-[18vw] text-black flex flex-col justify-start selection:bg-[#8fd2ff] selection:text-black overflow-y-auto custom-scrollbar">
        <h2 className="text-xl font-semibold mb-4">About Taskify</h2>
        <div className="flex flex-col gap-y-4">
          <p className="text-md font-normal">
            Taskify is an open-source to-do list app that allows users to create
            and manage personal task lists. Users can create lists with an
            ability to make them public to share with the community.
          </p>
          <p className="text-md font-normal">
            The app allows users to discover public lists created by other
            users, view their content, and interact with the community.
          </p>
          <p className="text-md font-normal">
            The mobile app is built using Flutter, the web version is built
            using NextJS / React. The whole project is open-source, and
            available on GitHub.
          </p>
          <p className="text-md font-normal">
            Developed by{" "}
            <Link
              target="_blank"
              className="animate-fontWeightPulse2"
              href={"https://github.com/xicko/"}
            >
              Dashnyam Batbayar
            </Link>
          </p>

          <Link
            className="w-fit"
            target="_blank"
            draggable="false"
            href={"https://github.com/xicko/taskify"}
          >
            <div className="flex flex-row w-fit justify-center items-center gap-x-2 text-black font-medium bg-zinc-300 hover:bg-zinc-200 transition-colors px-4 py-2 rounded-full">
              <FaGithub />
              <span>GitHub</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MeScreen;
