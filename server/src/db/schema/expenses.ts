import {integer, numeric, pgEnum, pgTable, serial, text, index, varchar, timestamp} from 'drizzle-orm/pg-core';

export const expensesTable = pgTable('expenses', {
  id: serial('id').primaryKey(),
  title: varchar('title', {length: 256}).notNull(),
  userId: text("user_id").notNull(),
  amount: numeric('amount', {precision: 12, scale: 2}).notNull(),
  created_at: timestamp('created_at').defaultNow(),
}, (expenses) => {
  return {
    userIdIndex: index('user_id_idx').on(expenses.userId)
  }
});
