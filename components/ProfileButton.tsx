"use client";

import {
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Image from "next/image";
const ProfileButton = () => {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) {
    return (
      <SignInButton
        mode="modal"
        fallbackRedirectUrl="/"
        signUpFallbackRedirectUrl="/create-trip"
      >
        <button className="bg-black text-white px-4 py-2 rounded">
          Sign In
        </button>
      </SignInButton>
    );
  }

  return (
    <div className=" flex justify-center items-center">
      <UserButton
        appearance={{
          elements: {
            avatarBox: "w-14 h-14"
          },
        }}
      />
    </div>
  );
};

export default ProfileButton;
