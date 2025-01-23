import React, { useEffect, useState } from "react";
import ScrollBar from "react-scrollbars-custom";
import { useAtomValue, useSetAtom } from "jotai";
import { isListDetailVisibleAtom } from "@/state/baseAtoms";
import { listDetailAtom } from "@/state/listAtoms";
import { FaEdit, FaTimes, FaTrashAlt } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { deleteListAtom } from "@/state/methods/deleteListAtom";
import { toast } from "sonner";

const MyListDetail = () => {
  // Access the selected list
  const list = useAtomValue(listDetailAtom);
  const [listDetail, setListDetail] = useState(list);

  // Fade Anim
  const [isFading, setIsFading] = useState(false);
  useEffect(() => {
    if (listDetail !== list) {
      setIsFading(true);

      // Delay list update
      const timeout = setTimeout(() => {
        setListDetail(list);
        setIsFading(false);
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [list, listDetail]);

  // Method to toggle newlistmodal
  const setListDetailVisible = useSetAtom(isListDetailVisibleAtom);

  // Method to delete current list
  const deleteList = useSetAtom(deleteListAtom);
  const handleDelete = () => {
    if (list) {
      deleteList(list.id);
      setListDetailVisible(false);
      toast("List deleted.");
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

  const copyLink = () => {
    const baseUrl = window.location.origin;
    navigator.clipboard.writeText(`${baseUrl}/?list=${list?.id.toString()}`);
    toast("Link copied to clipboard.");
  };

  if (!listDetail) {
    // Handle the case when no list is selected
    return (
      <div className="w-[36vw] h-[75vh] pl-11 pr-2 py-8 selection:bg-[#8fd2ff] selection:text-black rounded-2xl bg-white overflow-y-auto custom-scrollbar flex items-center justify-center">
        <p className="text-gray-500 text-lg">
          Select a list to view its details
        </p>
      </div>
    );
  }

  return (
    <section className="bg-white relative w-[36vw] h-[75vh] flex flex-col justify-between pl-11 pr-2 py-8 selection:bg-[#8fd2ff] selection:text-black rounded-2xl overflow-y-auto custom-scrollbar">
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
        className={`flex flex-col mt-2 transition-opacity ease-in-out ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
      >
        <span className="text-sm text-zinc-600">
          {listDetail.is_public ? "Public" : "Private"}
        </span>
        <span className="text-sm text-zinc-600">
          Updated on: {new Date(listDetail.updated_at).toLocaleString("en-US")}
        </span>
        <span className="text-sm text-zinc-600">
          Created on: {new Date(listDetail.created_at).toLocaleString("en-US")}
        </span>
      </div>

      <div
        className={`absolute bottom-8 right-8 flex space-x-2 transition-opacity ease-in-out ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Copy Button */}
        <button
          onClick={() => copyLink()}
          className="cursor-pointer flex items-center px-3 py-2 hover:bg-zinc-200 rounded-md transition-all select-none"
        >
          <IoMdShare size={20} className="text-zinc-900 opacity-90" />
          <span hidden className="text-red-600">
            Delete
          </span>
        </button>

        {/* Delete Button */}
        <button
          onClick={() => openDeleteModal()}
          className="cursor-pointer flex items-center px-3 py-2 hover:bg-red-50 rounded-md transition-all select-none"
        >
          <FaTrashAlt size={14} className="mr-2 text-red-700 opacity-90" />
          <span className="text-red-600">Delete</span>
        </button>

        {/* Edit Button */}
        <button
          onClick={() => {}}
          className="cursor-pointer flex items-center px-3 py-2 hover:bg-sky-50 rounded-md transition-all select-none"
        >
          <FaEdit size={16} className="mr-2 text-sky-700" />
          <span className="text-sky-600">Edit</span>
        </button>

        {/* Close Button */}
        <button
          onClick={() => setListDetailVisible(false)}
          className="cursor-pointer flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-all select-none"
        >
          <FaTimes className="mr-2 text-gray-700" />
          <span className="text-gray-800">Close</span>
        </button>
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

export default MyListDetail;
