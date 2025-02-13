import React, { useEffect } from "react";
import Screenshots from "@/components/Screenshots";
import Link from "next/link";
import { MdAndroid } from "react-icons/md";
import { useAtomValue, useSetAtom } from "jotai";
import { fetchListViewAtom } from "@/state/methods/fetchListViewAtom";
import { listViewAtom } from "@/state/listAtoms";
import Image from "next/image";
import { fetchPfpAtom } from "@/state/methods/fetchPfpAtom";
import { listPfpAtom } from "@/state/authAtoms";
import RichTextRenderer from "./RichTextRenderer";

const IsMobile = () => {
  const list = useAtomValue(listViewAtom);

  // Profile picture
  const fetchPfp = useSetAtom(fetchPfpAtom);
  const listPfp = useAtomValue(listPfpAtom);
  useEffect(() => {
    // Fetch profile picture with given user_id
    fetchPfp(list?.user_id ?? "");
  });

  // Query params
  const fetchListView = useSetAtom(fetchListViewAtom);
  const searchParams = new URLSearchParams(window.location.search);
  const listParam = searchParams.get("list");
  useEffect(() => {
    // Read the query parameters
    if (listParam) {
      fetchListView(listParam);
    }
  }, [listParam, fetchListView]);

  if (listParam)
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

              <div className="whitespace-pre-line max-h-[60dvh] overflow-y-auto">
                <RichTextRenderer
                  deltaJson={list?.content ?? ""}
                  styles="whitespace-pre-line max-h-[60dvh] overflow-y-auto text-black"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-2">
            <div className="flex flex-row justify-start items-center font-medium gap-x-2 mb-2 select-none">
              <Image
                src={listPfp ?? "/avatar.webp"}
                alt={`${list?.email.split("@")[0]}`}
                className="rounded-sm"
                draggable={false}
                width={30}
                height={30}
              />

              {list?.is_public ? (
                <p className="text-md text-zinc-800">
                  {list?.email.split("@")[0]}
                </p>
              ) : (
                <p className="text-md text-zinc-800">
                  {list?.is_public ? "Public" : "Private"}
                </p>
              )}
            </div>
            <span className="text-sm text-zinc-700">
              Updated on:{" "}
              {new Date(list?.updated_at ?? "").toLocaleString("en-US")}
            </span>
            <span className="text-sm text-zinc-700">
              Created on:{" "}
              {new Date(list?.created_at ?? "").toLocaleString("en-US")}
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
