import {zValidator} from "@hono/zod-validator";
import {Hono} from "hono";
import {z} from "zod";
import {getUserMiddleware} from "../kinde.ts";

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
  .get("/all", getUserMiddleware, (c) => {
    const user = c.var.user
    // TODO: fetch expenses only for logged in user!
    return c.json({expenses: fakeExpenses});
  })
  .get("/total", getUserMiddleware, (c) => {
    const totalSpent = fakeExpenses.reduce((acc, val) => acc + val.amount, 0);
    return c.json({total: totalSpent});
  })
  .post("/", getUserMiddleware, zValidator("json", createPostSchema), async (c) => {
    const data = await c.req.json();
    fakeExpenses.push({
      ...data,
      id: fakeExpenses.length + 1,
    });
    return c.json(fakeExpenses);
  })
  .get("/:id{[0-9]+}", getUserMiddleware, (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const data = fakeExpenses.find((d) => d.id === id);
    if (!data) return c.notFound();

    return c.json(data);
  })
  .delete("/:id{[0-9]+}", getUserMiddleware, (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const dataIdx = fakeExpenses.findIndex((d) => d.id === id);
    if (dataIdx === -1) return c.notFound();

    const deletedItem = fakeExpenses.splice(dataIdx, 1)[0];
    c.status(201);
    return c.json({expense: deletedItem});
  });
