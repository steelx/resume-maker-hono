import {zValidator} from "@hono/zod-validator";
import {Hono} from "hono";
import {getUserMiddleware} from "../kinde";
import {db} from "../db";
import {expensesTable} from "../db/schema/expenses";
import {and, desc, eq, sum} from "drizzle-orm";
import {createExpenseSchema} from "../shared-types.ts";


export const expensesRoute = new Hono()
  .get("/all", getUserMiddleware, async (c) => {
    const user = c.var.user
    const expenses = await db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id))
      .orderBy(desc(expensesTable.created_at))
      .limit(100);

    return c.json({expenses});
  })
  .get("/total", getUserMiddleware, async (c) => {
    const user = c.var.user
    const totalSpent = await db
      .select({total: sum(expensesTable.amount)})
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id))
      .limit(1)
      .then(res => res[0]);

    return c.json({total: totalSpent.total});
  })
  .post("/", getUserMiddleware, zValidator("json", createExpenseSchema), async (c) => {
    const user = c.var.user
    const data = await c.req.json();
    const result = await db.insert(expensesTable).values({
      title: data.title,
      amount: data.amount,
      userId: user.id
    }).returning()
      .then(res => res[0]);

    c.status(201)
    return c.json(result);
  })
  .get("/:id{[0-9]+}", getUserMiddleware, async (c) => {
    const user = c.var.user
    const id = Number.parseInt(c.req.param("id"));
    const data = await db
      .select()
      .from(expensesTable)
      .where(and(eq(expensesTable.userId, user.id), eq(expensesTable.id, id)))
      .then(res => res[0]);

    if (!data) return c.notFound();

    return c.json(data);
  })
  .delete("/:id{[0-9]+}", getUserMiddleware, async (c) => {
    const user = c.var.user
    const id = Number.parseInt(c.req.param("id"));
    const data = await db
      .delete(expensesTable)
      .where(and(eq(expensesTable.userId, user.id), eq(expensesTable.id, id)))
      .returning()// since delete wont return by default
      .then(res => res[0]);

    if (!data) return c.notFound();

    c.status(201);
    return c.json({expense: data});
  });
