import React from "react";
import ScrollBar from "react-scrollbars-custom";

const ListDetailSkeleton = () => {
  return (
    <div className="w-[36vw] h-[75vh] pl-11 pr-2 py-8 selection:bg-[#8fd2ff] selection:text-black rounded-2xl bg-white overflow-y-auto custom-scrollbar">
      <ScrollBar disableTracksWidthCompensation style={{}}>
        <h2 className="text-xl font-semibold"></h2>
        <p className="whitespace-pre-line"></p>
        <div className="hidden flex-col mt-4">
          <span className="text-sm text-zinc-500">Updated on:</span>
          <span className="text-sm text-zinc-500">Created on:</span>
        </div>
      </ScrollBar>
    </div>
  );
};

export default ListDetailSkeleton;
