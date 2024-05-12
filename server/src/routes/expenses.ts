import {zValidator} from "@hono/zod-validator";
import {Hono} from "hono";
import {z} from "zod";
import {getUserMiddleware} from "../kinde";
import {db} from "../db";
import {expensesTable} from "../db/schema/expenses";
import {and, desc, eq, sum} from "drizzle-orm";

const expenseScheme = z.object({
  id: z.number().int().min(1).positive(),
  title: z.string().min(3).max(100),
  amount: z.number().int().positive(),
});

const createPostSchema = expenseScheme.omit({id: true});

type Expense = z.infer<typeof expenseScheme>;

const fakeExpenses: Expense[] = [
  {id: 1, title: "Zomato food", amount: 300},
  {id: 2, title: "Amazon face wash", amount: 240},
  {id: 3, title: "Hyper Go RC Car", amount: 19000},
];

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
  .post("/", getUserMiddleware, zValidator("json", createPostSchema), async (c) => {
    const user = c.var.user
    const data = await c.req.json();
    const result = await db.insert(expensesTable).values({
      title: data.title,
      amount: data.amount,
      userId: user.id
    }).returning()

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
