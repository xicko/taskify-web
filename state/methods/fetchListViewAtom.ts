// Main method to fetch for listview
import { atom } from "jotai";
import { supabase } from "@/lib/supabaseClient"; // Import supabase client
import { listViewAtom } from "@/state/listAtoms"; // Import state atoms

export const fetchListViewAtom = atom(null, async (get, set, id: string) => {
  const { data } = await supabase
    .from("todo_lists")
    .select()
    .eq("id", id)
    .single();
  set(listViewAtom, data);
});
