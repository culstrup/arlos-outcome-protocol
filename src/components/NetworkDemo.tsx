import React, { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Controls,
  Background,
  MiniMap,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Card } from '@/components/ui/card';

// Custom node component for ARLOS roles
const ARLOSNode = ({ data }: { data: any }) => {
  return (
    <div className={`px-6 py-4 rounded-lg border-2 ${data.color} bg-background/95 backdrop-blur-sm shadow-lg min-w-[120px] text-center`}>
      <div className="text-2xl font-bold mb-1">{data.letter}</div>
      <div className="text-sm font-semibold">{data.name}</div>
      <div className="text-xs text-muted-foreground mt-1">{data.role}</div>
    </div>
  );
};

const nodeTypes = {
  arlos: ARLOSNode,
};

const NetworkDemo = () => {
  // Define the initial nodes
  const initialNodes: Node[] = useMemo(() => [
    {
      id: 'agents',
      type: 'arlos',
      position: { x: 400, y: 100 },
      data: {
        letter: 'A',
        name: 'Agents',
        role: 'Execute Tasks',
        color: 'border-blue-500 text-blue-600',
      },
    },
    {
      id: 'researchers',
      type: 'arlos',
      position: { x: 100, y: 200 },
      data: {
        letter: 'R',
        name: 'Researchers',
        role: 'Provide Insights',
        color: 'border-green-500 text-green-600',
      },
    },
    {
      id: 'liquidity',
      type: 'arlos',
      position: { x: 700, y: 200 },
      data: {
        letter: 'L',
        name: 'Liquidity',
        role: 'Enable Markets',
        color: 'border-purple-500 text-purple-600',
      },
    },
    {
      id: 'oracles',
      type: 'arlos',
      position: { x: 250, y: 350 },
      data: {
        letter: 'O',
        name: 'Oracles',
        role: 'Verify Outcomes',
        color: 'border-orange-500 text-orange-600',
      },
    },
    {
      id: 'sponsors',
      type: 'arlos',
      position: { x: 550, y: 350 },
      data: {
        letter: 'S',
        name: 'Sponsors',
        role: 'Fund Initiatives',
        color: 'border-red-500 text-red-600',
      },
    },
  ], []);

  // Define the initial edges showing relationships
  const initialEdges: Edge[] = useMemo(() => [
    {
      id: 'agents-researchers',
      source: 'agents',
      target: 'researchers',
      animated: true,
      style: { stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Request Data',
    },
    {
      id: 'agents-liquidity',
      source: 'agents',
      target: 'liquidity',
      animated: true,
      style: { stroke: '#8b5cf6', strokeWidth: 2 },
      label: 'Trade Predictions',
    },
    {
      id: 'researchers-oracles',
      source: 'researchers',
      target: 'oracles',
      animated: true,
      style: { stroke: '#10b981', strokeWidth: 2 },
      label: 'Provide Evidence',
    },
    {
      id: 'sponsors-agents',
      source: 'sponsors',
      target: 'agents',
      animated: true,
      style: { stroke: '#ef4444', strokeWidth: 2 },
      label: 'Fund Tasks',
    },
    {
      id: 'oracles-liquidity',
      source: 'oracles',
      target: 'liquidity',
      animated: true,
      style: { stroke: '#f97316', strokeWidth: 2 },
      label: 'Settle Markets',
    },
    {
      id: 'liquidity-sponsors',
      source: 'liquidity',
      target: 'sponsors',
      animated: true,
      style: { stroke: '#8b5cf6', strokeWidth: 2 },
      label: 'Return Investment',
    },
  ], []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Interactive Network Demo
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore how the ARLOS framework creates dynamic connections between roles. 
            Drag nodes around to see the living ecosystem in action.
          </p>
        </div>

        <Card className="p-8 bg-background/50 backdrop-blur-sm border-arlos-blue/20">
          <div className="h-[600px] w-full">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              fitView
              attributionPosition="bottom-left"
              className="bg-gradient-to-br from-background via-muted/10 to-arlos-blue/5"
            >
              <Controls className="bg-background/80 backdrop-blur-sm border-arlos-blue/20" />
              <MiniMap 
                className="bg-background/80 backdrop-blur-sm border-arlos-blue/20" 
                nodeStrokeWidth={3}
                pannable
                zoomable
              />
              <Background gap={20} size={1} className="opacity-30" />
            </ReactFlow>
          </div>
          
          <div className="mt-8 grid md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <h4 className="font-bold text-lg gradient-text mb-2">Interactive Exploration</h4>
              <p className="text-muted-foreground">Drag nodes to reorganize the network and see how relationships adapt</p>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-lg gradient-text mb-2">Live Connections</h4>
              <p className="text-muted-foreground">Animated edges show real-time data flow and economic incentives</p>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-lg gradient-text mb-2">Scalable Framework</h4>
              <p className="text-muted-foreground">Add new nodes and connections as your organization grows</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default NetworkDemo;