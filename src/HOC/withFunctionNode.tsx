import { ComponentType } from 'react';

import { useRef, useCallback, ChangeEvent } from 'react';
import { Handle, Position, NodeProps, useReactFlow } from 'react-flow-renderer';
import { makeFuntion } from '../modules/functionRunner';

interface FunctionNodeProps {
  Component?: ComponentType | null;
  nodeOptions?: {
    input: boolean;
    output: boolean;
  };
}

export default ({
  Component = null,
  nodeOptions: { input, output } = { input: true, output: true },
  ...props
}: FunctionNodeProps) => {
  const FunctionNode = ({ data, type, id }: NodeProps) => {
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
        {input && <Handle type="target" position={Position.Top} />}
        <div className="function-node">
          {Component && <Component {...props} />}
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
        {output && <Handle type="source" position={Position.Bottom} />}
      </>
    );
  };

  return FunctionNode;
};
