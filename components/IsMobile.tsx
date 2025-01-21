import React, { useEffect } from "react";
import Screenshots from "@/components/Screenshots";
import Link from "next/link";
import { MdAndroid } from "react-icons/md";
import { useAtomValue, useSetAtom } from "jotai";
import { fetchListViewAtom } from "@/state/methods/fetchListViewAtom";
import { listViewAtom } from "@/state/listAtoms";
import Image from "next/image";

const IsMobile = () => {
  const list = useAtomValue(listViewAtom);

  // Query params
  const fetchListView = useSetAtom(fetchListViewAtom);
  const searchParams = new URLSearchParams(window.location.search);
  const idParam = searchParams.get("id");
  useEffect(() => {
    // Read the query parameters
    if (idParam) {
      fetchListView(idParam);
    }
  }, [fetchListView]);

  if (idParam)
    return (
      <div className="absolute bg-zinc-100 p-8 rounded-xl w-[100dvw] h-[100dvh]">
        <div className="h-full flex flex-col justify-between selection:bg-[#8fd2ff] selection:text-black custom-scrollbar">
          <div>
            <div className="flex flex-row justify-start  gap-x-2">
              <div className="w-[60px] h-[60px]">
                <Image
                  src={"/logo1500white.png"}
                  alt={"Logo"}
                  height={4000}
                  width={4000}
                  draggable={false}
                />
              </div>
              <h1 className="mb-4 self-start text-zinc-900 dark:text-white select-none text-6xl transition-all animate-fontWeightPulse2">
                Taskify
              </h1>
            </div>
            <div className="flex flex-col justify-start -mx-3 px-6 py-4 bg-white shadow-md rounded-xl">
              <h2 className="text-xl font-semibold mb-1">
                {list?.title ?? "List is private or doesn't exist."}
              </h2>
              <div className="whitespace-pre-line">{list?.content ?? ""}</div>
            </div>
          </div>

          <div className="flex flex-col mt-2">
            {list?.is_public ? (
              <span className="text-sm text-zinc-700">
                Shared by: {list.email.split("@")[0]}
              </span>
            ) : (
              <span className="text-sm text-zinc-700">
                {list?.is_public ? "Public" : "Private"}
              </span>
            )}
            <span className="text-sm text-zinc-700">
              Updated on:{" "}
              {new Date(list?.updated_at ?? "").toLocaleDateString("en-US")}
            </span>
            <span className="text-sm text-zinc-700">
              Created on:{" "}
              {new Date(list?.created_at ?? "").toLocaleDateString("en-US")}
            </span>
          </div>
        </div>
      </div>
    );

  return (
    <div className="relative flex flex-col gap-y-3 justify-center items-center">
      <h1 className="self-center text-black dark:text-white select-none text-6xl transition-all animate-fontWeightPulse">
        Taskify
      </h1>
      <div className="flex flex-col justify-center items-center gap-y-1">
        <span className="flex flex-row justify-center items-center">
          Available on Android
          <MdAndroid size={20} className="ml-2 text-green-500" />
        </span>
        <Link
          className="font-medium hover:font-bold hover:scale-110 transition-all ease-in-out duration-500"
          href={"https://dl.dashnyam.com/taskify.apk"}
          target="_blank"
        >
          Get the app.
        </Link>
      </div>
      <div className="w-[50vw] h-fit">
        <Screenshots classes={""} />
      </div>
      <p className="flex flex-row justify-center w-[60vw] items-center px-4 text-center">
        Web version is only available on desktop.
      </p>
    </div>
  );
};

export default IsMobile;
