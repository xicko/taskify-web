import React, { useRef, useState } from "react";
import { Button, Field, Input } from "@headlessui/react";
import Icons from "@/components/Icons";
import { useSetAtom } from "jotai";
import { searchPublicListAtom } from "@/state/methods/searchPublicListAtom";
import { MdClear } from "react-icons/md";

const DiscoverListSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchPublicList = useSetAtom(searchPublicListAtom);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);

    // Clear the previous timeout
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      searchPublicList(event.target.value);
    }, 700);
  };

  // For search button - not used
  const handleSearch = () => {
    if (searchQuery.length > 0) {
      searchPublicList(searchQuery);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    searchPublicList("");
  };

  return (
    <div className="overflow-hidden">
      <Field className="w-[20vw] h-[4.6vh] flex flex-row justify-between border-4 border-white rounded-t-2xl rounded-b-[4px] overflow-hidden">
        <Input
          id="search"
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          className="w-full py-1 border-2 border-transparent outline-none px-4"
          placeholder="Search..."
        />

        {searchQuery.length > 0 && (
          <div
            onClick={() => clearSearch()}
            className="bg-white flex justify-center px-3 cursor-pointer"
          >
            <MdClear className="text-xl self-center" />
          </div>
        )}

        <div hidden className="bg-white">
          <Button
            onClick={() => handleSearch()}
            className="relative flex items-center justify-center min-w-full min-h-full rounded-md bg-[#8fd2ff] py-2 px-4 text-sm text-black"
          >
            <div className="flex items-center justify-center">
              {Icons.Search} {/* Ensure Icons.Search is correctly imported */}
            </div>
          </Button>
        </div>
      </Field>
    </div>
  );
};

export default DiscoverListSearchBar;
