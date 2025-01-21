import React, { useEffect, useState } from "react";
import MyListSearchBar from "@/components/discover/DiscoverListSearchBar";
import Lists from "@/components/discover/Lists";
import DiscoverListDetail from "@/components/discover/DiscoverListDetail";
import { useAtomValue } from "jotai";
import { listsPublicAtom } from "@/state/listAtoms";

interface SelectedListDetail {
  id: string;
  title: string;
  content: string;
  updated_at: string;
  created_at: string;
  email: string;
}

const DiscoverListScreen = () => {
  const listsPublic = useAtomValue(listsPublicAtom);
  const [selectedList, setSelectedList] = useState<SelectedListDetail | null>(
    null
  );

  useEffect(() => {
    if (!selectedList && listsPublic.length > 0) {
      setSelectedList(listsPublic[0]);
    }
  }, [listsPublic, selectedList]);

  return (
    <>
      <section className="flex flex-col">
        <MyListSearchBar />
        <Lists onSelectList={setSelectedList} />
      </section>
      {selectedList ? <DiscoverListDetail list={selectedList} /> : <></>}
    </>
  );
};

export default DiscoverListScreen;
