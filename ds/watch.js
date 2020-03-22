import watch from 'https://deno.land/x/watch@1.2.1/mod.ts';

for await (const changes of watch('.')) {
  console.log(changes.added);
  console.log(changes.modified);
  console.log(changes.deleted);
}

const end = watch('src').start((changes) => {
  console.log(changes);
});
