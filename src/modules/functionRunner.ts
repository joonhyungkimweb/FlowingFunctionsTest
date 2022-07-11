// eslint-disable-next-line @typescript-eslint/no-empty-function
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

const makeFuntion = (script: string) => (input?: any) =>
  new AsyncFunction('input', script)(input);

export { makeFuntion };
