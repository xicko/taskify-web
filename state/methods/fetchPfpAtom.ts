import { atom } from "jotai";
import { supabase } from "@/lib/supabaseClient"; // Import supabase clien
import {
  hasProfilePicAtom,
  userIdAtom,
  userPfpAtom,
  listPfpAtom,
} from "@/state/authAtoms";

// Method to fetch individual profile pictures, fetches current user's pfp by default, use id prop for custom fetch
export const fetchPfpAtom = atom(null, async (get, set, id?: string) => {
  const userId = get(userIdAtom);

  try {
    const { data } = await supabase
      .from("profile_pictures")
      .select("base64")
      .eq("user_id", id ?? userId)
      .limit(1)
      .single();

    set(hasProfilePicAtom, true);
    if (id) {
      // If id prop is given set the listPfp
      set(
        listPfpAtom,
        data?.base64 ? `data:image/jpeg;base64,${data.base64}` : "/avatar.webp"
      );
    } else {
      // Set current user's pfp
      set(userPfpAtom, data?.base64 ?? "");
    }
  } catch (e) {
    console.log(e);
  }
});
