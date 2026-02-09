import React from 'react'
import { useState } from 'react';

interface ToolboxProps {
    onAddNode: (type: string, count: number) => void;
}

const devices = ["Router", "Switch", "Firewall", "Server", "PC"];

function Toolbox({ onAddNode }: ToolboxProps) {
    const [counts, setCounts] = useState<Record<string, number>>({});

    const handleAdd = (device: string) => {
        const newCount = (counts[device] || 0) + 1;
        setCounts({ ...counts, [device]: newCount });
        onAddNode(device, newCount);
    };

    return (
        <div className="toolbox">
            {devices.map((device) => (
                <button key={device} onClick={() => handleAdd(device)}>
                    {device}
                </button>
            ))}
        </div>
    );
}

export default Toolbox;