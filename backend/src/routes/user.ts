import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signInInput, signupInput } from "@yashgtech007/medeum-blog";
import { Hono } from "hono";
import { sign } from "hono/jwt";

export const userRoute = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    };
  }>();

userRoute.post("/signup", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    console.log(body,"yashbody");
    
    const {success} = signupInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message:"Inputs not correct"
        })
    }
    try {
      console.log("yash before user");
      
      const user = await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: body.password,
        },
      });
      console.log(user,"yash user");
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
      console.log(jwt , "jwt");
      return c.json({
        jwt
      });
      
      
    } catch (err) {

      console.error(err)
      return c.status(403);
      
    }
  });
  
  userRoute.post("/signin", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  try{
    const body = await c.req.json();
    const {success} = signInInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message:"Inputs not correct"
        })
    }
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });
  
    if (!user) {
      c.status(403);
      return c.json({ error: "user not found" });
    }
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.text( jwt );
  }catch(e){
    console.log(e);
    c.status(411)
    return c.text('Invaild')  
  }
  });