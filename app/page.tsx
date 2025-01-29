"use client";

import { isMobile } from "react-device-detect";
import IsMobile from "@/components/IsMobile";

import Discover from "@/components/tabs/Discover";
import Me from "@/components/tabs/Me";
import MyLists from "@/components/tabs/MyLists";
import { NavBar } from "@/components/NavBar";
import React from "react";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useSetAtom } from "jotai";
import {
  hasProfilePicAtom,
  isUserLoggedInAtom,
  userEmailAtom,
  userIdAtom,
  userPfpAtom,
} from "@/state/authAtoms";
import { fadeKeyAtom, isFadingAtom, navIndexAtom } from "@/state/baseAtoms";
import Background from "@/components/Background";
import SplashScreen from "@/components/SplashScreen";
import { Toaster } from "@/components/ui/sonner";
import ViewList from "@/components/tabs/ViewList";
import { fetchListViewAtom } from "@/state/methods/fetchListViewAtom";
import { fetchPfpAtom } from "@/state/methods/fetchPfpAtom";

// Tabs
const tabs = [<MyLists key="0" />, <Discover key="1" />, <Me key="2" />];

export default function Home() {
  const navIndex = useAtomValue(navIndexAtom);
  const fadeKey = useAtomValue(fadeKeyAtom); // Tracks the active tab
  const isFading = useAtomValue(isFadingAtom); // Animation control

  const setIsUserLoggedIn = useSetAtom(isUserLoggedInAtom);
  const setUserEmail = useSetAtom(userEmailAtom);
  const setUserId = useSetAtom(userIdAtom);
  const setUserPfp = useSetAtom(userPfpAtom);
  const setHasProfilePic = useSetAtom(hasProfilePicAtom);

  const fetchPfp = useSetAtom(fetchPfpAtom);

  // Auth init
  useEffect(() => {
    // Check initial session state
    const setInitialSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        setIsUserLoggedIn(true);
        setUserEmail(data.session?.user?.email ?? null);
        setUserId(data.session?.user?.id ?? null);
        fetchPfp();
        setHasProfilePic(true);
      } else {
        setIsUserLoggedIn(false);
        setUserEmail(null);
        setUserId(null);
        setUserPfp("");
        setHasProfilePic(false);
      }
    };

    setInitialSession();

    // Listen to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          setIsUserLoggedIn(true);
          setUserEmail(session.user.email ?? null);
          setUserId(session.user.id ?? null);
          fetchPfp();
          setHasProfilePic(true);
        } else if (event === "SIGNED_OUT") {
          setIsUserLoggedIn(false);
          setUserEmail(null);
          setUserId(null);
          setUserPfp("");
          setHasProfilePic(false);
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [
    setIsUserLoggedIn,
    setUserEmail,
    setUserId,
    fetchPfp,
    setUserPfp,
    setHasProfilePic,
  ]);

  // Query params
  const setNavIndex = useSetAtom(navIndexAtom);
  const fetchListView = useSetAtom(fetchListViewAtom);
  useEffect(() => {
    // Read the query parameters
    const searchParams = new URLSearchParams(window.location.search);
    const listParam = searchParams.get("list");

    if (listParam) {
      setNavIndex(3);
      fetchListView(listParam);
    }
  }, [setNavIndex, fetchListView]);

  // If mobile
  if (isMobile) {
    return (
      <div className="flex justify-center items-center bg-white dark:bg-zinc-900 dark:text-white w-screen h-[100dvh]">
        <IsMobile />
      </div>
    );
  } else {
    // If desktop
    return (
      <>
        <SplashScreen duration={200} />
        <main className="h-[100dvh] flex items-center justify-center">
          <div className="absolute -z-50 top-0 bottom-0 left-0 right-0">
            <Background />
          </div>

          <div className="relative min-w-[75vw] min-h-[85vh] flex flex-row rounded-[40px] shadow-2xl overflow-hidden">
            <NavBar />

            {/* Main */}
            <section className="bg-[#8fd2ff] bg-opacity-60 ">
              <div
                className={`transition-opacity duration-500 ease-in-out ${
                  isFading ? "opacity-0" : "opacity-100"
                }`}
              >
                {navIndex < 3 && tabs[fadeKey]}
                {navIndex === 3 && <ViewList />}
              </div>
            </section>
          </div>
        </main>
        <Toaster />
      </>
    );
  }
}
