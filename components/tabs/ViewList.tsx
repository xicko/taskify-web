import { listViewAtom } from "@/state/listAtoms";
import { useAtomValue } from "jotai";
import Image from "next/image";
import React from "react";
import { FaEdit, FaTimes, FaTrashAlt } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import ScrollBar from "react-scrollbars-custom";
import { toast } from "sonner";

const ViewList = () => {
  const list = useAtomValue(listViewAtom);

  const copyLink = () => {
    const baseUrl = window.location.origin;
    navigator.clipboard.writeText(`${baseUrl}/?list=${list?.id.toString()}`);
    toast("Link copied to clipboard.");
  };

  if (!list)
    return (
      <div className="w-[63vw] h-[85vh] flex justify-center items-center">
        <div className="relative w-[58vw] h-[75vh] flex flex-row justify-between rounded-2xl overflow-hidden">
          <div className="bg-white text-2xl font-medium relative w-[58vw] h-[75vh] flex flex-col justify-center items-center gap-y-8 pl-11 pr-2 py-8 selection:bg-[#8fd2ff] selection:text-black rounded-2xl overflow-y-auto custom-scrollbar">
            <div className="w-[16vw] h-auto">
              <Image
                src={"/404.webp"}
                alt=""
                width={1500}
                height={700}
                draggable={false}
              />
            </div>
            <p>List is private or doesn&apos;t exist.</p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="w-[63vw] h-[85vh] flex justify-center items-center">
      <div className="relative w-[58vw] h-[75vh] flex flex-row justify-between rounded-2xl overflow-hidden">
        <div className="bg-white relative w-[58vw] h-[75vh] flex flex-col justify-between pl-11 pr-2 py-8 selection:bg-[#8fd2ff] selection:text-black rounded-2xl overflow-y-auto custom-scrollbar">
          <h2 className="text-xl font-semibold mb-1">{list.title}</h2>
          <div className="h-full">
            <ScrollBar disableTracksWidthCompensation>
              <p className="whitespace-pre-line pr-20">{list.content}</p>
            </ScrollBar>
          </div>

          <div className="flex flex-row justify-between items-end">
            <div className="flex flex-col mt-2">
              {list.is_public ? (
                <span className="text-sm text-zinc-600">
                  Shared by: {list.email.split("@")[0]}
                </span>
              ) : (
                <span className="text-sm text-zinc-600">
                  {list.is_public ? "Public" : "Private"}
                </span>
              )}
              <span className="text-sm text-zinc-600">
                Updated on: {new Date(list.updated_at).toLocaleString("en-US")}
              </span>
              <span className="text-sm text-zinc-600">
                Created on: {new Date(list.created_at).toLocaleString("en-US")}
              </span>
            </div>

            {/* Copy Button */}
            <span
              onClick={() => copyLink()}
              className="cursor-pointer flex items-center px-3 py-3 mr-6 h-fit bg-zinc-100 hover:bg-zinc-200 rounded-md transition-all select-none"
            >
              <IoMdShare size={20} className="text-zinc-900 opacity-90" />
              <span hidden className="text-red-600">
                Copy
              </span>
            </span>
          </div>

          <div className="hidden bottom-8 right-8 absolute space-x-2">
            {/* Delete Button */}
            <span
              onClick={() => {}}
              className="cursor-pointer flex items-center px-3 py-2 hover:bg-red-50 rounded-md transition-all select-none"
            >
              <FaTrashAlt size={14} className="mr-2 text-red-700 opacity-90" />
              <span className="text-red-600">Delete</span>
            </span>

            {/* Edit Button */}
            <span
              onClick={() => {}}
              className="cursor-pointer flex items-center px-3 py-2 hover:bg-sky-50 rounded-md transition-all select-none"
            >
              <FaEdit size={16} className="mr-2 text-sky-700" />
              <span className="text-sky-600">Edit</span>
            </span>

            {/* Close Button */}
            <span
              onClick={() => {}}
              className="cursor-pointer flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-all select-none"
            >
              <FaTimes className="mr-2 text-gray-700" />
              <span className="text-gray-800">Close</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewList;
