// Shows either login or signup if user isnt authenticated
"use client";

import { Button, Input } from "@headlessui/react";
import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useSetAtom } from "jotai";
import { isUserLoggedInAtom, userEmailAtom } from "@/state/authAtoms";
import Screenshots from "../Screenshots";
import Link from "next/link";
import { MdAndroid } from "react-icons/md";
import { toast } from "sonner";

const NoAuth = () => {
  // Controls login and signup screen index
  const [authIndex, setAuthIndex] = useState(0);

  // State to store these values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Function to update the `isUserLoggedIn, and userEmail` atom (used to track user authentication status, and store user email).
  const setIsUserLoggedIn = useSetAtom(isUserLoggedInAtom);
  const setUserEmail = useSetAtom(userEmailAtom);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { error: loginError, data: session } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (loginError) {
      setError(loginError.message);
    } else {
      setIsUserLoggedIn(true);
      setUserEmail(session.user?.email ?? null);
      toast("Logged in");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password != confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const { error: signupError, data: session } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signupError) {
      setError(signupError.message);
    } else {
      setIsUserLoggedIn(true);
      setUserEmail(session.user?.email ?? null);
      toast("Account created.");
    }
  };

  return (
    <>
      <div className="bg-3 w-[58vw] h-[75vh] flex justify-center items-center">
        <div className="flex flex-row-reverse gap-x-[140px] items-center">
          <Screenshots classes="md:w-[14vw] w-[80%] h-auto" />

          {authIndex === 0 && (
            <div className="space-y-8 w-[17vw] px-[2vw] py-[2vw] bg-white shadow-[0_5px_60px_-15px_rgba(0,0,0,0.2)] rounded-[32px] text-center">
              <span className="font-semibold select-none">
                Please log in to create new list
              </span>
              <form className="flex flex-col" onSubmit={handleLogin}>
                <Input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-1 outline-none border-b-2 border-gray-200 focus:border-gray-600 transition-all mb-2"
                  placeholder="Email"
                />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-1 outline-none border-b-2 border-gray-200 focus:border-gray-600 transition-all mb-4"
                  placeholder="Password"
                />

                {error && <p className="text-red-700 text-sm mb-2">{error}</p>}

                <span className="text-sm text-zinc-700 mb-1 select-none">
                  Don&apos;t have an account?
                </span>

                <button
                  onClick={() => {
                    setAuthIndex(1);
                  }}
                  className="text-sm text-black font-semibold mb-4"
                >
                  Sign up here
                </button>

                <Button
                  type="submit"
                  className="rounded-lg bg-[#8fd2ff] py-2 px-4 text-sm text-black font-semibold shadow-xl"
                >
                  Log in
                </Button>
              </form>

              <div className="flex flex-col gap-y-1">
                <span className="flex flex-row justify-center items-center">
                  Available on Android
                  <MdAndroid size={20} className="ml-2 text-green-600" />
                </span>
                <Link
                  className="font-medium hover:font-bold hover:scale-110 transition-all ease-in-out duration-500 text-[#23455c]"
                  href={"https://dl.dashnyam.com/taskify.apk"}
                  target="_blank"
                >
                  Get the app.
                </Link>
              </div>
            </div>
          )}

          {authIndex === 1 && (
            <div className="space-y-8 w-[17vw] px-[2vw] py-[2vw] bg-white shadow-[0_5px_60px_-15px_rgba(0,0,0,0.2)] rounded-[32px] text-center">
              <span className="font-semibold select-none">
                Please sign up to create new list
              </span>
              <form className="flex flex-col" onSubmit={handleSignup}>
                <Input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-1 outline-none border-b-2 border-gray-200 focus:border-gray-600 transition-all mb-2"
                  placeholder="Email"
                />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-1 outline-none border-b-2 border-gray-200 focus:border-gray-600 transition-all mb-2"
                  placeholder="Password"
                />
                <Input
                  id="confirmpassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full py-1 outline-none border-b-2 border-gray-200 focus:border-gray-600 transition-all mb-4"
                  placeholder="Confirm password"
                />

                {error && <p className="text-red-700 text-sm mb-2">{error}</p>}

                <span className="text-sm text-zinc-700 mb-1 select-none">
                  Already have an account?
                </span>

                <button
                  onClick={() => {
                    setAuthIndex(0);
                  }}
                  className="text-sm text-black font-semibold mb-4"
                >
                  Log in here
                </button>

                <Button
                  type="submit"
                  className="rounded-lg bg-[#8fd2ff] py-2 px-4 text-sm text-black font-semibold shadow-xl"
                >
                  Create an account
                </Button>
              </form>

              <div className="flex flex-col gap-y-1">
                <span className="flex flex-row justify-center items-center">
                  Available on Android
                  <MdAndroid size={20} className="ml-2 text-green-600" />
                </span>
                <Link
                  className="font-medium hover:font-bold hover:scale-110 transition-all ease-in-out duration-500 text-[#23455c]"
                  href={"https://dl.dashnyam.com/taskify.apk"}
                  target="_blank"
                >
                  Get the app.
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NoAuth;
