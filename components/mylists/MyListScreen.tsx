import React, { useState } from "react";
import MyListSearchBar from "@/components/mylists/MyListSearchBar";
import Lists from "@/components/mylists/Lists";
import MyListDetail from "@/components/mylists/MyListDetail";
import NewList from "@/components/NewList";
import { useAtomValue } from "jotai";
import { isListDetailVisibleAtom } from "@/state/baseAtoms";

interface SelectedListType {
  title: string;
  content: string;
  updated_at: string;
  created_at: string;
}

const MyListScreen = () => {
  const setSelectedList = useState<SelectedListType | null>(null)[1];
  const listDetailVisible = useAtomValue(isListDetailVisibleAtom);

  return (
    <>
      <section className="flex flex-col">
        <MyListSearchBar />
        <Lists onSelectList={setSelectedList} />
      </section>
      <div className="">
        <NewList />
      </div>
      {listDetailVisible == true && (
        <div className="absolute right-0">
          <MyListDetail />
        </div>
      )}
    </>
  );
};

export default MyListScreen;
