// Main method to fetch
import { atom } from "jotai";
import { supabase } from "@/lib/supabaseClient"; // Import supabase client
import { listsAtom, loadingAtom, errorAtom } from "@/state/listAtoms"; // Import state atoms
import { isUserLoggedInAtom } from "@/state/authAtoms";

export const fetchListsAtom = atom(null, async (get, set) => {
  const isLoggedIn = get(isUserLoggedInAtom);
  if (!isLoggedIn) {
    set(errorAtom, "User not authenticated");
    return;
  }

  set(loadingAtom, true); // Start loading

  try {
    const { data, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !data.session?.user) {
      set(errorAtom, "Unable to get user session");
      set(loadingAtom, false);
      return;
    }

    const userId = data.session?.user.id;
    const { data: listsData, error } = await supabase
      .from("todo_lists")
      .select()
      .eq("user_id", userId)
      .order("updated_at", { ascending: false });

    if (error) {
      set(errorAtom, `Error fetching lists: ${error.message}`);
    } else {
      set(listsAtom, listsData); // Set the fetched lists
      set(errorAtom, null); // Clear any previous errors
    }
  } catch (e) {
    set(errorAtom, `Error fetching lists: ${e}`);
  } finally {
    set(loadingAtom, false); // Stop loading
  }
});
