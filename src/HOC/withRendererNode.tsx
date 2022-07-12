import { useRef, useCallback, ChangeEvent } from 'react';
import { Handle, Position, NodeProps, useReactFlow } from 'react-flow-renderer';
import { makeFuntion, makeRenedererFunction } from '../modules/functionRunner';
import {
  RendererNode,
  FunctionNodeComponentProps,
} from '../types/functionNode';
import '../styles/css/functionNode.css';

export default <p extends FunctionNodeComponentProps>({
  nodeOptions: { input } = { input: true },
}: RendererNode<p>) => {
  const FunctionNode = ({ data, id }: NodeProps) => {
    const textRef = useRef(null);
    const { getEdges, getNode } = useReactFlow();

    const findEgdes = (currentId: string) =>
      getEdges().filter(({ target }) => target === currentId);

    const runPrevScript = async (currentId: string): Promise<any> => {
      const currentNode = getNode(currentId);
      const currentScript =
        currentId === id
          ? makeRenedererFunction(
              currentNode?.data.script || '',
              currentNode?.data.inputs,
              currentNode?.data.targetDocument,
            )
          : makeFuntion(
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
        data.updateNodeScript(e.currentTarget.value, id);
      },
      [data.updateNodeScript, id],
    );

    return (
      <>
        {input && <Handle type="target" position={Position.Top} />}
        <div className="function-node">
          <p> render script </p>
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
      </>
    );
  };

  return FunctionNode;
};
