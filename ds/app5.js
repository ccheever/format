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

while (true) {
  let buf = new Uint8Array(1024);
  let n = await Deno.stdin.read(buf);
  if (n === Deno.EOF) {
    break;
  } else {
    let rawInput = new TextDecoder().decode(buf.subarray(0, n));
    let input = rawInput.toLocaleLowerCase().trim();
    if (input === 'q') {
      break;
    } else {
      switch (input) {
        case 'q':
          break;
        case 'o':
          console.log('Open homepage of app');
          break;
        case 'g':
          console.log('Open GraphQL playground');
          break;
        default:
          break;
      }
    }
  }
}

await server$;
