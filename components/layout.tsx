import { useState, useEffect, use } from "react";
import Link from "next/link";
import { PropsWithChildren } from "react";
import axios from "axios";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Layout = ({ children }: PropsWithChildren) => {
  

  return (
    <div>
      <main className="mx-auto px-[15%] flex justify-center items-center">
        {children}
      </main>
    </div>
  );
};

export default Layout;
