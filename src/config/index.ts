import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  server: {
    BACKEND_URI: z.string().min(1),
  },
  client: {
    /*can be left empty or add the client-side variables*/
    NEXT_PUBLIC_BACKEND_URI: z.string(),
  },
  runtimeEnv: {
    BACKEND_URI: process.env.BACKEND_URI,
    NEXT_PUBLIC_BACKEND_URI: process.env.NEXT_PUBLIC_BACKEND_URI,
    /*Note everything you have in your server must also come here otherwise you'll get error of missing*/
  },
});