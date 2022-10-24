setTimeout(() => {
  console.log('setTimeout');
  setImmediate(() => {
    console.log('setImmediate 2');
  });
}, 10);
setImmediate(() => {
  console.log('setImmediate 1');
});
