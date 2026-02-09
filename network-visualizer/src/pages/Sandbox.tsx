import ReactFlow, { 
    Node, 
    useNodesState, 
    useEdgesState, 
    addEdge, 
    Connection,
    ConnectionMode 
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useCallback, MouseEvent, useRef } from 'react';
import Toolbox from '../components/sandbox/Toolbox';
import '../components/sandbox/Toolbox.css';

// Define which device types can connect to which
const connectionRules: Record<string, string[]> = {
    "Router": ["Switch", "Router", "Firewall", "Server"],
    "Switch": ["Router", "PC", "Server", "Switch"],
    "Firewall": ["Router", "Server"],
    "Server": ["Switch", "Router", "Firewall"],
    "PC": ["Switch"],
};

// Info about each device type (when it's clicked)
const deviceInfo: Record<string, string> = {
    "Router": "A device that forwards data packets between networks.",
    "Switch": "A device that connects devices within a local network.",
    "Firewall": "A security system that monitors and controls network traffic.",
    "Server": "A computer that provides services to other computers on a network.",
    "PC": "A personal computer used for general computing tasks."
};

function Sandbox() {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    
    const timeoutRef = useRef<Record<string, NodeJS.Timeout>>({});

    // Helper to get the device type from a node id (e.g. "Router-1" → "Router")
    const getDeviceType = (nodeId: string) => nodeId.split("-")[0];

    // onConnect is called when the user tries to connect two nodes
    const onConnect = useCallback(
        (connection: Connection) => {
            if (!connection.source || !connection.target) return;

            // No self-connections
            if (connection.source === connection.target) return;

            // No duplicates
            const exists = edges.find(
                (e) => e.source === connection.source && e.target === connection.target
            );
            if (exists) return;

            // Check connection rules
            const sourceType = getDeviceType(connection.source);
            const targetType = getDeviceType(connection.target);
            const allowed = connectionRules[sourceType];

            if (!allowed || !allowed.includes(targetType)) {
                console.log(`Connection not allowed: ${sourceType} → ${targetType}`);
                return;
            }

            setEdges((eds) => addEdge(connection, eds));
        },
        [setEdges, edges]
    );

    // onNodeClick is called when the user clicks on a node
    const onNodeClick = useCallback((event: MouseEvent, node: Node) => {
        const type = getDeviceType(node.id);
        const originalLabel = node.data.label;

        // Clear any existing timeout for this node
        if (timeoutRef.current[node.id]) {
            clearTimeout(timeoutRef.current[node.id]);
        }

        // Change label to info
        setNodes((nds) => nds.map((n) => 
            n.id === node.id 
                ? { ...n, data: { ...n.data, label: deviceInfo[type] } }
                : n
        ));

        // Revert after 3 seconds
        timeoutRef.current[node.id] = setTimeout(() => {
            setNodes((nds) => nds.map((n) => 
                n.id === node.id 
                    ? { ...n, data: { ...n.data, label: originalLabel } }
                    : n
            ));
            delete timeoutRef.current[node.id];
        }, 3000);
    }, [setNodes]);

    // addNode is called when the user clicks a button in the Toolbox to add a new device
    const addNode = (type: string, count: number) => {
        const newNode: Node = {
            id: `${type}-${count}`,
            data: { label: `${type} ${count}` },
            position: { x: Math.random() * 400, y: Math.random() * 400 },
        };
        setNodes([...nodes, newNode]);
    };

    // Render the Toolbox and the ReactFlow canvas
    return (
        <div className="sandbox-container">
            <Toolbox onAddNode={addNode} />
            <div style={{ height: '100vh', width: '100vw' }}>
                <ReactFlow 
                    nodes={nodes} 
                    edges={edges}
                    onNodesChange={onNodesChange} 
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onNodeClick={onNodeClick}
                    connectionMode={ConnectionMode.Loose}
                />
            </div>
        </div>
    );
}

export default Sandbox;