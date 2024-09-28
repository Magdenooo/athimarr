"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRocket, FaTree, FaBook, FaArchive, FaInfoCircle } from 'react-icons/fa';

const ParaSystem = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
      setModalContent({
        title: "مرحبًا بك في نظام PARA!",
        content: "نظام PARA هو إطار تنظيمي طوره تياغو فورت لمساعدتك على تنظيم أفكارك ومواردك الرقمية بفعالية. اكتشف كيف يمكنك تحسين إدارة معلوماتك الشخصية والمهنية."
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-8 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <motion.h1 
          className="text-6xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] to-purple-400"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
           PARA إطار لتنظيم حياتك الرقمية
        </motion.h1>

        <motion.p
          className="text-xl text-center mb-16 text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          نظام مرن وفعال لتصنيف وإدارة معلوماتك الشخصية والمهنية
        </motion.p>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {['P', 'A', 'R', 'A'].map((letter, index) => (
            <ParaSection
              key={letter + index}
              letter={letter}
              title={getTitle(letter, index)}
              description={getDescription(letter, index)}
              icon={getIcon(letter, index)}
              examples={getExamples(letter, index)}
              isActive={activeSection === letter + index}
              setActive={() => {
                setActiveSection(letter + index);
                setShowModal(true);
                setModalContent({
                  title: getTitle(letter, index),
                  content: getDetailedDescription(letter, index)
                });
              }}
            />
          ))}
        </motion.div>
        
        <motion.div 
          className="bg-gray-800 p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">كيفية تطبيق نظام PARA</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {[1, 2, 3, 4, 5].map((step) => (
              <StepCard key={step} number={step} description={getStepDescription(step)} />
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-2xl font-semibold mb-2">نظام PARA: طريقك لتنظيم أفكارك ومواردك بفعالية</p>
          <p className="text-gray-300">تم تطويره بواسطة تياغو فورت لتبسيط عملية التنظيم الشخصي والمهني</p>
        </motion.div>

        <ParticlesBackground />
        
        <AnimatePresence>
          {showModal && (
            <Modal content={modalContent} onClose={() => setShowModal(false)} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ParaSection = ({ letter, title, description, icon, examples, isActive, setActive }) => {
  return (
    <motion.div 
      className={`bg-gray-800 rounded-lg p-6 shadow-lg transition-all duration-300 cursor-pointer ${
        isActive ? 'ring-4 ring-[#22d3ee] transform scale-105' : 'hover:bg-gray-700'
      }`}
      onClick={setActive}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center mb-4">
        <div className={`text-5xl font-bold mr-4 ${isActive ? 'text-[#22d3ee]' : 'text-gray-500'}`}>{letter}</div>
        <h2 className="text-2xl font-semibold flex-grow">{title}</h2>
        <div className="text-4xl text-[#22d3ee]">{icon}</div>
      </div>
      <p className="text-gray-300 mb-4">{description}</p>
      <div className="bg-gray-700 p-4 rounded-md">
        <p className="font-semibold mb-2">أمثلة:</p>
        <ul className="list-disc list-inside text-gray-300">
          {examples.map((example, index) => (
            <li key={index}>{example}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const StepCard = ({ number, description }) => {
  return (
    <motion.div 
      className="bg-gray-700 p-4 rounded-lg shadow flex items-center space-x-4 w-64"
      whileHover={{ scale: 1.05, rotate: 2 }}
    >
      <div className="text-3xl font-bold text-[#22d3ee]">{number}</div>
      <p className="text-gray-200">{description}</p>
    </motion.div>
  );
};

const ParticlesBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[#22d3ee] rounded-full opacity-20"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [null, Math.random() * window.innerHeight],
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

const Modal = ({ content, onClose }) => {
  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-gray-800 p-8 rounded-lg max-w-md"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-[#22d3ee]">{content.title}</h2>
        <p className="text-gray-300 mb-6">{content.content}</p>
        <button 
          className="bg-[#22d3ee] hover:bg-[#1cb5d1] text-gray-900 font-bold py-2 px-4 rounded transition duration-300"
          onClick={onClose}
        >
          إغلاق
        </button>
      </motion.div>
    </motion.div>
  );
};

function getTitle(letter, index) {
  const titles = {
    'P': 'المشاريع (Projects)',
    'A': index === 1 ? 'المناطق (Areas)' : 'الأرشيف (Archive)',
    'R': 'الموارد (Resources)',
  };
  return titles[letter];
}

function getDescription(letter, index) {
  const descriptions = {
    'P': 'أنشطة محددة بأهداف واضحة ونهايات محددة',
    'A': index === 1 ? 'مسؤوليات ومجالات مستمرة تحتاج إلى إدارة على المدى الطويل' : 'عناصر غير نشطة قد تحتاجها في المستقبل',
    'R': 'معلومات ومواد تدعم مشاريعك ومناطق حياتك',
  };
  return descriptions[letter];
}

function getIcon(letter, index) {
  const icons = {
    'P': <FaRocket />,
    'A': index === 1 ? <FaTree /> : <FaArchive />,
    'R': <FaBook />,
  };
  return icons[letter];
}

function getExamples(letter, index) {
  const examples = {
    'P': ['كتابة تقرير', 'تنظيم حدث', 'تطوير مهارة جديدة'],
    'A': index === 1 
      ? ['الصحة', 'المالية', 'العلاقات', 'التطوير المهني']
      : ['مشاريع مكتملة', 'ملفات قديمة', 'معلومات تاريخية'],
    'R': ['ملاحظات', 'مقالات', 'كتب', 'أدوات مفيدة'],
  };
  return examples[letter];
}

function getDetailedDescription(letter, index) {
  const descriptions = {
    'P': 'المشاريع هي أنشطة محددة زمنيًا تهدف إلى تحقيق نتيجة معينة. لها بداية ونهاية واضحة، وتتطلب مجموعة من الخطوات لإنجازها. قم بتحديد أهدافك وتقسيمها إلى خطوات قابلة للتنفيذ.',
    'A': index === 1 
      ? 'المناطق هي المسؤوليات والمجالات المستمرة في حياتك التي تحتاج إلى إدارة وصيانة على المدى الطويل. على سبيل المثال، الصحة، المالية، العلاقات، والتطوير المهني. المناطق ليس لها نهاية محددة بل تحتاج إلى اهتمام ورعاية مستمرة.'
      : 'الأرشيف هو مكان لتخزين المعلومات والمشاريع غير النشطة. يشمل العناصر التي اكتملت أو لم تعد ذات صلة حاليًا، ولكنك قد تحتاج إلى الرجوع إليها في المستقبل. استخدمه للاحتفاظ بالمعلومات القيمة دون إثقال نظامك اليومي.',
    'R': 'الموارد هي المعلومات والأدوات التي تدعم مشاريعك ومناطق حياتك. يمكن أن تكون معلومات أو مواد مرجعية قد تحتاجها في أي وقت. قم بتنظيم مواردك بشكل فعال للوصول إليها بسهولة عند الحاجة.',
  };
  return descriptions[letter];
}

function getStepDescription(step) {
  const steps = [
    'حدد مشاريعك الحالية وأهدافها',
    'عرّف المناطق الرئيسية في حياتك',
    'جمّع وصنف الموارد المفيدة',
    'أرشف العناصر غير النشطة',
    'راجع وحدّث نظامك بانتظام'
  ];
  return steps[step - 1];
}

export default ParaSystem;