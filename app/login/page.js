"use client"
import React, { useState } from 'react';
import Sidebar from '../dashboard/sidebar.jsx';
import { CheckSquare, BarChart2, Target, Users, Calendar, Edit, Book, Star, Award, TrendingUp, Zap, ChevronRight, ChevronLeft } from 'lucide-react';
import clsx from 'clsx';

const TabButton = ({ active, onClick, children }) => (
  <button
    className={`px-4 py-2 rounded-full transition-all duration-300 ${
      active ? 'bg-cyan-400 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

const InteractiveCard = ({ title, icon: Icon, content, color }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`bg-white rounded-lg shadow-lg p-6 cursor-pointer transition-all duration-500 transform ${
        isFlipped ? 'rotate-y-180' : ''
      }`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`${isFlipped ? 'hidden' : 'block'}`}>
        <div className={`bg-${color}-100 p-3 rounded-full inline-block mb-4`}>
          <Icon size={32} className={`text-${color}-500`} />
        </div>
        <h3 className={`text-xl font-semibold mb-2 text-${color}-600`}>{title}</h3>
      </div>
      <div className={`${isFlipped ? 'block' : 'hidden'} rotate-y-180`}>
        <p className="text-gray-700">{content}</p>
      </div>
    </div>
  );
};

const DailyChallenge = () => {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Zap size={28} className="mr-2" />
            تحدي اليوم
          </h2>
          <div className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full uppercase animate-pulse">
            جديد
          </div>
        </div>
        <div className="bg-white bg-opacity-20 rounded-lg p-4">
          <h3 className="text-xl font-bold text-white mb-2">قم بممارسة التأمل لمدة 10 دقائق</h3>
          <p className="text-white text-opacity-80 mb-4">أكمل هذا التحدي لتعزيز تركيزك وهدوئك الداخلي.</p>
          <div className="flex justify-between items-center">
            <button
              className={`px-6 py-2 rounded-full transition duration-300 ${
                completed
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-cyan-600 hover:bg-cyan-100'
              }`}
              onClick={() => setCompleted(!completed)}
            >
              {completed ? 'تم الإنجاز!' : 'أكمل التحدي'}
            </button>
            <div className="text-white text-opacity-80">
              <Calendar size={20} className="inline mr-1" />
              <span>متبقي 8 ساعات</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white bg-opacity-10 p-4">
        <p className="text-white text-center">أكمل 5 تحديات متتالية للحصول على شارة خاصة!</p>
      </div>
    </div>
  );
};

const ProgressBar = ({ progress, color = "cyan" }) => (
  <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
    <div 
      className={`bg-${color}-400 h-4 rounded-full transition-all duration-500 ease-out`} 
      style={{ width: `${progress}%` }}
    ></div>
  </div>
);

const FeatureSection = ({ title, children, icon: Icon, color = "cyan" }) => (
  <div className="mt-8">
    <div className="flex items-center mb-4">
      <Icon size={24} className={`text-${color}-500 mr-2`} />
      <h2 className={`text-2xl font-bold text-${color}-700`}>{title}</h2>
    </div>
    <div className={`bg-white rounded-lg shadow-lg p-6 border-t-4 border-${color}-400`}>
      {children}
    </div>
  </div>
);

const BookSection = () => (
  <FeatureSection title="المكتبة" icon={Book} color="cyan">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { title: 'عادات العظماء', author: 'جون دو', color: 'cyan', rating: 4.5, progress: 75 },
        { title: 'قوة العادات', author: 'تشارلز دوهيج', color: 'teal', rating: 4.8, progress: 30 },
        { title: 'العقل المرن', author: 'كارول دويك', color: 'blue', rating: 4.2, progress: 100 },
      ].map((book, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-4 flex flex-col hover:shadow-lg transition duration-300">
          <div className="flex items-center space-x-4 mb-3">
            <div className={`bg-${book.color}-100 p-2 rounded-full`}>
              <Book size={32} className={`text-${book.color}-500`} />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{book.title}</h3>
              <p className="text-sm text-gray-600">المؤلف: {book.author}</p>
            </div>
          </div>
          <div className="flex items-center mb-2">
            <Star size={16} className="text-yellow-500 ml-1" />
            <span>{book.rating}</span>
          </div>
          <ProgressBar progress={book.progress} color={book.color} />
          <p className="text-sm text-right">{book.progress}% مكتمل</p>
        </div>
      ))}
    </div>
    <button className="mt-6 bg-cyan-400 text-white px-6 py-2 rounded-full hover:bg-cyan-500 transition duration-300 w-full">
      استكشف المزيد من الكتب
    </button>
  </FeatureSection>
);

const QuoteSection = () => (
  <FeatureSection title="اقتباسات ملهمة" icon={Award} color="cyan">
    <div className="space-y-4">
      {[
        { text: 'النجاح هو مجموع جهود صغيرة تتكرر يومًا بعد يوم.', author: 'روبرت كولير', color: 'cyan' },
        { text: 'الفشل هو ببساطة فرصة للبدء من جديد، هذه المرة بذكاء أكثر.', author: 'هنري فورد', color: 'teal' },
      ].map((quote, index) => (
        <blockquote key={index} className={`border-r-4 border-${quote.color}-400 pr-4 py-2 bg-${quote.color}-50 rounded-lg`}>
          <p className="italic text-lg">"{quote.text}"</p>
          <footer className="text-right mt-2 text-gray-600">- {quote.author}</footer>
        </blockquote>
      ))}
    </div>
    <button className="mt-6 bg-cyan-400 text-white px-6 py-2 rounded-full hover:bg-cyan-500 transition duration-300 w-full">
      المزيد من الاقتباسات
    </button>
  </FeatureSection>
);

function Page() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabContent = {
    dashboard: (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <InteractiveCard
            title="مدير المهام"
            icon={CheckSquare}
            content="لديك 12 مهمة معلقة. انقر لإدارة مهامك."
            color="cyan"
          />
          <InteractiveCard
            title="الجوانب الحياتية"
            icon={BarChart2}
            content="حسّن 7 جوانب من حياتك. انقر لمعرفة المزيد."
            color="teal"
          />
          <InteractiveCard
            title="الأهداف"
            icon={Target}
            content="5 أهداف قيد التنفيذ. هل أنت على المسار الصحيح؟"
            color="blue"
          />
        </div>
      </>
    ),
    books: <BookSection />,
    quotes: <QuoteSection />,
    achievements: (
      <FeatureSection title="آخر الإنجازات" icon={Award} color="cyan">
        <ul className="space-y-3">
          {[
            'أكملت قراءة كتاب "عادات العظماء"',
            'حققت هدف التأمل لمدة 10 أيام متتالية',
            'أضفت 5 اقتباسات ملهمة جديدة'
          ].map((achievement, index) => (
            <li key={index} className="flex items-center space-x-2 bg-cyan-50 p-3 rounded-lg">
              <CheckSquare size={20} className="text-cyan-500" />
              <span className="text-cyan-700">{achievement}</span>
            </li>
          ))}
        </ul>
      </FeatureSection>
    ),
  };

  return (
    <div className="flex bg-gray-100 min-h-screen" dir="rtl">
      <Sidebar />
      <main className="flex-grow p-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">لوحة التحكم</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-cyan-700">تقدم التعافي</h2>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-cyan-600 bg-cyan-200">
                  التقدم
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-cyan-600">
                  75%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-cyan-200">
              <div style={{ width: "75%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-cyan-500"></div>
            </div>
          </div>
          <p className="text-center text-gray-600">75 يوماً من النجاح! استمر في العمل الجيد.</p>
        </div>

        <DailyChallenge />

        <div className="mt-8 flex space-x-4 mb-6">
          <TabButton active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')}>
            لوحة التحكم
          </TabButton>
          <TabButton active={activeTab === 'books'} onClick={() => setActiveTab('books')}>
            المكتبة
          </TabButton>
          <TabButton active={activeTab === 'quotes'} onClick={() => setActiveTab('quotes')}>
            اقتباسات
          </TabButton>
          <TabButton active={activeTab === 'achievements'} onClick={() => setActiveTab('achievements')}>
            الإنجازات
          </TabButton>
        </div>

        {tabContent[activeTab]}
      </main>
    </div>
  );
}

export default Page;