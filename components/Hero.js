"use client";

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat, faTimes, faBook, faTasks, faCalendar, faQuoteLeft, faLeaf, faSeedling, faTree, faChevronRight, faLock, faUnlock, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

export default function Hero() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentQuote, setCurrentQuote] = useState('');
  const [currentFeature, setCurrentFeature] = useState(0);
  const [treeGrowth, setTreeGrowth] = useState(0);

  const features = [
    { icon: faTasks, text: 'إدارة المهام اليومية' },
    { icon: faCalendar, text: 'تتبع العادات' },
    { icon: faBook, text: 'مكتبة التطوير الذاتي' },
  ];

  const quotes = [
    'كل يوم هو فرصة جديدة لبناء عادات إيجابية.',
    'التغيير يبدأ بقرار واحد في كل مرة.',
    'النجاح هو رحلة، وليس وجهة.',
  ];

  useEffect(() => {
    const intervals = [
      setInterval(() => setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]), 5000),
      setInterval(() => setCurrentFeature((prev) => (prev + 1) % features.length), 3000),
      setInterval(() => setTreeGrowth((prev) => (prev < 100 ? prev + 1 : 0)), 200),
    ];

    return () => intervals.forEach(clearInterval);
  }, []);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const getTreeIcon = () => {
    if (treeGrowth < 33) return faSeedling;
    if (treeGrowth < 66) return faLeaf;
    return faTree;
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-center text-white py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 animate-fadeInUp">
          حياة أفضل مع <span className="text-[#22d3ee]">منصه اثمار</span>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 animate-fadeInUp delay-200">
          نساعدك على بناء عادات إيجابية، إدارة مهامك بفعالية، وتحقيق أهدافك الشخصية. ابدأ رحلة التغيير الإيجابي اليوم.
        </p>
        <div className="flex justify-center space-x-4 mb-12">
          <button className="bg-[#22d3ee] text-gray-900 px-6 py-3 rounded-md shadow-lg transition transform hover:scale-105 hover:bg-[#22d3eedc] animate-fadeInUp delay-400">
            ابدأ رحلتك
          </button>
          <button className="bg-transparent border-2 border-[#22d3ee] text-[#22d3ee] px-6 py-3 rounded-md shadow-lg transition transform hover:scale-105 hover:bg-[#22d3eedc] hover:text-gray-900 animate-fadeInUp delay-500">
            تعرف على خدماتنا
          </button>
        </div>
        <div className="mt-12 relative">
          <FontAwesomeIcon icon={faQuoteLeft} className="text-[#22d3ee] text-4xl absolute -top-6 -left-6 opacity-50" />
          <p className="text-xl italic text-gray-300">{currentQuote}</p>
        </div>
      </div>

      {/* شجرة الإنتاجية */}
      <div className="absolute bottom-20 left-10 z-20">
        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-4 shadow-lg">
          <h3 className="text-lg font-semibold mb-2">شجرة التقدم</h3>
          <div className="relative h-32 w-32">
            <div className="absolute inset-0 flex items-center justify-center">
              <FontAwesomeIcon 
                icon={getTreeIcon()} 
                className="text-green-500 transition-all duration-500 ease-in-out"
                style={{ fontSize: `${Math.max(24, treeGrowth/1.5)}px`, opacity: treeGrowth / 100 }}
              />
            </div>
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#4CAF50"
                strokeWidth="8"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * treeGrowth) / 100}
                className="transition-all duration-500 ease-in-out"
              />
            </svg>
          </div>
          <p className="mt-2 text-sm">تقدمك: {treeGrowth}%</p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex justify-center py-8 bg-gradient-to-t from-gray-900 to-transparent">
        <div className="flex items-center space-x-8">
          {features.map((feature, index) => (
            <div key={index} className={`flex flex-col items-center transition-all duration-500 ${index === currentFeature ? 'scale-110 text-[#22d3ee]' : 'text-gray-400'}`}>
              <FontAwesomeIcon icon={feature.icon} className="text-3xl mb-2" />
              <span className="text-sm">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* بوابة التعافي */}
      <div className="fixed bottom-10 right-10 z-20">
        <div
          onClick={toggleExpand}
          className={clsx(
            'transition-all transform hover:scale-105 cursor-pointer shadow-xl',
            isExpanded ? 'w-80 h-auto p-4 bg-white rounded-lg flex flex-col items-start justify-start space-y-3 relative' : 'w-16 h-16 bg-green-500 rounded-full flex items-center justify-center'
          )}
        >
          {isExpanded ? (
            <div className="relative text-gray-900 w-full">
              <button
                onClick={toggleExpand}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition duration-300"
              >
                <FontAwesomeIcon icon={faTimes} size="sm" />
              </button>
              <h2 className="text-xl font-bold mb-4">بوابة التعافي والنمو الشخصي</h2>
              <p className="text-sm mb-4">ابدأ رحلة التعافي والنمو الشخصي الخاصة بك اليوم. نحن هنا لدعمك في كل خطوة.</p>
              <button className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition duration-300 shadow-md flex items-center justify-center w-full">
                ابدأ رحلتك الآن
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </button>
            </div>
          ) : (
            <FontAwesomeIcon icon={faHeartbeat} size="2x" className="text-white animate-pulse" />
          )}
        </div>
      </div>
    </section>
  );
}