import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const QuantumConnection = ({ start, end, color, isActive }) => {
  const lineRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (lineRef.current) {
      const length = lineRef.current.getTotalLength();
      lineRef.current.style.strokeDasharray = length;
      lineRef.current.style.strokeDashoffset = length;
    }
  }, []);

  return (
    <svg 
      className="absolute top-0 left-0 w-full h-full" 
      style={{ zIndex: -1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.line
        ref={lineRef}
        x1={`${start.x}%`}
        y1={`${start.y}%`}
        x2={`${end.x}%`}
        y2={`${end.y}%`}
        stroke={color}
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ 
          pathLength: isActive ? [0, 1, 0] : 0.5,
          opacity: isActive ? 1 : 0.3,
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {isHovered && (
        <text 
          x={`${(start.x + end.x) / 2}%`} 
          y={`${(start.y + end.y) / 2}%`} 
          fill="white"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {`${start.name} - ${end.name}`}
        </text>
      )}
    </svg>
  );
};

export default QuantumConnection;