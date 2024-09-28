"use client";
import { motion } from 'framer-motion';
import { FaCalendar, FaBook, FaPencilAlt, FaHeartbeat } from 'react-icons/fa';

const ProductivitySection = () => {
  return (
    <div className="bg-[#1e2a38] min-h-screen relative overflow-hidden py-16">
      {/* العنوان والوصف */}
      <div className="text-center mb-12">
        <h2 className="text-[#22d3ee] text-4xl font-bold mb-4">اكتشف إمكانياتك</h2>
        <p className="text-gray-300 text-lg">أدوات متقدمة لتعزيز إنتاجيتك وتحقيق أهدافك</p>
      </div>

      {/* الأشكال المتوهجة */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-8 max-w-6xl mx-auto">
        {[
          { icon: FaCalendar, title: 'نظم حياتك' },
          { icon: FaBook, title: 'المكتبة الشخصية' },
          { icon: FaPencilAlt, title: 'تدوين اليوميات' },
          { icon: FaHeartbeat, title: 'التعافي والنمو' },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="w-64 h-64 bg-[#2a3b52] rounded-lg p-6 flex flex-col items-center justify-center text-center"
            whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(34, 211, 238, 0.5)' }}
          >
            <item.icon className="text-[#22d3ee] text-5xl mb-4" />
            <h3 className="text-[#22d3ee] text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-300 text-sm">وصف مختصر للميزة وكيفية استفادتك منها</p>
          </motion.div>
        ))}
      </div>

      {/* زر الدعوة للعمل */}
      <div className="text-center mt-12">
        <motion.button
          className="bg-[#22d3ee] text-[#1e2a38] px-8 py-3 rounded-full font-bold text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ابدأ رحلتك الآن
        </motion.button>
      </div>
    </div>
  );
};

export default ProductivitySection;