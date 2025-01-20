import { atom } from "jotai";
import { supabase } from "@/lib/supabaseClient";
import { isUserLoggedInAtom } from "@/state/authAtoms";

export const changeEmailAtom = atom(null, async (get, set, email: string) => {
  const isLoggedIn = get(isUserLoggedInAtom);
  if (!isLoggedIn) {
    //console.log("User is not logged in.");
    return;
  }

  if (!email || !email.includes("@")) {
    //console.log("Invalid email address:", email);
    return;
  }

  try {
    const user = await supabase.auth.getUser();
    if (!user) {
      //console.log("No authenticated user.");
      return;
    }

    const { data, error } = await supabase.auth.updateUser({ email: email });

    if (error) {
      //console.log("Failed to update email:", error.message);
      return;
    }

    console.log("Email updated successfully:", data);
  } catch (e) {
    //console.log("Unexpected error:", e);
  }
});
