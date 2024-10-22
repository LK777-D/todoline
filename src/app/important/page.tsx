"use client";
import Navbar from "@/components/Nav/Navbar";
import SideNav from "@/components/Nav/SideNav";
import AddTodo from "@/components/Nav/Todos/AddTodo";
import ImportantTodos from "@/components/ImportantTodos";

export default function Home() {
  return (
    <main className="bg-[#F6F6F7] flex    ">
      <SideNav />
      <div>
        <Navbar />
        <div>
          <AddTodo />
          <ImportantTodos />
        </div>
      </div>
    </main>
  );
}
