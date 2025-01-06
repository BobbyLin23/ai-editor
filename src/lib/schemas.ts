import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const userTable = pgTable('user', {
  id: text().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  emailVerified: boolean(),
  image: text(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
})

export const sessionTable = pgTable('session', {
  id: text().primaryKey(),
  userId: text()
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
  token: text().notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  ipAddress: text(),
  userAgent: text(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
})

export const accountTable = pgTable('account', {
  id: text().primaryKey(),
  userId: text()
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
  accountId: text().notNull(),
  providerId: text().notNull(),
  accessToken: text(),
  refreshToken: text(),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text(),
  idToken: text(),
  password: text(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
})

export const verificationTable = pgTable('verification', {
  id: text().primaryKey(),
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
})
