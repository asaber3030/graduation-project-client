import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

const env = createEnv({
  server: {
    DATABASE_HOST: z.string().url(),
    DATABASE_LOCALHOST: z.string().url(),
    ADMIN_SECRET: z.string(),
    PATIENT_SECRET: z.string(),
    DOCTOR_SECRET: z.string(),
    API_URL: z.string().url(),
  },
  client: {
    PUBLIC_API_URL: z.string().url(),
  },
  clientPrefix: "PUBLIC_",
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
})

export default env
