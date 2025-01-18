import React from "react";
import ScrollBar from "react-scrollbars-custom";

interface MyListDetail {
  title: string;
  content: string;
  updated_at: string;
  created_at: string;
  email: string;
}

const MyListDetail = ({ list }: { list: MyListDetail }) => {
  return (
    <div className="bg-white w-[36vw] h-[75vh] flex flex-col justify-between pl-11 pr-2 py-8 selection:bg-[#8fd2ff] selection:text-black rounded-2xl overflow-y-auto custom-scrollbar">
      <h2 className="text-xl font-semibold mb-1">{list.title}</h2>
      <div className="h-full">
        <ScrollBar disableTracksWidthCompensation>
          <p className="whitespace-pre-line pr-20">{list.content}</p>
        </ScrollBar>
      </div>
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
    </div>
  );
};

export default MyListDetail;
