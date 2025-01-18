import { atom } from "jotai";

// Loading and error atoms for lists, shared between both user list and public list
export const loadingAtom = atom<boolean>(false); // This atom holds the loading state
export const errorAtom = atom<string | null>(null); // This atom holds any error message

// User's Lists
export const listDetailAtom = atom<null | {
  is_public: boolean;
  id: string;
  title: string;
  content: string;
  updated_at: string;
  created_at: string;
}>(null); // This atom holds the fetched lists detail for displaying

export const listsAtom = atom<any[]>([]); // This atom holds the fetched lists

// Public Lists
export const listPublicDetailAtom = atom<null | {
  title: string;
  content: string;
  updated_at: string;
  created_at: string;
}>(null);

export const listsPublicAtom = atom<any[]>([]);
