// hono-extensions.d.ts  
import 'hono';  

declare module 'hono' {  
    interface HonoRequest {  
        file?: Express.Multer.File; // Adding multer file type.  
    }  
}