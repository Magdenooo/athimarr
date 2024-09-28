"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTarget, FiBox, FiCheckSquare, FiBook, FiPlus } from 'react-icons/fi';

const LifeAspects = () => {
  const [aspects, setAspects] = useState({
    'تطوير الذات': { color: 'from-blue-400 to-blue-600', icon: '🚀' },
    'الدين': { color: 'from-green-400 to-green-600', icon: '🕌' },
    'الدراسة': { color: 'from-yellow-400 to-yellow-600', icon: '📚' },
    'العمل': { color: 'from-red-400 to-red-600', icon: '💼' },
    'الصحة': { color: 'from-purple-400 to-purple-600', icon: '🍎' },
    'الترفيه': { color: 'from-pink-400 to-pink-600', icon: '🎭' },
  });

  const [selectedAspect, setSelectedAspect] = useState(null);
  const [aspectDetails] = useState({
    'تطوير الذات': {
      goals: ['تعلم لغة برمجة جديدة', 'قراءة 24 كتاب في السنة'],
      projects: ['إنشاء مدونة شخصية', 'تطوير تطبيق موبايل'],
      tasks: ['قراءة 30 دقيقة يومياً', 'حضور دورة أونلاين أسبوعياً'],
      resources: ['Udemy', 'Coursera', 'كتب البرمجة']
    },
    'الدين': {
      goals: ['حفظ 5 أجزاء من القرآن', 'تحسين الصلوات اليومية'],
      projects: ['دراسة السيرة النبوية', 'تنظيم حلقة قرآن أسبوعية'],
      tasks: ['قراءة جزء من القرآن يومياً', 'حضور درس ديني أسبوعي'],
      resources: ['تطبيق القرآن الكريم', 'كتب التفسير']
    },
    // أضف باقي الجوانب هنا
  });

  const categoryIcons = {
    goals: <FiTarget className="text-2xl text-blue-500" />,
    projects: <FiBox className="text-2xl text-green-500" />,
    tasks: <FiCheckSquare className="text-2xl text-red-500" />,
    resources: <FiBook className="text-2xl text-purple-500" />,
  };

  const getAspectItemCount = (name) => {
    if (aspectDetails[name]) {
      return Object.values(aspectDetails[name]).reduce((total, items) => total + items.length, 0);
    }
    return 0;
  };

  return (
    <div className="container mx-auto px-4 py-8 text-right bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen" dir="rtl">
      <motion.h1 
        className="text-5xl font-bold text-center mb-12 text-gray-800"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        رحلة التطور الشخصي
      </motion.h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-12">
        {Object.entries(aspects).map(([name, aspect], index) => (
          <motion.div
            key={name}
            className={`bg-gradient-to-br ${aspect.color} rounded-2xl p-6 text-white shadow-lg cursor-pointer relative overflow-hidden transition-all duration-300 hover:shadow-xl backdrop-filter backdrop-blur-lg bg-opacity-80`}
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => setSelectedAspect(name)}
          >
            <div className="text-5xl mb-4">{aspect.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{name}</h2>
            <div className="absolute top-2 right-2 bg-white bg-opacity-30 px-2 py-1 rounded-full text-xs">
              {getAspectItemCount(name)} عناصر
            </div>
          </motion.div>
        ))}
        <motion.div
          className="bg-gradient-to-br from-gray-300 to-gray-400 rounded-2xl p-6 text-gray-700 shadow-lg cursor-pointer relative overflow-hidden transition-all duration-300 hover:shadow-xl flex items-center justify-center"
          whileHover={{ scale: 1.05, rotate: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiPlus className="text-4xl mr-2" />
          <span className="text-xl font-semibold">إضافة جانب</span>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedAspect && aspectDetails[selectedAspect] && (
          <motion.div 
            className="mt-12 bg-white rounded-2xl shadow-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
              <span className="text-4xl mr-3">{aspects[selectedAspect].icon}</span>
              {selectedAspect}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(aspectDetails[selectedAspect]).map(([category, items]) => (
                <motion.div 
                  key={category} 
                  className="bg-gray-50 p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center mb-4">
                    {categoryIcons[category]}
                    <h3 className="font-bold mr-3 text-xl text-gray-700">
                      {category === 'goals' ? 'الأهداف' : category === 'projects' ? 'المشاريع' : category === 'tasks' ? 'المهام' : 'الموارد'}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {items.map((item, index) => (
                      <motion.li 
                        key={index} 
                        className="text-gray-600 flex items-center"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LifeAspects;