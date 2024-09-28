"use client"

import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaMedal, FaQuoteRight, FaCalendarCheck, FaBook, FaUsers, FaChartLine, FaTimes, FaArrowRight, FaArrowLeft } from 'react-icons/fa';

function RecoveryPlan() {
  const [week, setWeek] = useState(1);
  const [progress, setProgress] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showMotivation, setShowMotivation] = useState(false);
  const [activeTab, setActiveTab] = useState('plan');
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const weeks = [
    { id: 1, name: 'الأسبوع الأول', days: ['اليوم 1', 'اليوم 2', 'اليوم 3', 'اليوم 4', 'اليوم 5', 'اليوم 6', 'اليوم 7'] },
    { id: 2, name: 'الأسبوع الثاني', days: ['اليوم 1', 'اليوم 2', 'اليوم 3', 'اليوم 4', 'اليوم 5', 'اليوم 6', 'اليوم 7'] },
    { id: 3, name: 'الأسبوع الثالث', days: ['اليوم 1', 'اليوم 2', 'اليوم 3', 'اليوم 4', 'اليوم 5', 'اليوم 6', 'اليوم 7'] },
    { id: 4, name: 'الأسبوع الرابع', days: ['اليوم 1', 'اليوم 2', 'اليوم 3', 'اليوم 4', 'اليوم 5', 'اليوم 6', 'اليوم 7'] }
  ];

  const motivationalQuotes = [
    "كل يوم هو فرصة جديدة للتغيير.",
    "قوتك أكبر من إدمانك.",
    "التعافي رحلة، وليس وجهة.",
    "أنت أقوى مما تعتقد.",
    "الفشل ليس نهاية الرحلة، بل جزء منها."
  ];

  const handleWeekChange = (weekId) => {
    setWeek(weekId);
  };

  const handleDayComplete = (dayIndex) => {
    setStreak(streak + 1);
    setProgress(Math.min(progress + 3.57, 100));
  };

  const handleNextQuote = () => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % motivationalQuotes.length);
  };

  const handlePrevQuote = () => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex - 1 + motivationalQuotes.length) % motivationalQuotes.length);
  };

  useEffect(() => {
    setProgress(((week - 1) * 25));
  }, [week]);

  const renderTabContent = () => {
    switch(activeTab) {
      case 'plan':
        return (
          <>
            <div className="flex flex-wrap justify-between mb-8">
              {weeks.map((weekItem) => (
                <button
                  key={weekItem.id}
                  className={`bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 mb-2 ${week === weekItem.id ? 'ring-2 ring-blue-300' : ''}`}
                  onClick={() => handleWeekChange(weekItem.id)}
                >
                  {weekItem.name}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {weeks.find((item) => item.id === week).days.map((day, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-4 hover:from-gray-600 hover:to-gray-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
                  <h2 className="text-blue-300 text-lg font-medium mb-2">{day}</h2>
                  <p className="text-gray-400">محتوى اليوم...</p>
                  <button 
                    className="mt-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-2 px-4 rounded-full text-sm flex items-center justify-center w-full transition duration-300 ease-in-out"
                    onClick={() => handleDayComplete(index)}
                  >
                    <FaCheckCircle className="mr-2" /> اكتمل
                  </button>
                </div>
              ))}
            </div>
          </>
        );
      case 'journal':
        return (
          <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-300">يوميات التعافي</h2>
            <textarea 
              className="w-full h-48 p-4 rounded bg-gray-600 text-white resize-none focus:ring-2 focus:ring-blue-300 focus:outline-none transition duration-300 ease-in-out"
              placeholder="اكتب أفكارك ومشاعرك هنا..."
            ></textarea>
            <button className="mt-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
              حفظ اليوميات
            </button>
          </div>
        );
      case 'resources':
        return (
          <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-300">موارد مفيدة</h2>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-blue-300 hover:text-blue-500 transition duration-300 ease-in-out flex items-center">
                  <FaBook className="mr-2" /> كتب عن التعافي
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-300 hover:text-blue-500 transition duration-300 ease-in-out flex items-center">
                  <FaUsers className="mr-2" /> مجموعات دعم عبر الإنترنت
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-300 hover:text-blue-500 transition duration-300 ease-in-out flex items-center">
                  <FaQuoteRight className="mr-2" /> مقالات تحفيزية
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-300 hover:text-blue-500 transition duration-300 ease-in-out flex items-center">
                  <FaChartLine className="mr-2" /> تطبيقات مساعدة
                </a>
              </li>
            </ul>
          </div>
        );
      case 'stats':
        return (
          <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-300">إحصائيات التعافي</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-600 rounded-lg p-4 text-center">
                <h3 className="text-lg font-semibold text-blue-300">أطول فترة تعافي</h3>
                <p className="text-3xl font-bold text-green-400 mt-2">30 يوم</p>
              </div>
              <div className="bg-gray-600 rounded-lg p-4 text-center">
                <h3 className="text-lg font-semibold text-blue-300">إجمالي الأيام الناجحة</h3>
                <p className="text-3xl font-bold text-green-400 mt-2">45 يوم</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center p-4">
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 bg-gray-800 shadow-2xl rounded-lg">
        <h1 className="text-4xl font-bold mb-8 text-blue-400 text-center">خطة التعافي من الإباحية</h1>
        
        <div className="flex flex-wrap justify-center mb-8 gap-4">
          {['plan', 'journal', 'resources', 'stats'].map((tab) => (
            <button 
              key={tab}
              className={`flex items-center px-6 py-3 rounded-full transition duration-300 ease-in-out transform hover:scale-105 ${activeTab === tab ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'plan' && <FaCalendarCheck className="mr-2" />}
              {tab === 'journal' && <FaBook className="mr-2" />}
              {tab === 'resources' && <FaUsers className="mr-2" />}
              {tab === 'stats' && <FaChartLine className="mr-2" />}
              {tab === 'plan' ? 'الخطة' : tab === 'journal' ? 'اليوميات' : tab === 'resources' ? 'الموارد' : 'الإحصائيات'}
            </button>
          ))}
        </div>

        {renderTabContent()}

        <div className="flex flex-wrap items-center justify-center gap-6 mb-8 mt-8">
          <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-blue-300 text-xl font-medium mb-4 text-center">نسبة الإنجاز في الخطة</h2>
            <div className="relative pt-1">
              <div className="overflow-hidden h-6 mb-4 text-xs flex rounded bg-gray-600">
                <div style={{ width: `${progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-in-out">
                </div>
              </div>
            </div>
            <p className="text-6xl text-center text-blue-400 font-bold">{progress.toFixed(0)}%</p>
          </div>

          <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-blue-300 text-xl font-medium mb-4 text-center">أيام النجاح المتتالية</h2>
            <div className="flex items-center justify-center">
              <FaMedal className="text-yellow-400 text-5xl mr-4" />
              <p className="text-6xl text-center text-yellow-400 font-bold">{streak}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <button 
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full text-lg flex items-center transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
            onClick={() => setShowMotivation(true)}
          >
            <FaQuoteRight className="mr-2" /> اقتباس تحفيزي
          </button>
        </div>

        {showMotivation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-8 max-w-md relative shadow-2xl">
              <button 
                className="absolute top-2 right-2 text-gray-400 hover:text-white transition duration-300 ease-in-out"
                onClick={() => setShowMotivation(false)}
              >
                <FaTimes size={24} />
              </button>
              <p className="text-white text-2xl mb-6 text-center font-semibold">{motivationalQuotes[currentQuoteIndex]}</p>
              <div className="flex justify-between items-center">
                <button 
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={handlePrevQuote}
                >
                  <FaArrowLeft />
                </button>
                <button 
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={handleNextQuote}
                >
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecoveryPlan;