"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMoon, FaSun, FaLock, FaUser, FaBell, FaShieldAlt, FaLanguage, FaSave } from 'react-icons/fa';

const Settings = () => {
  const [theme, setTheme] = useState('dark');
  const [activeTab, setActiveTab] = useState('password');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true
  });

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const tabs = [
    { id: 'password', icon: FaLock, label: 'كلمة المرور' },
    { id: 'account', icon: FaUser, label: 'الحساب' },
    { id: 'notifications', icon: FaBell, label: 'الإشعارات' },
    { id: 'security', icon: FaShieldAlt, label: 'الأمان' },
    { id: 'language', icon: FaLanguage, label: 'اللغة' },
  ];

  const TabContent = ({ id, children }) => (
    <AnimatePresence mode="wait">
      {activeTab === id && (
        <motion.div
          key={id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );

  const InputField = ({ label, id, type = 'text', ...props }) => (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
      <input
        type={type}
        id={id}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
        {...props}
      />
    </div>
  );

  const ToggleSwitch = ({ label, checked, onChange }) => (
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
      <button
        className={`relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none ${checked ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}
        onClick={onChange}
      >
        <span
          className={`inline-block w-4 h-4 transform transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'} bg-white rounded-full`}
        />
      </button>
    </div>
  );

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900 text-white'} transition-colors duration-300`}>
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400">الإعدادات</h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <tab.icon className="mr-3" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-3/4">
            <TabContent id="password">
              <h2 className="text-2xl font-semibold mb-6 text-blue-500 dark:text-blue-400">تغيير كلمة المرور</h2>
              <form className="space-y-4">
                <InputField label="كلمة المرور الحالية" id="current-password" type="password" />
                <InputField label="كلمة المرور الجديدة" id="new-password" type="password" />
                <InputField label="تأكيد كلمة المرور" id="confirm-password" type="password" />
                <button type="submit" className="w-full flex justify-center items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                  <FaSave className="mr-2" />
                  حفظ التغييرات
                </button>
              </form>
            </TabContent>

            <TabContent id="account">
              <h2 className="text-2xl font-semibold mb-6 text-blue-500 dark:text-blue-400">إعدادات الحساب</h2>
              <form className="space-y-4">
                <InputField label="البريد الإلكتروني" id="email" type="email" />
                <InputField label="اسم المستخدم" id="username" />
                <InputField label="الاسم الكامل" id="fullname" />
                <InputField label="رقم الهاتف" id="phone" type="tel" />
                <button type="submit" className="w-full flex justify-center items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                  <FaSave className="mr-2" />
                  حفظ التغييرات
                </button>
              </form>
            </TabContent>

            <TabContent id="notifications">
              <h2 className="text-2xl font-semibold mb-6 text-blue-500 dark:text-blue-400">إعدادات الإشعارات</h2>
              <div className="space-y-4">
                <ToggleSwitch label="إشعارات البريد الإلكتروني" checked={notifications.email} onChange={() => handleNotificationChange('email')} />
                <ToggleSwitch label="الإشعارات المنبثقة" checked={notifications.push} onChange={() => handleNotificationChange('push')} />
                <ToggleSwitch label="إشعارات الرسائل النصية" checked={notifications.sms} onChange={() => handleNotificationChange('sms')} />
                <button type="submit" className="w-full flex justifycenter items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                  <FaSave className="mr-2" />
                  حفظ التغييرات
                </button>
              </div>
            </TabContent>

            <TabContent id="security">
              <h2 className="text-2xl font-semibold mb-6 text-blue-500 dark:text-blue-400">إعدادات الأمان</h2>
              <div className="space-y-4">
                <ToggleSwitch label="التحقق بخطوتين" checked={true} onChange={() => {}} />
                <ToggleSwitch label="تسجيل الدخول باستخدام البصمة" checked={false} onChange={() => {}} />
                <InputField label="عنوان IP المسموح به" id="allowed-ip" placeholder="أدخل عنوان IP" />
                <button type="submit" className="w-full flex justify-center items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                  <FaSave className="mr-2" />
                  حفظ التغييرات
                </button>
              </div>
            </TabContent>

            <TabContent id="language">
              <h2 className="text-2xl font-semibold mb-6 text-blue-500 dark:text-blue-400">تفضيلات اللغة</h2>
              <form className="space-y-4">
                <div className="mb-4">
                  <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">اللغة</label>
                  <select id="language" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
                    <option value="ar">العربية</option>
                    <option value="en">الإنجليزية</option>
                    <option value="fr">الفرنسية</option>
                  </select>
                </div>
                <ToggleSwitch label="تفعيل الترجمة التلقائية" checked={false} onChange={() => {}} />
                <button type="submit" className="w-full flex justify-center items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                  <FaSave className="mr-2" />
                  حفظ التغييرات
                </button>
              </form>
            </TabContent>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
