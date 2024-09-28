import React from 'react';
import { motion } from 'framer-motion';
import { Howl } from 'howler';

const sounds = {
  hover: new Howl({ src: ['/sounds/hover.mp3'] }),
};

const QuantumNode = ({ name, color, icon, x, y, isActive, onNodeClick }) => {
  return (
    <motion.div
      className="absolute flex items-center justify-center cursor-pointer"
      style={{ 
        left: `${x}%`,
        top: `${y}%`,
      }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => onNodeClick(name)}
      onHoverStart={() => sounds.hover.play()}
    >
      <motion.div
        className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
        style={{ 
          backgroundColor: color,
          boxShadow: `0 0 30px ${color}`,
        }}
        animate={{
          scale: isActive ? [1, 1.2, 1] : 1,
          rotate: isActive ? [0, 360] : 0,
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        {icon}
      </motion.div>
    </motion.div>
  );
};

export default QuantumNode;