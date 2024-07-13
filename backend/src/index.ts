import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// cont dbURL = process.env.DATABASE_URL //this is not aloowed in Hono
// here the DATABASE_URL is a string, so we need to define the types of env variables while initializing Hono.
// instead of giving these types, we can also do ts-ignore but not recommended

app.use("/*", cors());

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
