import React, { useEffect, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import skeletonList from "@/public/dummylist.json";
import Icons from "@/components/Icons";
import Image from "next/image";
import { Scrollbar } from "react-scrollbars-custom";
import { isListDetailVisibleAtom } from "@/state/baseAtoms";
import { fetchListsAtom } from "@/state/methods/fetchListsAtom";
import {
  listDetailAtom,
  listsAtom,
  loadingAtom,
  errorAtom,
} from "@/state/listAtoms";
import { IoMdRefresh } from "react-icons/io";

interface SelectListType {
  id: string;
  title: string;
  content: string;
  is_public: boolean;
  updated_at: string;
  created_at: string;
}

const Lists = ({}: { onSelectList: (list: SelectListType) => void }) => {
  const setFetchLists = useSetAtom(fetchListsAtom); // Use the setAtom to trigger fetchLists
  const lists = useAtomValue(listsAtom); // Get lists from atom
  const loading = useAtomValue(loadingAtom); // Get loading state from atom
  const error = useAtomValue(errorAtom); // Get error state from atom
  const setListDetail = useSetAtom(listDetailAtom); // Set clicked list in atom

  const setListDetailVisible = useSetAtom(isListDetailVisibleAtom);

  const handleListClick = (list: SelectListType) => {
    setListDetail(list); // Set the clicked list detail to listDetailAtom
    setListDetailVisible(true); // Set list detail modal visibility true
  };

  // Refresh Button
  const [refreshAnim, setRefreshAnim] = useState("");
  const refreshListButton = async () => {
    setRefreshAnim("animate-spin");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await setFetchLists();
    setRefreshAnim("");
  };

  // Trigger fetch when the component mounts or the login state changes
  useEffect(() => {
    setFetchLists(); // Trigger fetching lists
  }, [setFetchLists]);

  // Skeleton List
  if (loading) {
    return (
      <div className="w-[20vw] h-[70.4vh] bg-[#8fd2ff] bg-opacity-0 rounded-b-2xl overflow-hidden overflow-y-auto custom-scrollbar">
        <div>
          {skeletonList.map((item, index) => (
            <div
              key={index}
              className="bg-white w-full flex flex-col pl-5 pr-6 py-5 relative mt-[3px] rounded-[4px] select-none"
            >
              <span className="opacity-0 w-[13vw] text-black text-lg font-semibold">
                {item.title}
              </span>
              <span className="opacity-0 flex flex-row gap-x-1 text-zinc-700 text-sm my-2 justify-start">
                {Icons.ListPerson}
                {item.email}
              </span>
              <span className="opacity-0 text-zinc-700 text-md">
                {item.content}
              </span>
              <span className="opacity-0 text-zinc-500 text-sm absolute top-5 right-7">
                {item.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error handling
  if (error) return <div className="text-red-700">{error}</div>;

  if (lists.length === 0)
    return (
      <div className="w-[20vw] h-[70.4vh] bg-[#8fd2ff] bg-opacity-0 rounded-b-2xl overflow-hidden overflow-y-auto custom-scrollbar">
        <div
          onClick={() => {}} // Handle list click
          className="bg-white w-full h-[70.4vh] flex justify-center items-center text-center pl-5 pr-6 py-5 relative mt-[3px] rounded-[4px] select-none transition duration-150 ease-in-out"
        >
          <div className="flex flex-col justify-center gap-y-6 w-[14vw] -mt-[4.6vh]">
            <div className="w-[260px] h-[260px]">
              <Image src={"/vis1.webp"} alt={""} width={400} height={400} />
            </div>
            <p className="text-gray-800 font-medium text-2xl">
              No lists found, you can create one!
            </p>
          </div>
        </div>
      </div>
    );

  // Main UI: Displaying lists
  return (
    <div
      className={`relative w-[20vw] h-[70.4vh] bg-[#8fd2ff] bg-opacity-0 overflow-hidden overflow-y-auto custom-scrollbar rounded-b-2xl`}
    >
      <Scrollbar disableTracksWidthCompensation style={{}}>
        {lists.map((item, index) => (
          <div
            key={index}
            onClick={() => handleListClick(item)} // Handle list click
            className={`${
              index === lists.length - 1 ? `rounded-b-2xl` : `rounded-b-[4px]`
            } rounded-t-[4px] bg-white hover:bg-slate-200 w-full flex flex-col cursor-pointer pl-5 pr-6 py-5 relative mt-[3px] select-none transition duration-150 ease-in-out`}
          >
            <span className="w-[13vw] text-black text-lg font-semibold">
              {item.title}
            </span>
            <span className="flex flex-row gap-x-1 text-zinc-700 text-sm my-2 justify-start items-center">
              {item.is_public ? Icons.Public : Icons.Lock}
              {item.is_public ? "Public" : "Private"}
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

      <div className="absolute right-8 bottom-6 bg-[#384d5f] p-1.5 bg-opacity-30 rounded-full shadow-[0_0px_30px_-15px_rgba(0,0,0,0.7)]">
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
