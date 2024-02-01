"use client";

import { useState } from "react";

export default function Verify() {
  const [email, setEmail] = useState("");

  const submitMail = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isMail = emailRegex.test(email);

    if(isMail) {
        // if(email.endsWith("nits.ac.in")) {
            handleSubmitMail();
        // } else {
        //     alert("Please use your college email")
        // }
    } else {
        alert("Please enter a valid email")
    }
  }

  const handleSubmitMail = async () => {

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

    alert(data.token);
  };

  return (
    <form action="">
      <label htmlFor="email">email</label>
      <input
        type="text"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        className="border border-3 border-solid border-black"
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          submitMail();
        }}
      >
        Submit
      </button>
    </form>
  );
}
