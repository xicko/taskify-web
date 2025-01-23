import React from "react";
import DiscoverListScreen from "@/components/discover/DiscoverListScreen";

const Discover = () => {
  return (
    <div className="w-[63vw] h-[85vh] flex justify-center items-center">
      <div className="w-[58vw] h-[75vh] flex flex-row justify-between rounded-xl overflow-hidden">
        <DiscoverListScreen />
      </div>
    </div>
  );
};

export default Discover;
