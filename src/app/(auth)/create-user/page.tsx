"use client";

import { useSearchParams } from "next/navigation";
import { useState} from "react";
import { toast } from "sonner"

export default function CreateAccountPage() {

  const router = useSearchParams();
  const token = router.get("token");

  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [password, setPassword] = useState("");

  const checkValid = () => {
    if (username === "" || firstname === "" || lastname === "" || password === "") {
      toast("Please fill all the fields")
      return false;
    } else {
      if(password.length < 8) {
        alert("Password must be at least 8 characters long");
        return false;
      }
      else{
        return true;
      }
    }
  }

  const handleSubmit = async () => {
    const isValid = checkValid();
    if(isValid) {
      try{
        const res = await fetch("http://localhost:4000/api/v1/auth/create-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username: username,
            firstName: firstname,
            lastName: lastname,
            password: password,
          }),
        });
        
        const data = await res.json();
        
        if (data.status === 200) {
          alert("Account created");
        } else {
          alert("Account not created");
        }
      } catch(err) {
        alert("Error creating account");
      }
    }
  }

  return (
    <div>
      <form action="" className="flex flex-col p-10">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          className="border border-3 border-solid border-gray-500"
        />
        <label htmlFor="firstname">Firstname</label>
        <input
          type="text"
          value={firstname}
          onChange={(e) => {
            setFirstname(e.target.value);
          }}
          className="border border-3 border-solid border-gray-500"
        />
        <label htmlFor="lastname">Lastname</label>
        <input
          type="text"
          value={lastname}
          onChange={(e) => {
            setlastname(e.target.value);
          }}
          className="border border-3 border-solid border-gray-500"
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="border border-3 border-solid border-gray-500"
        />
        <button onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>Submit</button>
      </form>
    </div>
  );
}
