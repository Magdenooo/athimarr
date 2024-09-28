"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaHeart, FaBook, FaPen, FaChartLine, FaShieldAlt } from 'react-icons/fa';
import Header from '@/components/Header';

const AboutUs = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    { icon: FaBrain, title: "إنتاجية فائقة", description: "أدوات ذكية لتنظيم حياتك وتحسين إنتاجيتك" },
    { icon: FaHeart, title: "التعافي والنمو", description: "خطة مخصصة للتعافي وبناء عادات إيجابية" },
    { icon: FaBook, title: "مكتبتك الشخصية", description: "احتفظ بكل ما تقرأ وتتعلم في مكان واحد" },
    { icon: FaPen, title: "تدوين اليوميات", description: "عبر عن أفكارك ومشاعرك بحرية وخصوصية" },
    { icon: FaChartLine, title: "تتبع التقدم", description: "راقب نموك وتطورك مع رسوم بيانية تفاعلية" },
    { icon: FaShieldAlt, title: "حماية وخصوصية", description: "بياناتك آمنة ومشفرة بأحدث التقنيات" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div dir="rtl" className="bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen">
      <Header className="mb-12" />
      <section className="flex items-center justify-center py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* خلفية متحركة */}
          <svg className="absolute top-0 right-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d="M0,0 Q50,50 100,0 V100 Q50,50 0,100 Z"
              fill="url(#gradient)"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 10, ease: "easeInOut" }}
            />
          </svg>

          <motion.h1
            className="text-6xl font-bold text-center mb-20 mt-12 relative z-10"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            اكتشف قوة <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] to-[#818cf8]">انتج</span>
          </motion.h1>

          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="relative h-[600px] order-2 lg:order-1">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#818cf8" />
                  </linearGradient>
                </defs>
                <motion.circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="url(#gradient)"
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                />
                <motion.path
                  d="M100,20 Q150,60 100,100 T100,180"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "linear" }}
                />
                {features.map((feature, index) => (
                  <motion.g
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: activeFeature === index ? 1 : 0.3, scale: activeFeature === index ? 1 : 0.8 }}
                    transition={{ duration: 0.5 }}
                  >
                    <circle
                      cx={100 + 70 * Math.cos(index * Math.PI / 3)}
                      cy={100 + 70 * Math.sin(index * Math.PI / 3)}
                      r="20"
                      fill="#2a2a2a"
                    />
                    <text
                      x={100 + 70 * Math.cos(index * Math.PI / 3)}
                      y={100 + 70 * Math.sin(index * Math.PI / 3)}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#ffffff"
                      fontSize="12"
                    >
                      {feature.title.split(' ')[0]}
                    </text>
                  </motion.g>
                ))}
              </svg>
            </div>

            <div className="space-y-8 order-1 lg:order-2">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 ${
                    index === activeFeature ? 'border-2 border-[#22d3ee] scale-105' : 'hover:scale-102'
                  }`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-start">
                    <feature.icon className="text-4xl text-[#22d3ee] ml-4 mt-1" />
                    <div>
                      <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                      <p className="text-gray-400 text-lg">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="text-center mt-24 relative z-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-8">حان وقت التغيير الحقيقي</h2>
            <motion.button
              className="bg-gradient-to-r from-[#22d3ee] to-[#818cf8] text-gray-900 px-10 py-4 rounded-full font-bold text-xl shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(34, 211, 238, 0.7)" }}
              whileTap={{ scale: 0.95 }}
            >
              ابدأ رحلتك مع انتج
            </motion.button>
            <p className="mt-6 text-gray-400 text-lg">انضم إلى مجتمع من الملهمين والمبدعين</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;