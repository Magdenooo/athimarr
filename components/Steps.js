"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faRocket, faMountain, faStar, faBrain, faHeart, faHandshake } from '@fortawesome/free-solid-svg-icons';

const PersonalGrowthJourney = () => {
  const [activeStage, setActiveStage] = useState(null);

  const stages = [
    { icon: faLightbulb, title: 'الوعي', description: 'اكتشف إمكاناتك الكامنة', color: 'from-yellow-600 to-orange-700' },
    { icon: faBrain, title: 'التعلم', description: 'اكتسب المعرفة والمهارات', color: 'from-blue-600 to-indigo-700' },
    { icon: faRocket, title: 'الانطلاق', description: 'ابدأ رحلة التغيير الإيجابي', color: 'from-green-600 to-teal-700' },
    { icon: faMountain, title: 'التحدي', description: 'تغلب على العقبات وحقق أهدافك', color: 'from-red-600 to-pink-700' },
    { icon: faHeart, title: 'التحول', description: 'غير عاداتك وأنماط تفكيرك', color: 'from-purple-600 to-indigo-700' },
    { icon: faStar, title: 'الإنجاز', description: 'احتفل بنجاحاتك وواصل النمو', color: 'from-yellow-600 to-red-700' },
    { icon: faHandshake, title: 'المشاركة', description: 'ألهم الآخرين وشارك تجربتك', color: 'from-green-600 to-blue-700' },
  ];

  return (
    <section className="py-24 bg-gray-900 text-gray-100 overflow-hidden relative">
      {/* خلفية متحركة */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800"></div>
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
            backgroundSize: ['100% 100%', '200% 200%'],
          }}
          transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23ffffff" fill-opacity="0.1" fill-rule="evenodd"/%3E%3C/svg%3E")',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.h2
          className="text-5xl font-bold mb-16 text-center text-transparent bg-clip-text bg-[#22d3ee]"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          رحلة التطور الشخصي
        </motion.h2>
        
        <div className="relative">
          {/* خط المسار */}
          <motion.div
            className="absolute top-1/2 left-0 right-0 h-2 bg-gradient-to-r from-[#22d3ee] to-[#00b5d1] transform -translate-y-1/2 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          
          {/* مراحل الرحلة */}
          <div className="flex justify-between relative z-10">
            {stages.map((stage, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center cursor-pointer"
                onMouseEnter={() => setActiveStage(index)}
                onMouseLeave={() => setActiveStage(null)}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  className={`w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br ${stage.color}`}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <FontAwesomeIcon icon={stage.icon} className="text-3xl text-gray-100" />
                </motion.div>
                <h3 className="mt-4 text-lg font-semibold text-gray-200">{stage.title}</h3>
                <AnimatePresence>
                  {activeStage === index && (
                    <motion.div
                      className="absolute top-full mt-2 bg-gray-800 text-gray-200 rounded-lg p-4 shadow-xl border border-gray-700"
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-sm max-w-[200px] text-center">{stage.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* نص تحفيزي */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p className="text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            كل رحلة تبدأ بخطوة واحدة. اكتشف قدراتك، واجه تحدياتك، وحقق أحلامك. ابدأ رحلتك نحو النسخة الأفضل من نفسك اليوم.
          </p>
          <motion.button
            className="bg-gradient-to-r from-[#22d3ee] to-[#00b5d1] text-gray-100 px-10 py-4 rounded-full text-xl font-semibold transition duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ابدأ رحلتك الآن
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default PersonalGrowthJourney;