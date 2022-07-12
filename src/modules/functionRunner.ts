// eslint-disable-next-line @typescript-eslint/no-empty-function
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

const makeFuntion = (script: string, inputs: string[]) => (args: any[]) =>
  new AsyncFunction(inputs, script)(...args);

const addRendererScript = (docId: string, script: string) => `
        const root = document.getElementById('${docId}');
        const doc = document.createDocumentFragment();
        if(root == null) return;
        try {
          ${script}
        } finally {
          root.innerHTML = '';
          root.appendChild(doc);
        }`;

const makeRenedererFunction = (
  script: string,
  inputs: string[],
  docId: string,
) => makeFuntion(addRendererScript(docId, script), inputs);

export { makeFuntion, makeRenedererFunction };
