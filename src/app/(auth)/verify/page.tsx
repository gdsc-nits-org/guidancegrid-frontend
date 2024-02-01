"use client";

import { FormEvent, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Verify() {
  const emailref = useRef<HTMLInputElement>(null);

  const sendVerificationMail = async (email: string) => {
    const res = await fetch("http://localhost:4000/api/v1/auth/verify-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });

    const data = await res.json();
    return data;
  };
  const handleSendVerification = async (e: FormEvent) => {
    e.preventDefault();
    /* Make API request to check if email already exists */

    /* Make API request to send verification mail */
    /* This regex matches only NIT Silchar email IDs */
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]*[\.]?nits\.ac\.in$/;
    const isValidMail = emailRegex.test(emailref.current?.value || "");
    if (isValidMail) {
      toast.promise(sendVerificationMail(emailref.current?.value || ""), {
        loading: "Sending Email...",
        success: (data: { msg: string; status: string }) => {
          return data.msg;
        },
        error: "Error sending email. Please try again later."
      });
    } else {
      toast.error("Please enter a valid NIT Silchar email address.");
    }
  };

  return (
    <div className="h-full flex justify-center items-center">
      <form className="w-11/12 md:w-3/6 lg:w-2/6">
        <div className="p-8 rounded-md border border-slate-800 grid gap-3">
          <Label htmlFor="email">Your Institute email address</Label>
          <Input type="email" placeholder="Email" ref={emailref} />
          <Button
            size="sm"
            variant="default"
            onClick={(e) => handleSendVerification(e)}
          >
            Send Verification Mail
          </Button>
        </div>
      </form>
    </div>
  );
}
