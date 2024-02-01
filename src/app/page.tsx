"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
export default function Home() {
  return (
    <div className="prose">
      <Button
        onClick={() => {
          toast("Hello world!");
        }}
      >
        Click me
      </Button>
      <h1>GUIDANCE GRID FRONTEND</h1>
    </div>
  );
}
