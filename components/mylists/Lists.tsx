import React, { useEffect, useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
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
  currentListAtom,
} from "@/state/listAtoms";
import { IoMdRefresh } from "react-icons/io";
import RichTextRenderer from "../RichTextRenderer";
import {
  editListIdAtom,
  isDiscardEditVisibleAtom,
  isEditModeAtom,
} from "@/state/listEditAtoms";

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
  const isListDetailVisible = useAtomValue(isListDetailVisibleAtom);

  // Store clicked list id (for selected list UI indicator)
  const [currentList, setCurrentList] = useAtom(currentListAtom);

  // Edit list discard confirmation dialog visibility
  const setIsDiscardEditVisible = useSetAtom(isDiscardEditVisibleAtom);

  const isEditMode = useAtomValue(isEditModeAtom);

  // Get editing list id and compare with item for showing editing indicator svg
  const editListId = useAtomValue(editListIdAtom);
  function isEditing(item: SelectListType): boolean {
    if (!isListDetailVisible) {
      return editListId === item.id;
    }
    return false;
  }

  // Control list detail visibility
  const setListDetailVisible = useSetAtom(isListDetailVisibleAtom);

  // Handle when a list item is clicked
  const handleListClick = (list: SelectListType) => {
    if (isEditMode) {
      // Open discard confirmation dialog if editmode is true
      setIsDiscardEditVisible(true);
      return;
    } else {
      // Handle list click normally
      setCurrentList(list.id); // Set clicked list id for UI update

      setListDetail(list); // Set the clicked list detail to listDetailAtom
      setListDetailVisible(true); // Set list detail modal visibility true

      window.history.pushState(null, "", `/?list=${list.id}`);
    }
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

  // Error handling
  if (error) return <div className="text-red-700">{error}</div>;

  if (lists.length === 0)
    return (
      <div
        className={`${
          loading ? "opacity-0" : "opacity-100"
        } w-[20vw] h-[70.4vh] bg-[#8fd2ff] bg-opacity-0 rounded-b-2xl overflow-hidden overflow-y-auto custom-scrollbar transition-opacity duration-500 ease-in-out`}
      >
        <div className="bg-white w-full h-[70.4vh] flex justify-center items-center text-center pl-5 pr-6 py-5 relative mt-[3px] rounded-[4px] select-none transition duration-150 ease-in-out">
          <div className="flex flex-col justify-center gap-y-6 w-[14vw] -mt-[4.6vh]">
            <div className="w-[260px] h-[260px] self-center">
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
            onClick={() => handleListClick(item)} // Handle list click
            className={`${
              index === lists.length - 1 ? `rounded-b-2xl` : `rounded-b-[4px]`
            } ${
              lists[index].id === currentList ? "bg-slate-200" : "bg-white"
            } hover:bg-slate-200 rounded-t-[4px] w-full flex flex-col cursor-pointer pl-5 pr-6 py-5 relative mt-[3px] select-none transition duration-150 ease-in-out`}
          >
            <span className="w-[13vw] text-black text-lg font-semibold line-clamp-3 text-ellipsis">
              {item.title}
            </span>
            <span className="flex flex-row gap-x-1 text-zinc-700 text-sm my-2 justify-start items-center">
              {item.is_public ? Icons.Public : Icons.Lock}
              {item.is_public ? "Public" : "Private"}
            </span>
            <span className="text-zinc-700 text-md whitespace-pre-line line-clamp-4 text-ellipsis overflow-hidden">
              <RichTextRenderer
                deltaJson={item.content}
                styles="text-zinc-700 text-md whitespace-pre-line line-clamp-4 text-ellipsis overflow-hidden"
              />
            </span>
            <span className="text-zinc-500 text-sm absolute top-5 right-7">
              {`${new Date(item.updated_at).getMonth() + 1}/${new Date(
                item.updated_at
              ).getDate()}/${new Date(item.updated_at).getFullYear()}`}
            </span>

            <div
              className={`${
                isEditing(item) ? "opacity-65" : "opacity-0"
              } absolute right-6 bottom-6 transition-all`}
            >
              {Icons.Editing}
            </div>
          </div>
        ))}
      </Scrollbar>

      <div
        hidden
        className="absolute right-8 bottom-6 bg-[#384d5f] p-1.5 bg-opacity-30 rounded-full shadow-[0_0px_30px_-15px_rgba(0,0,0,0.7)]"
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
