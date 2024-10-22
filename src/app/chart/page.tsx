"use client";
import Navbar from "@/components/Nav/Navbar";
import SideNav from "@/components/Nav/SideNav";

import Charts from "@/components/Charts";

export default function Chart() {
  return (
    <main className="bg-[#F6F6F7] flex">
      <SideNav />
      <div>
        <Navbar />
        <div>
          <Charts />
        </div>
      </div>
    </main>
  );
}
