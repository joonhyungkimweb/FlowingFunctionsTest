import { useRef, useCallback, ChangeEvent } from 'react';
import { Handle, Position, NodeProps, useReactFlow } from 'react-flow-renderer';
import { makeFuntion } from '../modules/functionRunner';
import {
  FunctionNodeProps,
  FunctionNodeComponentProps,
  CustomScript,
} from '../types/functionNode';
import '../styles/css/functionNode.css';

export default <p extends FunctionNodeComponentProps>({
  Component = null,
  nodeOptions: { input, output } = { input: true, output: true },
  ...props
}: FunctionNodeProps<p>) => {
  const FunctionNode = ({ data, id }: NodeProps) => {
    const textRef = useRef(null);
    const customScript = useRef<CustomScript>((script: string) => script);
    const { getEdges, getNode } = useReactFlow();

    const findEgdes = (currentId: string) =>
      getEdges().filter(({ target }) => target === currentId);

    const runPrevScript = async (currentId: string): Promise<any> => {
      const currentNode = getNode(currentId);
      const currentScript = makeFuntion(
        currentNode?.data.script || '',
        currentNode?.data.inputs,
      );
      const edges = findEgdes(currentId);
      if (edges.length === 0) return await currentScript([]);
      return await currentScript(
        await Promise.all(edges.map(({ source }) => runPrevScript(source))),
      );
    };

    const onChange = useCallback(
      (e: ChangeEvent<HTMLTextAreaElement>) => {
        data.updateNodeScript(customScript.current(e.currentTarget.value), id);
      },
      [data.updateNodeScript, id],
    );

    return (
      <>
        {input && <Handle type="target" position={Position.Top} />}
        <div className="function-node">
          {Component && (
            <Component {...(props as p)} id={id} runner={customScript} />
          )}
          <p> script </p>
          <textarea
            cols={55}
            rows={8}
            ref={textRef}
            onChange={onChange}
          ></textarea>
          <button
            onClick={async () => {
              const scriptResult = await runPrevScript(id);
              console.log(scriptResult);
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
