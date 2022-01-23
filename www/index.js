async function init() {
  const importObject = {
    console: {
      log: () => {
        console.log("Logging...");
      },
      error: () => {
        console.log("Logging error...");
      },
    },
  };
  const response = await fetch("sum.wasm");
  const buffer = await response.arrayBuffer();
  const wasm = await WebAssembly.instantiate(buffer, importObject);
  const sumFunction = wasm.instance.exports.sum;
  const result = sumFunction(70, 80);
  console.log(result);
}

init();
