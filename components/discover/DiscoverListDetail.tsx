import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import ScrollBar from "react-scrollbars-custom";
import { toast } from "sonner";
import { listPfpAtom, userIdAtom } from "@/state/authAtoms";
import { useAtomValue, useSetAtom } from "jotai";
import { deleteListAtom } from "@/state/methods/deleteListAtom";
import Image from "next/image";
import { fetchPfpAtom } from "@/state/methods/fetchPfpAtom";

interface DiscoverListDetail {
  id: string;
  user_id: string;
  title: string;
  content: string;
  updated_at: string;
  created_at: string;
  email: string;
}

const DiscoverListDetail = ({ list }: { list: DiscoverListDetail }) => {
  const userId = useAtomValue(userIdAtom);

  // Profile picture
  const fetchPfp = useSetAtom(fetchPfpAtom);
  const listPfp = useAtomValue(listPfpAtom);

  // Setting listDetail from given prop
  const [listDetail, setListDetail] = useState<DiscoverListDetail>(list);

  // List Fade Anim
  const [isFading, setIsFading] = useState(false);
  useEffect(() => {
    if (listDetail !== list) {
      setIsFading(true);

      const timeout = setTimeout(() => {
        setListDetail(list);
        setIsFading(false);
      }, 100);

      return () => clearTimeout(timeout);
    }

    // Fetch profile picture with given user_id
    fetchPfp(listDetail.user_id ?? "");
  }, [list, listDetail, fetchPfp]);

  // Method to delete current list
  const deleteList = useSetAtom(deleteListAtom);
  const handleDelete = () => {
    if (list) {
      deleteList(list.id);
      toast("List deleted.");
      setDeleteModalVisible(false);
      window.history.replaceState(null, "", window.location.pathname);
    }
  };

  // Modal
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const openDeleteModal = () => {
    if (deleteModalVisible === false) {
      setDeleteModalVisible(true);
    }
  };
  const closeDeleteModal = () => {
    if (deleteModalVisible === true) {
      setDeleteModalVisible(false);
    }
  };

  // Copy link to clipboard
  const copyLink = () => {
    const baseUrl = window.location.origin;
    navigator.clipboard.writeText(`${baseUrl}/?list=${list?.id.toString()}`);
    toast("Link copied to clipboard.");
  };

  return (
    <section className="relative bg-white w-[36vw] h-[75vh] flex flex-col justify-between pl-11 pr-2 py-8 selection:bg-[#8fd2ff] selection:text-black rounded-2xl overflow-y-auto custom-scrollbar">
      <h2
        className={`text-xl font-semibold mb-1 transition-opacity ease-in-out ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
      >
        {listDetail.title}
      </h2>
      <div className="h-full">
        <ScrollBar disableTracksWidthCompensation>
          <p
            className={`whitespace-pre-line pr-20 transition-opacity ease-in-out ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
          >
            {listDetail.content}
          </p>
        </ScrollBar>
      </div>
      <div
        className={`flex flex-row justify-between items-end transition-opacity ease-in-out ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className={`flex flex-col mt-2`}>
          <p className="text-sm text-zinc-600">
            Updated on:{" "}
            {new Date(listDetail.updated_at).toLocaleString("en-US")}
          </p>
          <p className="text-sm text-zinc-600">
            Created on:{" "}
            {new Date(listDetail.created_at).toLocaleString("en-US")}
          </p>
          <div className="flex flex-row justify-start items-center font-medium gap-x-2 mt-2 select-none">
            <Image
              src={listPfp ?? "/avatar.webp"}
              alt={`${listDetail.email.split("@")[0]}`}
              className="rounded-sm"
              draggable={false}
              width={30}
              height={30}
            />
            {list.user_id != userId && (
              <p className="text-md text-zinc-800">
                {listDetail.email.split("@")[0]}
              </p>
            )}
          </div>
        </div>

        <div
          className={`${
            list.user_id === userId && "pr-9"
          } flex flex-row justify-end`}
        >
          {/* Copy Button */}
          <button
            onClick={() => copyLink()}
            className="cursor-pointer h-fit flex px-3 py-3 mr-6 bg-zinc-100 hover:bg-zinc-200 rounded-md transition-all select-none"
          >
            <IoMdShare size={20} className="text-zinc-900 opacity-90" />
            <p hidden className="text-red-600">
              Delete
            </p>
          </button>

          {list.user_id === userId && (
            <>
              {/* Delete Button */}
              <button
                onClick={() => openDeleteModal()}
                className="cursor-pointer flex items-center px-3 py-2 hover:bg-red-50 rounded-md transition-all select-none"
              >
                <FaTrashAlt
                  size={14}
                  className="mr-2 text-red-700 opacity-90"
                />
                <p className="text-red-600">Delete</p>
              </button>

              {/* Edit Button */}
              <button
                onClick={() => {}}
                className="cursor-pointer flex items-center px-3 py-2 hover:bg-sky-50 rounded-md transition-all select-none"
              >
                <FaEdit size={16} className="mr-2 text-sky-700" />
                <p className="text-sky-600">Edit</p>
              </button>
            </>
          )}
        </div>
      </div>

      {deleteModalVisible === true && (
        <div
          className={`absolute bg-black flex justify-center items-center bg-opacity-40 w-[36vw] h-[75vh] -ml-11 -my-8 z-50`}
        >
          <div className="bg-white rounded-xl p-6 w-96 space-y-4">
            <h2 className="text-xl font-semibold">
              Are you sure you want to delete this list?
            </h2>
            <p className="">This action cannot be undone.</p>

            <div className="flex justify-end space-x-4">
              <button className="rounded-md" onClick={() => closeDeleteModal()}>
                Cancel
              </button>
              <button className="text-red-800" onClick={() => handleDelete()}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DiscoverListDetail;
