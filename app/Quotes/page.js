"use client"
import React, { useState, useEffect } from 'react';
import { FaQuoteLeft, FaSearch, FaPlusCircle, FaTrash, FaEdit, FaStar } from 'react-icons/fa';

function Quotes() {
  const [newQuoteText, setNewQuoteText] = useState('');
  const [newQuoteAuthor, setNewQuoteAuthor] = useState('');
  const [newQuoteCategory, setNewQuoteCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [editingQuote, setEditingQuote] = useState(null);
  const [quotes, setQuotes] = useState([
    // ... (الاقتباسات الأصلية)
  ]);

  const [showModal, setShowModal] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const savedQuotes = localStorage.getItem('quotes');
    if (savedQuotes) {
      setQuotes(JSON.parse(savedQuotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }, [quotes]);

  const handleAddQuote = () => {
    if (!newQuoteText.trim() || !newQuoteAuthor.trim() || !newQuoteCategory.trim()) {
      alert('يرجى ملء جميع الحقول لإضافة اقتباس جديد.');
      return;
    }

    const newQuote = {
      id: quotes.length + 1,
      text: newQuoteText,
      author: newQuoteAuthor,
      category: newQuoteCategory,
      favorite: false
    };

    setQuotes([...quotes, newQuote]);
    setNewQuoteText('');
    setNewQuoteAuthor('');
    setNewQuoteCategory('');
    setShowModal(false);
  };

  const handleDeleteQuote = (quoteId) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الاقتباس؟')) {
      const updatedQuotes = quotes.filter((quote) => quote.id !== quoteId);
      setQuotes(updatedQuotes);
    }
  };

  const handleEditQuote = (quote) => {
    setEditingQuote(quote);
    setNewQuoteText(quote.text);
    setNewQuoteAuthor(quote.author);
    setNewQuoteCategory(quote.category);
    setShowModal(true);
  };

  const handleUpdateQuote = () => {
    const updatedQuotes = quotes.map((quote) => {
      if (quote.id === editingQuote.id) {
        return {
          ...quote,
          text: newQuoteText,
          author: newQuoteAuthor,
          category: newQuoteCategory
        };
      }
      return quote;
    });

    setQuotes(updatedQuotes);
    setEditingQuote(null);
    setShowModal(false);
  };

  const handleToggleFavorite = (quoteId) => {
    const updatedQuotes = quotes.map((quote) => {
      if (quote.id === quoteId) {
        return { ...quote, favorite: !quote.favorite };
      }
      return quote;
    });
    setQuotes(updatedQuotes);
  };

  const filteredQuotes = quotes.filter((quote) =>
    (quote.category.toLowerCase().includes(filterCategory.toLowerCase()) || filterCategory === '') &&
    (quote.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
     quote.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
     quote.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const categories = [...new Set(quotes.map((quote) => quote.category))];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} transition-colors duration-300`}>
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-center flex items-center">
            <FaQuoteLeft className="mr-2" />
            اقتباسات ملهمة
          </h1>
          <button
            className={`p-2 rounded-full ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-700 text-white'}`}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
        
        <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
          <div className="flex-grow">
            <div className="relative">
              <input
                type="text"
                className={`w-full rounded-lg p-2 pr-10 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-900'}`}
                placeholder="ابحث عن اقتباس..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>
          <select
            className={`rounded-lg p-2 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-900'}`}
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">جميع التصنيفات</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center"
            onClick={() => {
              setEditingQuote(null);
              setShowModal(true);
            }}
          >
            <FaPlusCircle className="mr-2" />
            إضافة اقتباس جديد
          </button>
        </div>
        
        <div className={`rounded-lg p-4 overflow-y-auto max-h-[calc(100vh-300px)] ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {filteredQuotes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredQuotes.map((quote) => (
                <div key={quote.id} className={`rounded-lg p-4 mb-4 border-l-4 border-yellow-500 relative ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <p className={`text-lg font-medium mb-2 italic ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>"{quote.text}"</p>
                  <p className={`font-semibold text-right ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>- {quote.author}</p>
                  <p className={`text-right ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{quote.category}</p>
                  <div className="flex justify-end mt-2">
                    <button
                      className="text-red-500 hover:text-red-600 mr-2"
                      onClick={() => handleDeleteQuote(quote.id)}
                    >
                      <FaTrash />
                    </button>
                    <button
                      className="text-yellow-500 hover:text-yellow-600 mr-2"
                      onClick={() => handleEditQuote(quote)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className={`${quote.favorite ? 'text-yellow-400' : 'text-gray-400'} hover:text-yellow-500`}
                      onClick={() => handleToggleFavorite(quote.id)}
                    >
                      <FaStar />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>لا توجد اقتباسات تطابق بحثك الحالي.</p>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`rounded-lg p-6 w-11/12 md:w-1/2 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-2xl font-bold mb-4 text-center ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              {editingQuote ? 'تعديل الاقتباس' : 'إضافة اقتباس جديد'}
            </h2>
            <textarea
              className={`w-full rounded-lg p-2 mb-2 ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-900'}`}
              placeholder="اكتب الاقتباس هنا..."
              value={newQuoteText}
              onChange={(e) => setNewQuoteText(e.target.value)}
            />
            <input
              type="text"
              className={`w-full rounded-lg p-2 mb-2 ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-900'}`}
              placeholder="اسم الكاتب"
              value={newQuoteAuthor}
              onChange={(e) => setNewQuoteAuthor(e.target.value)}
            />
            <input
              type="text"
              className={`w-full rounded-lg p-2 mb-4 ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-900'}`}
              placeholder="التصنيف"
              value={newQuoteCategory}
              onChange={(e) => setNewQuoteCategory(e.target.value)}
            />
            <div className="flex justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={editingQuote ? handleUpdateQuote : handleAddQuote}
              >
                {editingQuote ? 'تحديث' : 'إضافة'}
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  setShowModal(false);
                  setEditingQuote(null);
                }}
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quotes;