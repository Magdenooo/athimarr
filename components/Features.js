"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFlag, FaStar, FaBook, FaUsers, FaEnvelope } from 'react-icons/fa';

const CreativeFooter = () => {
  const [activeNode, setActiveNode] = useState(null);

  const footerNodes = [
    { icon: FaFlag, label: 'ابدأ رحلتك', link: '/start' },
    { icon: FaStar, label: 'قصص النجاح', link: '/success-stories' },
    { icon: FaBook, label: 'مكتبة الموارد', link: '/resources' },
    { icon: FaUsers, label: 'مجتمعنا', link: '/community' },
    { icon: FaEnvelope, label: 'تواصل معنا', link: '/contact' },
  ];

  return (
    <footer className="bg-[#1e2a38] py-16 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* مسار التطور التفاعلي */}
        <div className="relative mb-16">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#22d3ee] transform -translate-y-1/2"></div>
          <div className="flex justify-between items-center relative">
            {footerNodes.map((node, index) => (
              <motion.div
                key={index}
                className="relative"
                whileHover={{ scale: 1.1 }}
                onHoverStart={() => setActiveNode(index)}
                onHoverEnd={() => setActiveNode(null)}
              >
                <div className="w-12 h-12 bg-[#2a3b52] rounded-full flex items-center justify-center cursor-pointer">
                  <node.icon className="text-[#22d3ee] text-xl" />
                </div>
                {activeNode === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-[#2a3b52] text-[#22d3ee] px-3 py-1 rounded text-sm whitespace-nowrap"
                  >
                    {node.label}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* روابط الفوتر وحقوق النشر */}
        <div className="text-center text-gray-400">
          <p className="mb-4">جميع الحقوق محفوظة © 2024 MagdyZahran</p>
          <div className="flex justify-center space-x-4 rtl:space-x-reverse">
            <a href="/privacy" className="hover:text-[#22d3ee] transition-colors">سياسة الخصوصية</a>
            <a href="/terms" className="hover:text-[#22d3ee] transition-colors">الشروط والأحكام</a>
          </div>
        </div>
      </div>

      {/* عناصر زخرفية في الخلفية */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-[#22d3ee] rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              animationDuration: `${Math.random() * 10 + 5}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>
    </footer>
  );
};

export default CreativeFooter;