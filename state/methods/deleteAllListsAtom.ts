// Main method to delete a list
import { atom } from "jotai";
import { supabase } from "@/lib/supabaseClient"; // Import supabase client
import { loadingAtom, errorAtom } from "@/state/listAtoms"; // Import state atoms
import { isUserLoggedInAtom } from "@/state/authAtoms";

export const deleteAllListsAtom = atom(null, async (get, set) => {
  const isLoggedIn = get(isUserLoggedInAtom);
  if (!isLoggedIn) {
    set(errorAtom, "User not authenticated");
    return;
  }

  set(loadingAtom, true);

  try {
    const { data, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !data.session?.user) {
      set(errorAtom, "Unable to get user session");
      set(loadingAtom, false);
      return;
    }

    const userId = data.session?.user.id;

    // Delete the list from the 'todo_lists' table
    const { error } = await supabase
      .from("todo_lists")
      .delete()
      .eq("user_id", userId);
  } catch (e) {
    set(errorAtom, `Error deleting list: ${e}`);
  } finally {
    set(loadingAtom, false); // Stop loading
  }
});
