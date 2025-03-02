import { atom } from "jotai";

export const isEditModeAtom = atom<boolean>(false);

export const isDiscardEditVisibleAtom = atom<boolean>(false);

export const editListIdAtom = atom<string>("");

export const editListTitleAtom = atom<string>("");

export const editListContentAtom = atom<string>("");

export const editListIsPublicAtom = atom<boolean>(false);
