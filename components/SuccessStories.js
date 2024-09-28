"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaHeart, FaRunning, FaBook, FaStar } from 'react-icons/fa';

const PersonalGrowthGarden = () => {
  const [activeArea, setActiveArea] = useState(null);

  const growthAreas = [
    { icon: FaBrain, name: 'التطور الذهني', color: '#4CAF50', progress: 70 },
    { icon: FaHeart, name: 'الصحة النفسية', color: '#FF5722', progress: 85 },
    { icon: FaRunning, name: 'اللياقة البدنية', color: '#2196F3', progress: 60 },
    { icon: FaBook, name: 'التعلم المستمر', color: '#9C27B0', progress: 75 },
    { icon: FaStar, name: 'تحقيق الأهداف', color: '#FFC107', progress: 80 },
  ];

  return (
    <div className="bg-[#1e2a38] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-[#22d3ee] text-4xl font-bold text-center mb-8">حديقة إنجازاتك الشخصية</h2>
        <p className="text-gray-300 text-center mb-12">شاهد كيف تنمو وتزدهر في مختلف جوانب حياتك</p>

        <div className="flex flex-wrap justify-center gap-8">
          {growthAreas.map((area, index) => (
            <motion.div
              key={index}
              className="relative w-48 h-48"
              whileHover={{ scale: 1.1 }}
              onHoverStart={() => setActiveArea(index)}
              onHoverEnd={() => setActiveArea(null)}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="transparent"
                  stroke="#2a3b52"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="transparent"
                  stroke={area.color}
                  strokeWidth="10"
                  strokeDasharray={`${area.progress * 2.83} 283`}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <area.icon className="text-3xl mb-2" style={{ color: area.color }} />
                <p className="text-[#22d3ee] font-semibold">{area.name}</p>
              </div>
              {activeArea === index && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-[#2a3b52] text-[#22d3ee] px-4 py-2 rounded text-sm whitespace-nowrap"
                >
                  تقدمك: {area.progress}%
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <motion.button
            className="bg-[#22d3ee] text-[#1e2a38] px-8 py-3 rounded-full font-bold text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            استكشف رحلة نموك
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default PersonalGrowthGarden;