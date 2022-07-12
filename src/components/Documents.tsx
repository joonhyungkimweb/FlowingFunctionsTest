import '../styles/css/documents.css';

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

import DocumentNode from './nodes/DocumentNode';

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

function Documents() {
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
        // draggable: false,
        type: 'documentNode',
      },
    ]);
  }, []);

  const nodeTypes = useMemo(
    () => ({
      documentNode: DocumentNode,
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
    <div className="documents">
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
    </div>
  );
}

export default function FlowWithProvider() {
  return (
    <ReactFlowProvider>
      <Documents />
    </ReactFlowProvider>
  );
}
