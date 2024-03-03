import { useState, useEffect, use } from "react";
import Link from "next/link";
import { PropsWithChildren } from "react";
import axios from "axios";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Layout = ({ children }: PropsWithChildren) => {
  

  return (
    <div>
      <main className="mx-auto pt-20 px-3 max-h-[100dvh] overflow-y-hidden flex justify-center items-center max-w-xl">
        {children}
      </main>
    </div>
  );
};

export default Layout;
