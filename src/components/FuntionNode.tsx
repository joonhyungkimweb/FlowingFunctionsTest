import { useRef, useCallback, ChangeEvent } from 'react';
import { Handle, Position, NodeProps, useReactFlow } from 'react-flow-renderer';
// eslint-disable-next-line @typescript-eslint/no-empty-function
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

const makeFuntion = (script: string) => (input?: any) =>
  new AsyncFunction('input', script)(input);

export default function FuntionNode({ data, type, id }: NodeProps) {
  const textRef = useRef(null);
  const { getEdges, getNode } = useReactFlow();

  const findCurrent = (currentId: string) =>
    getEdges().find(({ target }) => target === currentId);

  const runPrevScript = async (currentId: string): Promise<any> => {
    const currentNode = getNode(currentId);
    const currentScript = makeFuntion(currentNode?.data.script || '');
    const { source: prevId } = findCurrent(currentId) || {};
    if (prevId == null) return await currentScript();
    return await currentScript(await runPrevScript(prevId));
  };

  const onChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      data.updateNodeScript(e.currentTarget.value, id);
    },
    [data.updateNodeScript, id],
  );

  return (
    <>
      {!type?.includes('Input') && (
        <Handle type="target" position={Position.Top} />
      )}
      <div className="function-node">
        <textarea
          cols={55}
          rows={8}
          ref={textRef}
          onChange={onChange}
        ></textarea>
        <button
          onClick={async () => {
            console.log(await runPrevScript(id));
          }}
        >
          실행
        </button>
      </div>
      {!type?.includes('Output') && (
        <Handle type="source" position={Position.Bottom} />
      )}
    </>
  );
}
