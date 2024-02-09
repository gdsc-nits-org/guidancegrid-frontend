"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const { push } = useRouter();
  return (
    <div className="prose h-full flex flex-col md:flex-row justify-center items-center gap-x-2">
      <h1>GUIDANCE GRID FRONTEND</h1>
      <Link href={"/verify"}>
        <Button>Sign Up</Button>
      </Link>
      <Link href={"/login"}>
        <Button>Login</Button>
      </Link>
    </div>
  );
}
