import { useState, useCallback, useMemo, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  FitViewOptions,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
  ReactFlowProvider,
  useReactFlow,
} from 'react-flow-renderer';

import withFunctionNode from '../HOC/withFunctionNode';

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

function Flow() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const { getNodes } = useReactFlow();

  const updateNodeScript = (script: string, id: string) =>
    setNodes(
      getNodes().map((node) =>
        node.id === id ? { ...node, data: { ...node.data, script } } : node,
      ),
    );

  useEffect(() => {
    setNodes([
      {
        id: '1',
        data: { updateNodeScript },
        position: { x: 5, y: 5 },
        draggable: false,
        type: 'functionNodeInput',
      },
      {
        id: '2',
        data: { updateNodeScript },
        position: { x: 505, y: 5 },
        draggable: false,
        type: 'functionNodeInput',
      },
      {
        id: '3',
        data: { updateNodeScript, inputs: ['x', 'y'] },
        position: { x: 252.5, y: 200 },
        draggable: false,
        type: 'functionNode',
      },
      {
        id: '4',
        data: { updateNodeScript },
        position: { x: 755, y: 200 },
        draggable: false,
        type: 'functionNodeInput',
      },
      {
        id: '5',
        data: { updateNodeScript, inputs: ['data', 'model'] },
        position: { x: 505, y: 400 },
        draggable: false,
        type: 'functionNodeOutput',
      },
    ]);

    setEdges([
      { id: 'e1-3', source: '1', target: '3', label: 'x' },
      { id: 'e2-3', source: '2', target: '3', label: 'y' },
      { id: 'e3-5', source: '3', target: '5', label: 'data' },
      { id: 'e4-5', source: '4', target: '5', label: 'model' },
    ]);
  }, []);

  const nodeTypes = useMemo(
    () => ({
      functionNode: withFunctionNode({}),
      functionNodeInput: withFunctionNode({
        nodeOptions: { input: false, output: true },
      }),
      functionNodeOutput: withFunctionNode({
        nodeOptions: { input: true, output: false },
      }),
    }),
    [],
  );

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );
  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      fitViewOptions={fitViewOptions}
      nodeTypes={nodeTypes}
    />
  );
}

export default function FlowWithProvider() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}
