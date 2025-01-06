import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

import { db } from './db'
import {
  userTable,
  sessionTable,
  accountTable,
  verificationTable,
} from '@/lib/schemas'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user: userTable,
      session: sessionTable,
      account: accountTable,
      verification: verificationTable,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
})
