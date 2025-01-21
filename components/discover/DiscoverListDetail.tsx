import React from "react";
import { IoMdShare } from "react-icons/io";
import ScrollBar from "react-scrollbars-custom";
import { toast } from "sonner";

interface MyListDetail {
  id: string;
  title: string;
  content: string;
  updated_at: string;
  created_at: string;
  email: string;
}

const DiscoverListDetail = ({ list }: { list: MyListDetail }) => {
  const copyLink = () => {
    const baseUrl = window.location.origin;
    navigator.clipboard.writeText(`${baseUrl}/?list=${list?.id.toString()}`);
    toast("Link copied to clipboard.");
  };

  return (
    <div className="bg-white w-[36vw] h-[75vh] flex flex-col justify-between pl-11 pr-2 py-8 selection:bg-[#8fd2ff] selection:text-black rounded-2xl overflow-y-auto custom-scrollbar">
      <h2 className="text-xl font-semibold mb-1">{list.title}</h2>
      <div className="h-full">
        <ScrollBar disableTracksWidthCompensation>
          <p className="whitespace-pre-line pr-20">{list.content}</p>
        </ScrollBar>
      </div>
      <div className="flex flex-row justify-between items-end">
        <div className="flex flex-col mt-2">
          <span className="text-sm text-zinc-600">
            Shared by: {list.email.split("@")[0]}
          </span>
          <span className="text-sm text-zinc-600">
            Updated on: {new Date(list.updated_at).toLocaleDateString("en-US")}
          </span>
          <span className="text-sm text-zinc-600">
            Created on: {new Date(list.created_at).toLocaleDateString("en-US")}
          </span>
        </div>
        {/* Copy Button */}
        <div
          onClick={() => copyLink()}
          className="cursor-pointer h-fit flex px-3 py-3 mr-6 bg-zinc-100 hover:bg-zinc-200 rounded-md transition-all select-none"
        >
          <IoMdShare size={20} className="text-zinc-900 opacity-90" />
          <span hidden className="text-red-600">
            Delete
          </span>
        </div>
      </div>
    </div>
  );
};

export default DiscoverListDetail;
