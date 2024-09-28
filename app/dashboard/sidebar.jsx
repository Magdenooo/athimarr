"use client"

import React, { useState } from 'react';
import { Home, BarChart2, Users, Settings, Target, CheckSquare, BookOpen, Quote, Book, Heart, ChevronDown, ChevronRight } from 'lucide-react';
import { CSSTransition } from 'react-transition-group';
import './Sidebar.css'; // تأكد من إضافة CSS للأنميشن
import Link from "next/link"

const Sidebar = () => {
  const [isOrganizeOpen, setOrganizeOpen] = useState(false);

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4 text-right" dir="rtl">
      <div className="text-2xl font-bold mb-8">لوحة التحكم</div>
      <nav>
        <ul className="space-y-2">
          <li>
            <a href="#" className="flex items-center p-2 hover:bg-gray-800 rounded transition duration-300 transform hover:scale-105">
              <Home size={20} className="ml-2" />
              <span>الرئيسية</span>
            </a>
          </li>
          <li>
            <button 
              onClick={() => setOrganizeOpen(!isOrganizeOpen)} 
              className="flex items-center p-2 hover:bg-gray-800 rounded w-full text-left transition duration-300 transform hover:scale-105"
            >
              <span>نظم حياتك</span>
              {isOrganizeOpen ? <ChevronDown size={20} className="ml-2" /> : <ChevronRight size={20} className="ml-2" />}
            </button>
            <CSSTransition in={isOrganizeOpen} timeout={300} classNames="toggle" unmountOnExit>
              <ul className={`pl-8 space-y-2 bg-gray-800 rounded-lg p-2`}>
                <li>
                <Link legacyBehavior href="/TaskManager">
                  <a href="#" className="flex items-center p-2 hover:bg-gray-700 rounded transition duration-300 transform hover:scale-105">
                    <CheckSquare size={20} className="ml-2" />
                    <span>مدير المهام</span>
                  </a>
                  </Link>

                </li>
                <li>
                  <a href="#" className="flex items-center p-2 hover:bg-gray-700 rounded transition duration-300 transform hover:scale-105">
                    <Users size={20} className="ml-2" />
                    <span>المشاريع</span>
                  </a>
                </li>
             
                <li>
                <Link legacyBehavior href="/Goal">
                  <a href="#" className="flex items-center p-2 hover:bg-gray-700 rounded transition duration-300 transform hover:scale-105">
                    <Target size={20} className="ml-2" />
                    <span>الأهداف</span>
                  </a>
                  </Link>
                </li>
                <li>
                <Link legacyBehavior href="/Aspectsoflife">

                  <a href="#" className="flex items-center p-2 hover:bg-gray-700 rounded transition duration-300 transform hover:scale-105">
                    <BarChart2 size={20} className="ml-2" />
                    <span>الجوانب الحياتية</span>
                  </a>
                  </Link>
 
                </li>
               
              </ul>
            </CSSTransition>
          </li>


          <li>
            <Link legacyBehavior href="/library">
              <a className="flex items-center p-2 hover:bg-gray-800 rounded transition duration-300 transform hover:scale-105">
                <BookOpen size={20} className="ml-2" />
                <span>المكتبة</span>
              </a>
            </Link>
          </li>
          


          <li>
          <Link legacyBehavior href="/Quotes">
            <a href="#" className="flex items-center p-2 hover:bg-gray-800 rounded transition duration-300 transform hover:scale-105">
              <Quote size={20} className="ml-2" />
              <span>الاقتباسات</span>
            </a>
            </Link>
          </li>
          <li>
          <Link legacyBehavior href="/Journaling">
            <a href="#" className="flex items-center p-2 hover:bg-gray-800 rounded transition duration-300 transform hover:scale-105">
              <Book size={20} className="ml-2" />
              <span>تدوين اليوميات</span>
            </a>
            </Link>
          </li>
          <li>
          <Link legacyBehavior href="/PornRecoveryPlan">

            <a href="#" className="flex items-center p-2 hover:bg-gray-800 rounded transition duration-300 transform hover:scale-105">
              <Heart size={20} className="ml-2" />
              <span>خطة التعافي من الإباحية</span>
            </a>
            </Link>

          </li>
          <li>
          <Link legacyBehavior href="/Settings">

            <a href="#" className="flex items-center p-2 hover:bg-gray-800 rounded transition duration-300 transform hover:scale-105">
              <Settings size={20} className="ml-2" />
              <span>الإعدادات</span>
            </a>
            </Link>

          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
