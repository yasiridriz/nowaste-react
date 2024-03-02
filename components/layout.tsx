import Link from "next/link";
import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <div className="fixed top-0 my-2 flex justify-center items-center gap-3 w-full font-bold">
        <Link href={"/"}>No waste</Link>
        <Link href={"/dashboard"}>Dashboard</Link>
        <Link href={"/about"}>Who are we?</Link>
      </div>
      <main className="px-[15vw] pt-20">{children}</main>
    </div>
  );
};

export default Layout;
