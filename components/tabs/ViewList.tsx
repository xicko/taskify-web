import { listPfpAtom } from "@/state/authAtoms";
import { listViewAtom } from "@/state/listAtoms";
import { fetchPfpAtom } from "@/state/methods/fetchPfpAtom";
import { useAtomValue, useSetAtom } from "jotai";
import Image from "next/image";
import React, { useEffect } from "react";
import { FaEdit, FaTimes, FaTrashAlt } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import ScrollBar from "react-scrollbars-custom";
import { toast } from "sonner";
import RichTextRenderer from "../RichTextRenderer";

const ViewList = () => {
  const list = useAtomValue(listViewAtom);

  // Profile picture
  const fetchPfp = useSetAtom(fetchPfpAtom);
  const listPfp = useAtomValue(listPfpAtom);

  const copyLink = () => {
    const baseUrl = window.location.origin;
    navigator.clipboard.writeText(`${baseUrl}/?list=${list?.id.toString()}`);
    toast("Link copied to clipboard.");
  };

  useEffect(() => {
    // Fetch profile picture with given user_id
    fetchPfp(list?.user_id ?? "");
  });

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
              <p className="whitespace-pre-line pr-20">
                <RichTextRenderer
                  deltaJson={list.content}
                  styles="whitespace-pre-line pr-20 text-black"
                />
              </p>
            </ScrollBar>
          </div>

          <div className="flex flex-row justify-between items-end">
            <div className="flex flex-col mt-2">
              <p className="text-sm text-zinc-600">
                Updated on: {new Date(list.updated_at).toLocaleString("en-US")}
              </p>
              <p className="text-sm text-zinc-600">
                Created on: {new Date(list.created_at).toLocaleString("en-US")}
              </p>

              <div className="flex flex-row justify-start items-center font-medium gap-x-2 mt-2 select-none">
                <Image
                  src={listPfp ?? "/avatar.webp"}
                  alt={`${list.email.split("@")[0]}`}
                  className="rounded-sm"
                  draggable={false}
                  width={30}
                  height={30}
                />

                {list.is_public ? (
                  <p className="text-md text-zinc-800">
                    {list.email.split("@")[0]}
                  </p>
                ) : (
                  <p className="text-md text-zinc-800">
                    {list.is_public ? "Public" : "Private"}
                  </p>
                )}
              </div>
            </div>

            {/* Copy Button */}
            <span
              onClick={() => copyLink()}
              className="cursor-pointer flex items-center px-3 py-3 mr-6 h-fit bg-zinc-100 hover:bg-zinc-200 rounded-md transition-all select-none"
            >
              <IoMdShare size={20} className="text-zinc-900 opacity-90" />
              <p hidden className="text-red-600">
                Copy
              </p>
            </span>
          </div>

          <div className="hidden bottom-8 right-8 absolute space-x-2">
            {/* Delete Button */}
            <span
              onClick={() => {}}
              className="cursor-pointer flex items-center px-3 py-2 hover:bg-red-50 rounded-md transition-all select-none"
            >
              <FaTrashAlt size={14} className="mr-2 text-red-700 opacity-90" />
              <p className="text-red-600">Delete</p>
            </span>

            {/* Edit Button */}
            <span
              onClick={() => {}}
              className="cursor-pointer flex items-center px-3 py-2 hover:bg-sky-50 rounded-md transition-all select-none"
            >
              <FaEdit size={16} className="mr-2 text-sky-700" />
              <p className="text-sky-600">Edit</p>
            </span>

            {/* Close Button */}
            <span
              onClick={() => {}}
              className="cursor-pointer flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-all select-none"
            >
              <FaTimes className="mr-2 text-gray-700" />
              <p className="text-gray-800">Close</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewList;
