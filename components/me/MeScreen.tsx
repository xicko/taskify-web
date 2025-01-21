import React, { useState } from "react";
import Image from "next/image";
import { useAtomValue, useSetAtom } from "jotai";
import { isUserLoggedInAtom, userEmailAtom } from "@/state/authAtoms";
import { deleteAllListsAtom } from "@/state/methods/deleteAllListsAtom";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@headlessui/react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { changeEmailAtom } from "@/state/methods/changeEmailAtom";
import { useAtom } from "jotai";
import {
  accountSettingsMessageAtom,
  isListDetailVisibleAtom,
} from "@/state/baseAtoms";
import { exportAllUserListsAtom } from "@/state/methods/exportAllUserLists";
import { toast } from "sonner";

const MeScreen = () => {
  const setIsUserLoggedIn = useSetAtom(isUserLoggedInAtom);
  const setUserEmail = useSetAtom(userEmailAtom);

  // Settings Message Modal & State
  const [settingsMessageModal, setSettingsMessageModal] = useState(false);
  const [accountSettingsMessage, setAccountSettingsMessage] = useAtom(
    accountSettingsMessageAtom
  );
  const closeSettingsMessage = () => {
    setSettingsMessageModal(false);
  };

  // For displaying user email address
  const userEmail = useAtomValue(userEmailAtom);

  // Delete All User Lists
  const deleteAllLists = useSetAtom(deleteAllListsAtom);
  const setListDetailVisible = useSetAtom(isListDetailVisibleAtom);
  const handleDeleteAllLists = () => {
    deleteAllLists();
    toast("All lists have been deleted");
    setDeleteModalVisible(false);
    setListDetailVisible(false);
  };

  // Delete modal
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const openDeleteModal = () => {
    setDeleteModalVisible(true);
  };
  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
  };

  // Log out
  const handleLogOut = async () => {
    try {
      // Call Supabase's signOut method
      await supabase.auth.signOut();

      setIsUserLoggedIn(false); // Set the user as not logged in
      setUserEmail(null); // Clear the stored email

      toast("Logged out");
    } catch (error) {
      console.log(error);
      toast("Unable to log out");
    }
  };

  // Email change
  const [email, setEmail] = useState(userEmail);
  const changeEmail = useSetAtom(changeEmailAtom);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleEmailChange = () => {
    if (email != userEmail) {
      changeEmail(email ?? userEmail ?? "");

      setSettingsMessageModal(true);
      setAccountSettingsMessage(
        "Email change request sent, please check your inbox and confirm your new email."
      );
    } else {
      toast("New email cannot be same as current email.");
    }
  };

  // Export Lists as JSON
  const exportAllUserLists = useSetAtom(exportAllUserListsAtom);
  const handleExportLists = async () => {
    toast("Exporting...");
    await new Promise((resolve) => setTimeout(resolve, 600));
    exportAllUserLists();
  };

  return (
    <div className="relative bg-white w-[58vw] h-[75vh] flex flex-row justify-between gap-x-20 px-11 py-8 selection:bg-[#8fd2ff] selection:text-black rounded-2xl overflow-y-auto custom-scrollbar">
      {/* Left */}
      <div className="flex flex-col justify-start">
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
                  handleLogOut();
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
              placeholder="Email address"
              value={email ?? ""}
              onChange={handleChange}
              id="email"
              type="email"
            />
            <button
              onClick={() => handleEmailChange()}
              className="font-medium px-3 rounded-r-md"
            >
              <span
                className={`${
                  userEmail === email
                    ? "bg-zinc-300 text-zinc-800"
                    : "bg-[#83ceff] text-black"
                } bg-opacity-50 hover:bg-opacity-70 -ml-1 px-2 py-1 rounded-md transition-all`}
              >
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
          <button
            onClick={() => handleExportLists()}
            className="w-full h-fit py-2 border-2 hover:bg-gray-200 bg-white text-black rounded-md font-medium transition-colors "
          >
            Export all lists
          </button>

          <button
            onClick={() => openDeleteModal()}
            className="w-full h-fit py-2 border-2 hover:border-red-500 hover:bg-red-500 bg-white text-black hover:text-white rounded-md font-medium transition-colors"
          >
            <span>Delete all lists</span>
          </button>
        </div>
      </div>

      {/* Right */}
      <Disclosure
        as="div"
        hidden
        className="w-[18vw] h-fit transition-all rounded-xl"
      >
        <DisclosureButton className="w-full px-4 pt-4 text-left">
          <h2 className="text-xl font-semibold border-b">About Taskify</h2>
        </DisclosureButton>
        <div className="overflow-hidden">
          <DisclosurePanel
            transition
            className="px-4 pb-4 origin-top transition duration-200 ease-out data-[closed]:-translate-y-80 data-[closed]:opacity-0"
          >
            <div className="flex flex-col gap-y-4 py-1">
              <p className="text-md font-normal">
                Taskify is an open-source to-do list app that allows users to
                create and manage personal task lists. Users can create lists
                with an ability to make them public to share with the community.
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
          </DisclosurePanel>
        </div>
      </Disclosure>

      {deleteModalVisible === true && (
        <div className="absolute w-[58vw] h-[75vh] ">
          <div className="flex justify-center items-center min-w-full min-h-full bg-black bg-opacity-40 z-10 -ml-11 -mt-8">
            <div className="w-[20vw] h-fit bg-white px-8 py-6 rounded-2xl z-20">
              <p className="text-xl font-medium pb-2">Confirm delete</p>
              <p>
                Are you sure you want to delete all your lists? This action
                cannot be undone.
              </p>
              <div className="flex flex-row justify-end gap-x-4 mt-4">
                <button onClick={() => closeDeleteModal()}>Cancel</button>
                <button
                  onClick={() => handleDeleteAllLists()}
                  className="text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {settingsMessageModal === true && (
        <div className="absolute w-[58vw] h-[75vh] select-none">
          <div
            onClick={() => closeSettingsMessage()}
            className="flex justify-center items-center min-w-full min-h-full bg-black bg-opacity-20 z-10 -ml-11 -mt-8"
          >
            <div
              onClick={() => {}}
              className="w-[24vw] h-fit bg-white px-8 py-6 text-black rounded-2xl z-20"
            >
              <p className="text-xl font-medium pb-2">
                {accountSettingsMessage}
              </p>

              <div className="flex flex-row justify-center text-lg gap-x-4 mt-4">
                <button onClick={() => closeSettingsMessage()}>Dismiss</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeScreen;
