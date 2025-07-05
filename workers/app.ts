import { drizzle, type DrizzleD1Database } from "drizzle-orm/d1";
import { createRequestHandler } from "react-router";
import * as schema from "../database/schema";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { eq } from "drizzle-orm";

declare module "react-router" {
  export interface AppLoadContext {
    cloudflare: {
      env: Env;
      ctx: ExecutionContext;
    };
    db: DrizzleD1Database<typeof schema>;
  }
}

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE
);

const app = new Hono<{ Bindings: Env }>();

app.use("/api/*", cors());

app.get("/api/tasks", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const allTasks = await db.query.tasks.findMany();
  return c.json(allTasks);
});

app.post("/api/tasks", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const { title, content, due_date } = await c.req.json();
  const newTask = await db
    .insert(schema.tasks)
    .values({ title, content, createdAt: new Date().toISOString(), due_date })
    .returning();
  return c.json(newTask);
});

app.put("/api/tasks/:id", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const id = Number(c.req.param("id"));
  const { completed, due_date } = await c.req.json();
  const updatedTask = await db
    .update(schema.tasks)
    .set({ completed, due_date })
    .where(eq(schema.tasks.id, id))
    .returning();
  return c.json(updatedTask);
});

app.delete("/api/tasks/:id", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const id = Number(c.req.param("id"));
  await db.delete(schema.tasks).where(eq(schema.tasks.id, id));
  return c.json({ message: "Task deleted" });
});

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) {
      return app.fetch(request, env, ctx);
    }

    const db = drizzle(env.DB, { schema });
    return requestHandler(request, {
      cloudflare: { env, ctx },
      db,
    });
  },
} satisfies ExportedHandler<Env>;