// eslint-disable-next-line @typescript-eslint/no-empty-function
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

const makeFuntion = (script: string, inputs: string[]) => (args: any[]) =>
  new AsyncFunction(inputs, script)(...args);

export { makeFuntion };
