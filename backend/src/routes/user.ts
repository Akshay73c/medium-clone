import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { signupInput, signinInput } from "@akshay15/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

//We can't access that binding (a env variable) outside of the router. (there are workarounds tho)
//Hono's design centers around the request-response cycle within a router. Bindings are inherently tied to this context.
//Why?
//1 .Execution Context: Bindings are typically resolved during the request lifecycle, providing a specific environment for each request.
//2. Security: Isolating sensitive information (like secrets) within the request scope helps maintain security.

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs not correct",
    });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  //Todo : hash the password

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.username,
      password: body.password,
    },
  });

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);

  return c.json({
    jwt: token,
  });
});

userRouter.post("/signin", async (c) => {
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs not correct",
    });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  //Todo : hash-check password
  //Problem : bcrypt not supported on Hono
  const user = await prisma.user.findUnique({
    where: {
      email: body.username,
      password: body.password,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({
      error: "user not found",
    });
  }

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);

  return c.json({
    jwt: token,
  });
});

userRouter.get("/", async (c) => {
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
    const id = user.id;

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const userData = await prisma.user.findUnique({
      // @ts-ignore
      where: { id: id },
    })
    return c.json({ userData })
  } catch (e) {
    console.log(e);
    return c.json({
      message: "You're not logged in",
      error: e
    });
  }
});

userRouter.put('/userId', async (c) => {
  const id = c.req.param("userId");

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs not correct",
    });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const updatedUser = await prisma.user.update({
    where: { id: id },
    data: {
      name: body.name,
      email: body.email
    }
  })

  return c.json({
    updatedUser
  })
})
