import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput } from "@yashgtech007/medeum-blog";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRoute.use("/*", async (c, next) => {
  const header = c.req.header("authorization") || "";
  if (!header.startsWith("Bearer ")) {  
    c.status(403);  
    return c.json({ message: "Invalid authorization format. Token must be prefixed with 'Bearer '" });  
  }  
  const token = header.split(" ")[1];
  try {
    const user = await verify(token, c.env.JWT_SECRET);
    if (user) {
      c.set("userId", user.id);
      await next();
    } else {
      c.status(403);
      return c.json({ error: "yash1 you are not logged in" });
    }
  } catch (e) {
    c.status(403);
    return c.json({
      message: " yash2 you are not logged in",
    });
  }
});

blogRoute.post("/", async (c) => {
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs not correct",
    });
  }
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });
    return c.json({
      id: blog.id,
    });
  } catch (err) {
    c.status(500);
    return c.text("yash error");
  }
});

blogRoute.put("/", async (c) => {
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

  const blog = await prisma.blog.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return c.json({
    id: blog.id,
  });
});

blogRoute.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const blogs = await prisma.blog.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return c.json({
    blogs,
  });
});

blogRoute.get("/:id", async (c) => {
  const id = c.req.param("id");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    
    const blog = await prisma.blog.findFirst({
      where: {
        id: id,
      },
      select: {
        id:true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json({
      blog,
    });
  } catch (e) {
    c.status(411);
    return c.json({
      message: "Error while fetching blog post",
    });
  }
});
