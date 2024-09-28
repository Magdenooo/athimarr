// InfoPanel.jsx
import React from 'react';
import { motion } from 'framer-motion';

const InfoPanel = ({ category = {}, onClose }) => {
  const { name = '', description = '', keyAspects = [] } = category;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.5 }}
      className="text-white p-6 bg-gradient-to-bl from-[#1a1a1a] to-[#2a2a2a] rounded-xl shadow-lg rtl"
      dir="rtl"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-4xl font-bold text-[#22d3ee] tracking-wide">{name}</h2>
        <button 
          onClick={onClose}
          className="bg-[#22d3ee] text-[#1a1a1a] px-3 py-1 rounded-full hover:bg-[#1a9cb7] transition-colors duration-300"
        >
          إغلاق
        </button>
      </div>
      <p className="text-xl mb-8 leading-relaxed">{description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {keyAspects.map((aspect, index) => (
          <Feature 
            key={index} 
            title={aspect.title || 'عنوان غير متوفر'} 
            description={aspect.description || 'وصف غير متوفر'} 
          />
        ))}
      </div>
      {keyAspects.length === 0 && (
        <p className="text-center text-gray-400">لقراءه المزيد ...</p>
      )}
    </motion.div>
  );
};

const Feature = ({ title, description }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    className="bg-[#1a1a1a] p-6 rounded-lg border border-[#22d3ee] hover:bg-[#2a2a2a] transition-colors duration-300 shadow-md"
  >
    <h3 className="text-lg font-semibold mb-3 text-[#22d3ee]">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </motion.div>
);

export default InfoPanel;