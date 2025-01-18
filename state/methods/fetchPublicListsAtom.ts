// Method to fetch public lists
import { atom } from "jotai";
import { supabase } from "@/lib/supabaseClient"; // Import supabase client
import { listsPublicAtom, loadingAtom } from "@/state/listAtoms"; // Import state atoms

export const fetchPublicListsAtom = atom(null, async (_get, set) => {
  set(loadingAtom, true); // Start loading

  try {
    const { data: listsData, error } = await supabase
      .from("todo_lists")
      .select()
      .eq("is_public", true)
      .order("updated_at", { ascending: false });

    if (error) {
    } else {
      set(listsPublicAtom, listsData);
    }
  } catch (e) {
  } finally {
    set(loadingAtom, false); // Stop loading
  }
});
