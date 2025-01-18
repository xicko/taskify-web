import React from "react";
import Screenshots from "@/components/Screenshots";
import Link from "next/link";
import { MdAndroid } from "react-icons/md";

const IsMobile = () => {
  return (
    <div className="flex flex-col gap-y-3 justify-center items-center pt-10">
      <span className="flex flex-row justify-center items-center px-4 text-center">
        Web version is only available on desktop.
      </span>
      <div className="w-[65vw] h-auto">
        <Screenshots classes={""} />
      </div>
      <div className="flex flex-col justify-center items-center gap-y-1">
        <span className="flex flex-row justify-center items-center">
          Available on Android
          <MdAndroid size={20} className="ml-2 text-green-600" />
        </span>
        <Link
          className="font-medium hover:font-bold hover:scale-110 transition-all ease-in-out duration-500"
          href={"https://dl.dashnyam.com/taskify.apk"}
          target="_blank"
        >
          Get the app.
        </Link>
      </div>
    </div>
  );
};

export default IsMobile;
