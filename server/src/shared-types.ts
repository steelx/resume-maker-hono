import type {UserType} from "@kinde-oss/kinde-typescript-sdk";
import {z} from "zod";

export type {
  UserType
}

export const expenseScheme = z.object({
  id: z.number().int().min(1).positive(),
  title: z.string().trim().min(3).max(100),
  amount: z.number().int().positive(),
});

export const createExpenseSchema = expenseScheme.omit({id: true});

export type Expense = z.infer<typeof expenseScheme>;