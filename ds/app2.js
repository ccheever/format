import { Application } from 'https://deno.land/x/oak@v3.3.0/mod.ts';

let app = new Application();

app.use((ctx) => {
  ctx.response.body = 'Hello world';
});

await Deno.permissions.request({ name: 'env' });
let port = parseInt(Deno.env('PORT') + '') || 4700;

await Deno.permissions.request({ name: 'net' });
let server$ = app.listen({ port });

console.log(`Format server started on port ${port}`);

await server$;
