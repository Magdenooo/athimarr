"use client"
import React, { useState, useEffect } from 'react';
import { FaTrash, FaEdit, FaSave, FaTimes, FaMoon, FaSun, FaImage, FaTag, FaSmile, FaSearch, FaCalendarAlt, FaPen } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

function Journaling() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [entries, setEntries] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [mood, setMood] = useState('');
  const [tags, setTags] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [entries, darkMode]);

  const handleAddEntry = () => {
    if (!title.trim() || !content.trim()) {
      alert('الرجاء إدخال عنوان ومحتوى لليومية.');
      return;
    }

    const newEntry = {
      id: Date.now(),
      title: title,
      content: content,
      image: image,
      date: new Date().toLocaleString('ar-EG'),
      mood: mood,
      tags: tags.split(',').map(tag => tag.trim()),
    };

    setEntries([newEntry, ...entries]);
    resetForm();
    setShowForm(false);
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setImage('');
    setMood('');
    setTags('');
  };

  const handleDeleteEntry = (entryId) => {
    if (window.confirm('هل أنت متأكد من حذف هذه اليومية؟')) {
      const updatedEntries = entries.filter((entry) => entry.id !== entryId);
      setEntries(updatedEntries);
    }
  };

  const handleEditEntry = (entryId) => {
    const entryToEdit = entries.find(entry => entry.id === entryId);
    if (entryToEdit) {
      setTitle(entryToEdit.title);
      setContent(entryToEdit.content);
      setImage(entryToEdit.image);
      setMood(entryToEdit.mood);
      setTags(entryToEdit.tags.join(', '));
      setEditingId(entryId);
      setShowForm(true);
    }
  };

  const handleSaveEdit = () => {
    const updatedEntries = entries.map(entry => {
      if (entry.id === editingId) {
        return {
          ...entry,
          title,
          content,
          image,
          mood,
          tags: tags.split(',').map(tag => tag.trim()),
        };
      }
      return entry;
    });
    setEntries(updatedEntries);
    resetForm();
    setEditingId(null);
    setShowForm(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const filteredEntries = entries.filter(entry => {
    if (filter === 'all') return true;
    if (filter === 'mood') return entry.mood === mood;
    if (filter === 'tag') return entry.tags.some(tag => tag.toLowerCase().includes(tags.toLowerCase()));
    return true;
  }).filter(entry =>
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-blue-100 to-white'} transition-colors duration-300`}>
      <div className={`container mx-auto p-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        <div className="flex justify-between items-center mb-8">
          <motion.h1 
            className="text-5xl font-bold font-arabic"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            اليوميات
          </motion.h1>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowForm(!showForm)}
              className={`p-3 rounded-full ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-blue-500 text-white'} shadow-lg`}
            >
              <FaPen size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-full ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-700 text-white'} shadow-lg`}
            >
              {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </motion.button>
          </div>
        </div>
        
        <AnimatePresence>
          {showForm && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-lg`}
            >
              <input
                type="text"
                className={`w-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'} rounded-lg p-4 mb-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="عنوان اليوم"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                className={`w-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'} rounded-lg p-4 mb-4 h-40 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="اكتب يومياتك هنا..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center">
                  <FaSmile className="mr-2 text-xl" />
                  <select
                    className={`w-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'} rounded-lg p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                  >
                    <option value="">اختر مزاجك</option>
                    <option value="سعيد">سعيد</option>
                    <option value="حزين">حزين</option>
                    <option value="متحمس">متحمس</option>
                    <option value="قلق">قلق</option>
                    <option value="هادئ">هادئ</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <FaTag className="mr-2 text-xl" />
                  <input
                    type="text"
                    className={`w-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'} rounded-lg p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="الوسوم (مفصولة بفواصل)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                </div>
                <div className="flex items-center">
                  <FaImage className="mr-2 text-xl" />
                  <input
                    type="file"
                    className={`w-full ${darkMode ? 'text-gray-300' : 'text-gray-800'} text-lg`}
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              {image && (
                <div className="mb-4">
                  <img src={image} alt="صورة اليومية" className="max-w-full h-auto rounded-lg shadow-md" />
                </div>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full ${editingId ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'} text-white font-bold py-4 px-4 rounded-lg transition duration-300 text-lg shadow-lg`}
                onClick={editingId ? handleSaveEdit : handleAddEntry}
              >
                {editingId ? 'حفظ التعديلات' : 'إضافة يومية جديدة'}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="mb-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <select
            className={`w-full md:w-1/3 ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-800'} rounded-lg p-3 shadow-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">جميع اليوميات</option>
            <option value="mood">تصفية حسب المزاج</option>
            <option value="tag">تصفية حسب الوسم</option>
          </select>
          <div className="relative w-full md:w-2/3">
            <input
              type="text"
              className={`w-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-800'} rounded-lg p-4 pr-12 shadow-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="بحث في اليوميات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredEntries.length > 0 ? (
              filteredEntries.map((entry) => (
                <motion.div 
                  key={entry.id} 
                  className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-lg transition duration-300 hover:shadow-xl`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-semibold mb-4">{entry.title}</h2>
                  <p className="mb-4 text-lg">{entry.content}</p>
                  {entry.image && (
                    <img src={entry.image} alt="صورة اليومية" className="w-full h-48 object-cover rounded-lg mb-4 shadow-md" />
                  )}
                  <div className="flex items-center mb-2">
                    <FaCalendarAlt className="mr-2 text-lg" />
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-lg`}>{entry.date}</p>
                  </div>
                  {entry.mood && (
                    <div className="flex items-center mb-2">
                      <FaSmile className="mr-2 text-lg" />
                      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-lg`}>{entry.mood}</p>
                    </div>
                  )}
                  {entry.tags.length > 0 && (
                    <div className="flex items-center mb-4 flex-wrap">
                      <FaTag className="mr-2 text-lg" />
                      {entry.tags.map(tag => (
                        <span key={tag} className={`${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'} px-3 py-1 rounded-full text-sm mr-2 mb-2`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex justify-end space-x-2">
                  <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 shadow-md"
                      onClick={() => handleEditEntry(entry.id)}
                    >
                      <FaEdit size={18} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 shadow-md"
                      onClick={() => handleDeleteEntry(entry.id)}
                    >
                      <FaTrash size={18} />
                    </motion.button>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.p 
                className={`text-center col-span-full ${darkMode ? 'text-gray-400' : 'text-gray-600'} text-xl`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                لا توجد يوميات متطابقة مع البحث.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Journaling;