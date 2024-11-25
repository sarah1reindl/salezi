export default async (ctx, next) => {
    const { stock } = ctx.request.body;
  
    if (typeof stock !== 'number' || stock < 0) {
      ctx.throw(400, 'Invalid stock value. It should be a positive number.');
    }
     
    await next();
  };
  