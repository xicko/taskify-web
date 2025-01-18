import React, { useState } from "react";
import { Button, Field, Input } from "@headlessui/react";
import Icons from "@/components/Icons";

const MyListSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
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
        <div className="bg-white">
          <Button className="relative flex items-center justify-center min-w-full min-h-full rounded-md bg-[#8fd2ff] py-2 px-4 text-sm text-black">
            <div className="flex items-center justify-center">
              {Icons.Search} {/* Ensure Icons.Search is correctly imported */}
            </div>
          </Button>
        </div>
      </Field>
    </div>
  );
};

export default MyListSearchBar;
