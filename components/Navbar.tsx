import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full mx-auto  border-b border-b-neutral-400 bg-neutral-100 text-neutral-900 p-2">
     <Link href={"/"}>
      <Image
        src={"/logoipsum-custom-logo.svg"}
        width={0}
        height={0}
        className=" w-40 h-fit"
        alt="logo ai image"
      />
     </Link>
    </nav>
  );
};

export default Navbar;
