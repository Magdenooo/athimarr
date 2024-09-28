"use client"
import { useState, useEffect } from 'react';
import Head from 'next/head';
import confetti from 'canvas-confetti';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Tooltip = ({ children, title }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700 -top-10 left-1/2 transform -translate-x-1/2">
          {title}
        </div>
      )}
    </div>
  );
};

const badges = [
  { id: 1, name: 'مبتدئ', icon: '🌱', threshold: 5, color: 'from-green-400 to-green-600', reward: 50 },
  { id: 2, name: 'متحمس', icon: '🔥', threshold: 20, color: 'from-orange-400 to-red-600', reward: 100 },
  { id: 3, name: 'محترف', icon: '⭐', threshold: 50, color: 'from-yellow-400 to-yellow-600', reward: 200 },
  { id: 4, name: 'خبير', icon: '💎', threshold: 100, color: 'from-blue-400 to-indigo-600', reward: 500 },
];

const rewards = [
  { id: 1, name: 'قسيمة خصم 10%', points: 1000, icon: '🎟️' },
  { id: 2, name: 'اشتراك مجاني لمدة شهر', points: 5000, icon: '🎁' },
  { id: 3, name: 'جلسة تدريب شخصية', points: 10000, icon: '👨‍🏫' },
];

export default function Challenges() {
  const [darkMode, setDarkMode] = useState(false);
  const [dailyChallenge, setDailyChallenge] = useState(null);
  const [userProgress, setUserProgress] = useState(0);
  const [nextBadge, setNextBadge] = useState(badges[0]);
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [streak, setStreak] = useState(0);
  const [showMotivation, setShowMotivation] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [showTutorial, setShowTutorial] = useState(true);
  const [dailyQuote, setDailyQuote] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [availableRewards, setAvailableRewards] = useState(rewards);
  const [newBadge, setNewBadge] = useState(null);

  useEffect(() => {
    fetchDailyChallenge();
    fetchUserProgress();
    fetchDailyQuote();
  }, []);

  useEffect(() => {
    updateNextBadge();
  }, [userProgress]);

  const fetchDailyChallenge = () => {
    setDailyChallenge({
      id: 1,
      title: 'قم بالمشي لمدة 30 دقيقة',
      description: 'المشي يساعد على تحسين الصحة البدنية والذهنية',
      tip: 'حاول المشي في الصباح الباكر للحصول على أقصى فائدة',
    });
  };

  const fetchUserProgress = () => {
    setUserProgress(15);
    setEarnedBadges([badges[0]]);
    setStreak(7);
    setPoints(150);
    setLevel(2);
  };

  const fetchDailyQuote = () => {
    setDailyQuote('كل يوم هو فرصة جديدة لتحسين نفسك.');
  };

  const updateNextBadge = () => {
    const next = badges.find(badge => badge.threshold > userProgress);
    setNextBadge(next || badges[badges.length - 1]);
  };

  const completeChallenge = () => {
    setUserProgress(prevProgress => {
      const newProgress = prevProgress + 1;
      const newBadge = badges.find(badge => badge.threshold === newProgress);
      if (newBadge) {
        setEarnedBadges(prev => [...prev, newBadge]);
        setShowMotivation(true);
        setShowConfetti(true);
        setPoints(prevPoints => prevPoints + newBadge.reward);
        setNewBadge(newBadge);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        setTimeout(() => {
          setShowMotivation(false);
          setShowConfetti(false);
          setNewBadge(null);
        }, 3000);
      }
      return newProgress;
    });
    setStreak(prevStreak => prevStreak + 1);
    setPoints(prevPoints => prevPoints + 10);
    checkLevelUp();
  };

  const checkLevelUp = () => {
    const newLevel = Math.floor(points / 100) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
      alert(`تهانينا! لقد وصلت إلى المستوى ${newLevel}`);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const claimReward = (reward) => {
    if (points >= reward.points) {
      setPoints(prevPoints => prevPoints - reward.points);
      setAvailableRewards(prevRewards => prevRewards.filter(r => r.id !== reward.id));
      alert(`تم استبدال المكافأة: ${reward.name}`);
    } else {
      alert('نقاطك غير كافية لاستبدال هذه المكافأة');
    }
  };

  return (
    <div dir="rtl" className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      <Head>
        <title>التحديات اليومية</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-12">
        {/* العنوان وزر الوضع الليلي */}
        <div className="flex justify-between items-center mb-12">
          <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-indigo-800'}`}>التحدي اليومي</h1>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-colors duration-200 ${darkMode ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        {/* الدليل السريع */}
        {showTutorial && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg max-w-md">
              <h2 className="text-2xl font-bold mb-4">مرحبًا بك في تطبيق التحديات!</h2>
              <p>هذا الدليل السريع سيساعدك على فهم كيفية استخدام التطبيق.</p>
              <ul className="list-disc list-inside mt-4">
                <li>أكمل التحدي اليومي لكسب النقاط</li>
                <li>اجمع الشارات وارتقِ في المستويات</li>
                <li>تابع تقدمك وإحصائياتك</li>
                <li>استبدل نقاطك بمكافآت قيمة</li>
              </ul>
              <button
                onClick={() => setShowTutorial(false)}
                className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
              >
                فهمت
              </button>
            </div>
          </div>
        )}

        {/* اقتباس اليوم */}
        <div className="mb-8 text-center">
          <p className="text-xl font-semibold italic">{dailyQuote}</p>
        </div>
        
        {/* التحدي اليومي */}
        {dailyChallenge && (
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8 mb-12 transform hover:scale-102 transition duration-300`}>
            <h2 className={`text-3xl font-semibold mb-6 ${darkMode ? 'text-blue-400' : 'text-indigo-600'}`}>{dailyChallenge.title}</h2>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-8 text-lg`}>{dailyChallenge.description}</p>
            <div className="flex items-center justify-between">
              <button
                onClick={completeChallenge}
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:from-green-500 hover:to-blue-600 transition duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              >
                أكملت التحدي
              </button>
              <button
                onClick={() => setShowTip(!showTip)}
                className={`${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50`}
              >
                💡
              </button>
            </div>
            {showTip && (
              <div className={`mt-4 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{dailyChallenge.tip}</p>
              </div>
            )}
          </div>
        )}

        {/* رسالة التحفيز */}
        {showMotivation && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white p-6 rounded-lg shadow-lg animate-bounce z-50">
            <p className="text-xl font-bold">أحسنت! 🎉</p>
            <p>لقد حصلت على شارة جديدة!</p>
          </div>
        )}

        {/* تأثير الكونفيتي */}
        {showConfetti && (
          <div className="fixed inset-0 z-50 pointer-events-none">
            {/* تم تنفيذ الكونفيتي في دالة completeChallenge */}
          </div>
        )}

        {/* شريط التقدم */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8 mb-12`}>
          <h3 className={`text-2xl font-semibold mb-6 ${darkMode ? 'text-blue-400' : 'text-indigo-600'}`}>تقدمك</h3>
          <div className="flex items-center mb-6">
            <div className="w-full bg-gray-200 rounded-full h-4 ml-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-400 to-purple-500 h-4 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(userProgress / nextBadge.threshold) * 100}%` }}
              ></div>
            </div>
            <span className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} min-w-[80px] text-left`}>
              {userProgress}/{nextBadge.threshold}
            </span>
          </div>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-lg`}>
            أنت على بعد {nextBadge.threshold - userProgress} تحديات من الحصول على شارة "{nextBadge.name}" {nextBadge.icon}
          </p>
        </div>

        {/* الإحصائيات */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8 mb-12`}>
          <h3 className={`text-2xl font-semibold mb-6 ${darkMode ? 'text-blue-400' : 'text-indigo-600'}`}>إحصائياتك</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-blue-100 to-blue-200'} p-6 rounded-lg text-center shadow-inner`}>
              <p className={`text-4xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{userProgress}</p>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mt-2`}>التحديات المكتملة</p>
            </div>
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-purple-100 to-purple-200'} p-6 rounded-lg text-center shadow-inner`}>
              <p className={`text-4xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>{earnedBadges.length}</p>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mt-2`}>الشارات المكتسبة</p>
            </div>
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-pink-100 to-pink-200'} p-6 rounded-lg text-center shadow-inner`}>
              <p className={`text-4xl font-bold ${darkMode ? 'text-pink-400' : 'text-pink-600'}`}>{streak}</p>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mt-2`}>أيام متتالية</p>
            </div>
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-green-100 to-green-200'} p-6 rounded-lg text-center shadow-inner`}>
              <p className={`text-4xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>{points}</p>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mt-2`}>النقاط</p>
            </div>
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-yellow-100 to-yellow-200'} p-6 rounded-lg text-center shadow-inner`}>
              <p className={`text-4xl font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>{level}</p>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mt-2`}>المستوى</p>
            </div>
          </div>
        </div>

        {/* الشارات */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8 mb-12`}>
          <h3 className={`text-2xl font-semibold mb-6 ${darkMode ? 'text-blue-400' : 'text-indigo-600'}`}>الشارات</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {badges.map(badge => (
              <Tooltip
                key={badge.id}
                title={`${badge.name}: اكمل ${badge.threshold} تحدي للحصول على هذه الشارة`}
              >
                <div 
                  className={`
                    flex flex-col items-center
                    transform transition duration-500 ease-in-out
                    ${earnedBadges.includes(badge) ? 'hover:scale-110' : 'hover:scale-105'}
                  `}
                >
                  <div className="relative w-32 h-32">
                    <CircularProgressbar
                      value={(userProgress / badge.threshold) * 100}
                      strokeWidth={8}
                      styles={buildStyles({
                        pathColor: earnedBadges.includes(badge) ? '#10B981' : '#60A5FA',
                        trailColor: darkMode ? '#374151' : '#E5E7EB',
                      })}
                    />
                    <div 
                      className={`
                        absolute inset-0 flex items-center justify-center
                        w-28 h-28 m-2 rounded-full
                        bg-gradient-to-br ${badge.color}
                        transform transition-all duration-500
                        ${earnedBadges.includes(badge) 
                          ? 'scale-110 rotate-12 hover:rotate-0 animate-pulse' 
                          : 'opacity-50 grayscale hover:grayscale-0 hover:opacity-80'}
                      `}
                    >
                      <span className="text-5xl">{badge.icon}</span>
                    </div>
                  </div>
                  <p className={`mt-4 font-semibold text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{badge.name}</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{badge.threshold} تحدي</p>
                  {earnedBadges.includes(badge) && (
                    <span className="mt-2 text-green-500 text-sm font-semibold">تم الحصول عليها ✅</span>
                  )}
                </div>
              </Tooltip>
            ))}
          </div>
        </div>

        {/* نظام المكافآت */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8 mb-12`}>
          <h3 className={`text-2xl font-semibold mb-6 ${darkMode ? 'text-blue-400' : 'text-indigo-600'}`}>المكافآت المتاحة</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {availableRewards.map(reward => (
              <div key={reward.id} className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} p-6 rounded-lg text-center`}>
                <p className="text-4xl mb-2">{reward.icon}</p>
                <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{reward.name}</p>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{reward.points} نقطة</p>
                <button
                  onClick={() => claimReward(reward)}
                  className={`${points >= reward.points ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'} text-white px-4 py-2 rounded transition duration-300`}
                  disabled={points < reward.points}
                >
                  استبدال
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* شارة جديدة */}
        {newBadge && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg text-center animate-bounce">
              <h3 className="text-2xl font-bold mb-4">شارة جديدة!</h3>
              <div className="w-32 h-32 mx-auto mb-4">
                <span className="text-6xl">{newBadge.icon}</span>
              </div>
              <p className="text-xl font-semibold">{newBadge.name}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}