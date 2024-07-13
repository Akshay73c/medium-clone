import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { updateBlogInput, createBlogInput } from "@akshay15/medium-common";

type Variables = {
  userId: string;
};

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: Variables;
}>();

blogRouter.use("/*", async (c, next) => {
  // get the header
  // verify the header
  // if the header is correct, we can proceed
  // else we send the user a 403 code
  const authHeader = c.req.header("Authorization");
  if (!authHeader) {
    c.status(401);
    return c.json({ error: "You're not logged in" });
  }
  try {
    const token = authHeader.split(" ")[1];

    const user = await verify(token, c.env.JWT_SECRET);
    if (!user) {
      c.status(401);
      return c.json({
        error: "unauthorized",
      });
    }
    //@ts-ignore
    c.set("userId", user.id);
    await next();
  } catch (e) {
    console.log(e);
    return c.text("You're not logged in");
  }
});

blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs not correct",
    });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const authorId = c.get("userId");

  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authorId,
    },
  });

  return c.json({
    id: post.id,
  });
});

blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs not correct",
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const post = await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.json({
    id: post.id,
  });
});

//Todo: add pagination
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const posts = await prisma.post.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: {
          name: true,
          id: true,
          email: true,
        },
      },
    },
  });

  return c.json({
    posts,
  });
});

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = await c.req.param("id");

  try {
    const post = await prisma.post.findFirst({
      where: {
        id: Number(id),
      },
      select: {
        title: true,
        content: true,
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return c.json({
      post,
    });
  } catch (e) {
    c.status(411);
    return c.json({
      error: "Error while fetching blog post",
    });
  }
});
