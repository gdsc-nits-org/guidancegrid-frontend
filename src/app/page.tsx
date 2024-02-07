"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const { push } = useRouter();
  return (
    <div className="prose h-full flex flex-col md:flex-row justify-center items-center ">
      <h1>GUIDANCE GRID FRONTEND</h1>
    <Link href={"/verify"} className="p-2 border border-black rounded m-3 hover:bg-black hover:text-white">Sign up</Link>
    <Link href={"/login"} className="p-2 border border-black rounded m-3 hover:bg-black hover:text-white">Log in</Link>
    </div>
  );
}
