import { atom } from "jotai";
import React from "react";
import { isUserLoggedInAtom, userEmailAtom } from "@/state/authAtoms";
import { supabase } from "@/lib/supabaseClient";

export const updatePasswordAtom = atom(
  null,
  async (get, set, currentPassword: string, newPassword: string) => {
    const userEmail = get(userEmailAtom);
    const isLoggedIn = get(isUserLoggedInAtom);
    if (!isLoggedIn) {
      //console.log("User is not logged in.");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userEmail ?? "",
        password: currentPassword,
      });

      if (data?.session != null) {
        const { data, error } = await supabase.auth.updateUser({
          password: newPassword,
        });
      }
    } catch (e) {
      console.log(`update password error: ${e}`);
    }
  }
);
