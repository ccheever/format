let buf = new Uint8Array(1024);

window.addEventListener('keypress', () => {
  console.log('key pressed');
});

let n = await Deno.stdin.read(buf);
if (n === Deno.EOF) {
  console.log('Standard input closed');
} else {
  console.log('READ', new TextDecoder().decode(buf.subarray(0, n)));
}
