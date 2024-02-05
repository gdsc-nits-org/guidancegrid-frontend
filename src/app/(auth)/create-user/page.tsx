"use client";

import { useSearchParams } from "next/navigation";
import { toast } from "sonner"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { env } from "@/config";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  username: z.string().min(2,{
    message: "Username must be at least 2 characters long",
  }).max(20,{
    message: "Username must be at most 20 characters long",
  }),
  firstName: z.string().min(1,{
    message: "Firstname must be at least 1 character long",
  }),
  lastName: z.string(),
  password: z.string().min(8,{
    message: "Password must be at least 8 characters long",
  })
});

export default function CreateAccountPage() {

  const router = useSearchParams();
  const token = router.get("token");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      password: "",
    }
  });

  const onSubmit = async (values:z.infer<typeof formSchema>) => {
      const { username, firstName, lastName, password } = values;
      try{
        const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_URI}/auth/create-user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username,
            firstName,
            lastName,
            password,
          }),
        });
        
        const data = await res.json();
        
        if (data.status === 200) {
          toast.success("Account created");
        } else {
          toast.error("Account not created");
        }
      } catch(err) {
        toast.error("Error creating account");
      }
    }
  

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mx-auto w-5/6 p-3 m-3 border">
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder="username" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>First Name</FormLabel>
            <FormControl>
              <Input placeholder="firstName" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="lastName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Last Name</FormLabel>
            <FormControl>
              <Input placeholder="lastName" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" placeholder="password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  </Form>
  );
}
