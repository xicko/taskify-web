import React, { useEffect, useRef, useState } from "react";
import { Scrollbar } from "react-scrollbars-custom";
import { useAtomValue, useSetAtom } from "jotai";
import { fetchPublicListsAtom } from "@/state/methods/fetchPublicListsAtom";
import { listsPublicAtom, loadingAtom } from "@/state/listAtoms";
import { IoMdRefresh } from "react-icons/io";
import { fetchUsersPfpAtom } from "@/state/methods/fetchUsersPfpAtom";
import Image from "next/image";

interface ListsType {
  id: string;
  user_id: string;
  title: string;
  content: string;
  updated_at: string;
  created_at: string;
  email: string;
}

const Lists = ({
  onSelectList,
}: {
  onSelectList: (list: ListsType) => void;
}) => {
  const loading = useAtomValue(loadingAtom); // Get loading state from atom
  const setFetchPublicLists = useSetAtom(fetchPublicListsAtom);
  const lists = useAtomValue(listsPublicAtom);

  // Fetch users profile pictures
  const fetchUsersPfp = useSetAtom(fetchUsersPfpAtom); // Method to fetch pfp based on user_id
  const [pfps, setPfps] = useState<Record<string, string>>({}); // Stores fetched user_id as key, and returns the base64 as string
  const fetchedUserIds = useRef(new Set<string>()); // Store fetched user ids

  // List click
  const handleListClick = (list: ListsType) => {
    // Passes selected list to parent
    onSelectList(list);

    // Sets url with list id as parameter
    window.history.pushState(null, "", `/?list=${list.id}`);
  };

  // Refresh Button
  const [refreshAnim, setRefreshAnim] = useState("");
  const refreshListButton = async () => {
    setRefreshAnim("animate-spin");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await setFetchPublicLists();
    setRefreshAnim("");
  };

  // Triggers when the component mounts or the login state changes
  useEffect(() => {
    setFetchPublicLists(); // Trigger fetching lists
  }, [setFetchPublicLists]);

  useEffect(() => {
    const fetchProfilePictures = async () => {
      // Empty object to store new profile pictures
      const newPfps: Record<string, string> = {};

      // Map through each item in the 'lists' to fetch the profile pictures
      const fetchPromises = lists.map(async (item) => {
        // Checks if pfps and fetchedUserIds dont contain the user id
        if (!pfps[item.user_id] && !fetchedUserIds.current.has(item.user_id)) {
          // Mark this user ID as already fetched to avoid redundant requests
          fetchedUserIds.current.add(item.user_id);

          // Fetch the profile picture (base64) for the current user
          const base64Pfp = await fetchUsersPfp(item.user_id);

          // If a profile picture is fetched, store in newPfps
          if (base64Pfp) {
            newPfps[item.user_id] = base64Pfp;
          }
        }
      });

      // Wait for all fetches to complete
      await Promise.all(fetchPromises);

      // Update pfps if newPfps contains new profile pictures
      if (Object.keys(newPfps).length > 0) {
        // Merge new PFPs with the previous ones
        setPfps((prev) => ({ ...prev, ...newPfps }));
      }
    };

    fetchProfilePictures(); // Trigger fetching of profile pictures
  });

  // Main UI
  return (
    <div className="relative w-[20vw] h-[70.4vh] bg-[#8fd2ff] bg-opacity-0 rounded-b-2xl overflow-hidden overflow-y-auto custom-scrollbar">
      <Scrollbar
        className={`${
          loading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-500 ease-in-out`}
        disableTracksWidthCompensation
        style={{}}
      >
        {lists.map((item, index) => (
          <div
            key={index}
            onClick={() => handleListClick(item)}
            className="bg-white hover:bg-slate-200 w-full flex flex-col cursor-pointer pl-5 pr-6 py-5 relative mt-[3px] rounded-[4px] select-none ease-in-out transition duration-150"
          >
            <span className="w-[13vw] text-black text-lg font-semibold">
              {item.title}
            </span>
            <span className="flex flex-row gap-x-2 text-zinc-700 text-sm my-2 justify-start items-center">
              <Image
                src={
                  Object.keys(pfps).length === 0
                    ? "/avatar.webp"
                    : `${pfps[item.user_id]}`
                }
                draggable={false}
                alt="Profile picture"
                className="rounded-sm"
                width={24}
                height={24}
              />
              <p>{item.email.split("@")[0]}</p>
            </span>
            <span className="text-zinc-700 text-md whitespace-pre-line line-clamp-4 text-ellipsis overflow-hidden">
              {item.content}
            </span>
            <span className="text-zinc-500 text-sm absolute top-5 right-7">
              {`${new Date(item.updated_at).getMonth() + 1}/${new Date(
                item.updated_at
              ).getDate()}/${new Date(item.updated_at).getFullYear()}`}
            </span>
          </div>
        ))}
      </Scrollbar>

      <div
        hidden
        className="absolute right-8 bottom-6 bg-[#5e5e5e] p-1.5 bg-opacity-50 rounded-full shadow-[0_0px_30px_-15px_rgba(0,0,0,0.7)]"
      >
        <button onClick={() => refreshListButton()}>
          <IoMdRefresh
            className={`${refreshAnim} w-10 h-10 mb-[-7px] fill-[#ffffff]`}
          />
        </button>
      </div>
    </div>
  );
};

export default Lists;
