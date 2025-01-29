import { atom } from "jotai";
import { supabase } from "@/lib/supabaseClient";

// Method to fetch user profile pictures in public list, retrieves based on userid string
export const fetchUsersPfpAtom = atom(
  null,
  async (_get, _set, userId: string) => {
    try {
      const { data } = await supabase
        .from("profile_pictures")
        .select("base64")
        .eq("user_id", userId)
        .limit(1)
        .single();

      if (data) {
        return `data:image/jpeg;base64,${data?.base64}`;
      } else {
        return "/avatar.webp";
      }
    } catch (e) {
      console.log(e);
    }
  }
);
