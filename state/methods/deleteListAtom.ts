// Main method to delete a list
import { atom } from "jotai";
import { supabase } from "@/lib/supabaseClient"; // Import supabase client
import {
  listsAtom,
  loadingAtom,
  errorAtom,
  listPublicDetailAtom,
} from "@/state/listAtoms"; // Import state atoms
import { isUserLoggedInAtom } from "@/state/authAtoms";
import { listDetailAtom } from "@/state/listAtoms";

export const deleteListAtom = atom(null, async (get, set, listId: string) => {
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
      .eq("user_id", userId)
      .eq("id", listId);

    if (error) {
      set(errorAtom, `Error deleting list: ${error.message}`);
    } else {
      // Update the lists state by filtering out the deleted list
      const currentLists = get(listsAtom);
      const updatedLists = currentLists.filter((list) => list.id !== listId);
      set(listsAtom, updatedLists); // Update listsAtom state
      set(errorAtom, null); // Clear any previous errors

      // If this list was selected, reset listDetailAtom
      const selectedList = get(listDetailAtom);
      if (selectedList?.id === listId) {
        set(listDetailAtom, null); // Clear the selected list if it's the one being deleted
        set(listPublicDetailAtom, null);
      }
    }
  } catch (e) {
    set(errorAtom, `Error deleting list: ${e}`);
  } finally {
    set(loadingAtom, false); // Stop loading
  }
});
