import React, { useEffect, useState } from "react";
import skeletonList from "@/public/dummylist.json";
import Icons from "@/components/Icons";
import { Scrollbar } from "react-scrollbars-custom";
import { useAtomValue, useSetAtom } from "jotai";
import { fetchPublicListsAtom } from "@/state/methods/fetchPublicListsAtom";
import { listsPublicAtom, loadingAtom } from "@/state/listAtoms";
import { IoMdRefresh } from "react-icons/io";

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

  const handleListClick = (list: ListsType) => {
    onSelectList(list);
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

  // Trigger fetch when the component mounts or the login state changes
  useEffect(() => {
    setFetchPublicLists(); // Trigger fetching lists
  }, [setFetchPublicLists]);

  // Skeleton List
  if (loading)
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
                {item.email.split("@")}
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

  // Main UI
  return (
    <div className="relative w-[20vw] h-[70.4vh] bg-[#8fd2ff] bg-opacity-0 rounded-b-2xl overflow-hidden overflow-y-auto custom-scrollbar">
      <Scrollbar disableTracksWidthCompensation style={{}}>
        {lists.map((item, index) => (
          <div
            key={index}
            onClick={() => handleListClick(item)}
            className="bg-white hover:bg-slate-200 w-full flex flex-col cursor-pointer pl-5 pr-6 py-5 relative mt-[3px] rounded-[4px] select-none ease-in-out transition duration-150"
          >
            <span className="w-[13vw] text-black text-lg font-semibold">
              {item.title}
            </span>
            <span className="flex flex-row gap-x-1 text-zinc-700 text-sm my-2 justify-start">
              {Icons.ListPerson}
              {item.email.split("@")[0]}
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
