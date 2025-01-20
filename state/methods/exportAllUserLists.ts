import { atom } from "jotai";
import { supabase } from "@/lib/supabaseClient";
import { isUserLoggedInAtom } from "@/state/authAtoms";
import { accountSettingsMessageAtom } from "@/state/baseAtoms";
import { toast } from "sonner";

export const exportAllUserListsAtom = atom(null, async (get, set) => {
  const { data } = await supabase.auth.getSession();
  const userId = data.session?.user.id;

  const isLoggedIn = get(isUserLoggedInAtom);
  if (!isLoggedIn) {
    // console.log("User is not logged in.");
    return;
  }

  try {
    const user = await supabase.auth.getUser();
    if (!user) {
      return;
    }

    const { data, error } = await supabase
      .from("todo_lists")
      .select("title, content, is_public, created_at, updated_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    const jsonData = JSON.stringify(data, null, 2);

    // Create a blob to save json file
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    // Only save if jsondata contains over 3 characters
    if (jsonData.length > 3) {
      const a = document.createElement("a");
      a.href = url;
      a.download = "user_lists.json";
      a.click();
      toast("All lists have been saved locally in JSON format.");
    } else {
      toast("No lists to export.");
    }

    URL.revokeObjectURL(url);

    if (error) {
      return;
    }
  } catch (e) {
    // console.log("Unexpected error:", e);
  }
});
