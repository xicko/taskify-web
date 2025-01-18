import { atom } from "jotai";

// Atom to track user's authentication state
export const isUserLoggedInAtom = atom(false);

// Atom to store the user's email
export const userEmailAtom = atom<string | null>(null);

// Atom to store the user's id
export const userIdAtom = atom<string | null>(null);
