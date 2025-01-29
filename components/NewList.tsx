import { Field, Input, Label, Switch } from "@headlessui/react";
import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { userEmailAtom, userIdAtom } from "@/state/authAtoms";
import { useAtomValue, useSetAtom } from "jotai";
import { fetchListsAtom } from "@/state/methods/fetchListsAtom";
import { toast } from "sonner";

const NewList = () => {
  // List
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(false);

  // Feedback texts (Success / Error)
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const messageToDisplay = errorMessage || successMessage || "\u00A0"; // Error takes priority over success
  const messageStyle = errorMessage ? "text-red-700" : "text-green-800";

  // User info
  const userId = useAtomValue(userIdAtom);
  const userEmail = useAtomValue(userEmailAtom);

  // Refresh
  const setFetchLists = useSetAtom(fetchListsAtom);
  const handleRefresh = () => {
    setFetchLists(); // Trigger the fetchLists action when the button is clicked
  };

  const createList = async (
    title: string,
    content: string,
    isPublic: boolean
  ) => {
    try {
      if (userId === null) {
        throw new Error("User not logged in");
      }

      const { error } = await supabase
        .from("todo_lists")
        .insert({
          user_id: userId,
          title: title,
          content: content,
          is_public: isPublic,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          email: userEmail,
        })
        .select();

      if (error) throw error;

      setSuccessMessage("List created successfully!");
      setTitle("");
      setContent("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Check if title or content is empty
    if (title.trim() === "" || content.trim() === "") {
      setErrorMessage("List cannot be empty");
      toast("List cannot be empty.");
      setLoading(false);
      return;
    }

    createList(title, content, isPublic);
    toast("List created.");

    // Refresh after creation
    setTimeout(() => {
      handleRefresh();
    }, 1000);
  };

  return (
    <div className="bg-white w-[36vw] h-[75vh] flex flex-col justify-between px-11 py-9 selection:bg-[#8fd2ff] selection:text-black rounded-2xl overflow-y-auto custom-scrollbar">
      <div className="flex flex-col gap-y-4 ">
        <Input
          value={title}
          required
          maxLength={100}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="bg-transparent h-fit text-xl font-medium placeholder-gray-500 border-slate-200 border-b-[1px] focus:border-slate-400 focus:border-b-[2px] resize-none outline-none transition-all"
        />
      </div>

      <textarea
        value={content}
        required
        maxLength={5000}
        onChange={(e) => setContent(e.target.value)}
        placeholder="To-do list"
        className="bg-transparent h-full my-4 text-md placeholder-gray-500 border-slate-200 border-b-[1px] focus:border-slate-400 focus:border-b-[2px] resize-none outline-none transition-all"
      />

      <div
        className={`flex justify-center transition-all -mb-6 ${
          messageToDisplay ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className={messageStyle}>{messageToDisplay}</p>
      </div>

      <div className="flex flex-col gap-y-4">
        <Field
          className={"relative flex flex-row justify-between items-center"}
        >
          <div className="flex flex-row items-center gap-x-3">
            <Switch
              checked={isPublic}
              onChange={setIsPublic}
              className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-400 transition data-[checked]:bg-[#296085]"
            >
              <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
            </Switch>
            <Label passive>{isPublic ? "Public" : "Private"}</Label>
          </div>

          <span>{`${content.length}/5000`}</span>
        </Field>
        <button
          onClick={handleSubmit}
          className={`w-full flex flex-row items-center justify-center px-4 py-2 rounded-md text-black font-medium ${
            loading
              ? "bg-gray-400"
              : "bg-[#8fd2ff] hover:bg-[#7abce8] transition-all"
          }`}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create List"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NewList;
