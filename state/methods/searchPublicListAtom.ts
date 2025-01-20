// Method to fetch search lists
import { atom } from "jotai";
import { supabase } from "@/lib/supabaseClient"; // Import supabase client
import { listsPublicAtom, loadingAtom } from "@/state/listAtoms";
import { toast } from "sonner";

export const searchPublicListAtom = atom(
  null,
  async (_get, set, query: string) => {
    set(loadingAtom, true);

    try {
      const { data: listsData, error } = await supabase
        .from("todo_lists")
        .select()
        .eq("is_public", true)
        .ilike("title", `%${query}%`)
        .order("updated_at", { ascending: false });

      if (error) {
        toast("Error searching.");
      } else {
        set(listsPublicAtom, listsData);
      }
    } catch (e) {
    } finally {
      set(loadingAtom, false);
    }
  }
);
