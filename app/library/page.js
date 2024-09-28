// ./app/library/page.js
"use client";

import React, { useState, useEffect } from 'react';
import { FaSearch, FaSort, FaBook, FaEdit, FaTrash, FaPlus, FaClock, FaStar, FaQuoteRight, FaList, FaThLarge } from 'react-icons/fa';

function Library() {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: 'الهدوء : قوة الانطوائيين في عالم لا يمكنه التوقف عن الكلام',
      author: 'سوزان كاين',
      category: 'تطوير الذات',
      pages: 320,
      rating: 4.5,
      progress: 250,
      status: 'قيد القراءة',
      startDate: '2024-06-01',
      favoriteQuote: 'الهدوء هو مصدر قوة غير متوقع'
    },
    {
      id: 2,
      title: 'أول 20 ساعة',
      author: 'جوش كاوفمان',
      category: 'تطوير الذات',
      pages: 240,
      rating: 4.2,
      progress: 240,
      status: 'تمت قرائته',
      startDate: '2024-05-15',
      endDate: '2024-06-10',
      favoriteQuote: 'التعلم السريع يبدأ بالتركيز والممارسة'
    },
    {
      id: 3,
      title: 'فقط انصت',
      author: 'مارك جولستون',
      category: 'تطوير الذات',
      pages: 280,
      rating: 4.7,
      progress: 140,
      status: 'قادم',
      favoriteQuote: 'الإنصات الفعال هو مفتاح التواصل الناجح'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

  const statusIcons = {
    'قيد القراءة': '📘',
    'تمت قرائته': '✅',
    'قادم': '⏳',
  };

  useEffect(() => {
    const savedBooks = localStorage.getItem('books');
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedBooks = [...books].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredBooks = sortedBooks.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditBook = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleDeleteBook = (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الكتاب؟')) {
      setBooks(books.filter(book => book.id !== id));
    }
  };

  const handleAddBook = () => {
    setSelectedBook(null);
    setIsModalOpen(true);
  };

  const handleSaveBook = (book) => {
    if (book.id) {
      setBooks(books.map(b => b.id === book.id ? book : b));
    } else {
      setBooks([...books, { ...book, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  const calculateReadingTime = (pages) => {
    const averageWordsPerPage = 250;
    const averageReadingSpeed = 200; // words per minute
    const totalWords = pages * averageWordsPerPage;
    const readingTimeMinutes = totalWords / averageReadingSpeed;
    return Math.round(readingTimeMinutes / 60); // Convert to hours
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col p-4">
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 bg-gray-800 shadow-2xl rounded-lg">
        <h1 className="text-4xl font-bold mb-8 text-gray-200 text-center">مكتبتي الشخصية</h1>
        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="ابحث عن كتاب..."
              className="bg-gray-700 text-white px-4 py-2 pr-10 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setViewMode('list')}
              className={`mr-2 ${viewMode === 'list' ? 'text-blue-500' : 'text-gray-400'}`}
            >
              <FaList />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`mr-4 ${viewMode === 'grid' ? 'text-blue-500' : 'text-gray-400'}`}
            >
              <FaThLarge />
            </button>
            <button
              onClick={handleAddBook}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <FaPlus className="mr-2" /> إضافة كتاب
            </button>
          </div>
        </div>
        {viewMode === 'list' ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700" dir="rtl">
              <thead>
                <tr className="bg-gray-700">
                  {['title', 'author', 'category', 'pages', 'rating', 'progress', 'status'].map((column) => (
                    <th
                      key={column}
                      className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort(column)}
                    >
                      <div className="flex items-center justify-end">
                        {column === sortColumn && <FaSort className="mr-1" />}
                        {column === 'title' && 'عنوان الكتاب'}
                        {column === 'author' && 'المؤلف'}
                        {column === 'category' && 'التصنيف'}
                        {column === 'pages' && 'عدد الصفحات'}
                        {column === 'rating' && 'التقييم'}
                        {column === 'progress' && 'التقدم'}
                        {column === 'status' && 'الحالة'}
                      </div>
                    </th>
                  ))}
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {filteredBooks.map((book) => (
                  <tr key={book.id} className="hover:bg-gray-700 transition duration-300 ease-in-out">
                    <td className="px-6 py-4 text-gray-200 font-semibold">{book.title}</td>
                    <td className="px-6 py-4 text-gray-400">{book.author}</td>
                    <td className="px-6 py-4 text-gray-400">{book.category}</td>
                    <td className="px-6 py-4 text-gray-400">{book.pages}</td>
                    <td className="px-6 py-4 text-gray-400">
                      <div className="flex items-center">
                        <span className="mr-1">{book.rating}</span>
                        <FaStar className="text-yellow-400" />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${(book.progress / book.pages) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs mt-1 block">{book.progress} من {book.pages} ({((book.progress / book.pages) * 100).toFixed(1)}%)</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                        book.status === 'قيد القراءة' ? 'bg-blue-500 text-blue-100' :
                        book.status === 'تمت قرائته' ? 'bg-green-500 text-green-100' : 
                        'bg-yellow-500 text-yellow-100'
                      }`}>
                        {statusIcons[book.status]} <span className="mr-1">{book.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <button onClick={() => handleEditBook(book)} className="text-blue-400 hover:text-blue-600 mr-3">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDeleteBook(book.id)} className="text-red-400 hover:text-red-600">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredBooks.map((book) => (
              <div key={book.id} className="bg-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300">
                <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
                <p className="text-sm text-gray-400 mb-2">{book.author}</p>
                <p className="text-xs text-gray-500 mb-2">{book.category}</p>
                <div className="flex items-center mb-2">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span>{book.rating}</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(book.progress / book.pages) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-400 mb-2">{book.progress} من {book.pages} صفحة</p>
                <div className="flex justify-between items-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    book.status === 'قيد القراءة' ? 'bg-blue-500 text-blue-100' :
                    book.status === 'تمت قرائته' ? 'bg-green-500 text-green-100' : 
                    'bg-yellow-500 text-yellow-100'
                  }`}>
                    {statusIcons[book.status]} {book.status}
                  </span>
                  <div>
                    <button onClick={() => handleEditBook(book)} className="text-blue-400 hover:text-blue-600 mr-2">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDeleteBook(book.id)} className="text-red-400 hover:text-red-600">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {isModalOpen && (
        <BookModal
          book={selectedBook}
          onSave={handleSaveBook}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

function BookModal({ book, onSave, onClose }) {
  const [formData, setFormData] = useState(book || {
    title: '',
    author: '',
    category: '',
    pages: '',
    rating: '',
    progress: '',
    status: '',
    startDate: '',
    endDate: '',
    favoriteQuote: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-gray-800">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-white">{book ? 'تعديل كتاب' : 'إضافة كتاب جديد'}</h3>
          <form className="mt-2 text-right" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="عنوان الكتاب"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 mb-2 text-gray-800 rounded-md"
              required
            />
            <input
              type="text"
              name="author"
              placeholder="المؤلف"
              value={formData.author}
              onChange={handleChange}
              className="w-full p-2 mb-2 text-gray-800 rounded-md"
              required
            />
            <input
              type="text"
              name="category"
              placeholder="التصنيف"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 mb-2 text-gray-800 rounded-md"
              required
            />
            <input
              type="number"
              name="pages"
              placeholder="عدد الصفحات"
              value={formData.pages}
              onChange={handleChange}
              className="w-full p-2 mb-2 text-gray-800 rounded-md"
              required
            />
            <input
              type="number"
              name="rating"
              placeholder="التقييم"
              value={formData.rating}
              onChange={handleChange}
              className="w-full p-2 mb-2 text-gray-800 rounded-md"
              min="0"
              max="5"
              step="0.1"
              required
            />
            <input
              type="number"
              name="progress"
              placeholder="التقدم (عدد الصفحات المقروءة)"
              value={formData.progress}
              onChange={handleChange}
              className="w-full p-2 mb-2 text-gray-800 rounded-md"
              required
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 mb-2 text-gray-800 rounded-md"
              required
            >
              <option value="">اختر الحالة</option>
              <option value="قيد القراءة">قيد القراءة</option>
              <option value="تمت قرائته">تمت قرائته</option>
              <option value="قادم">قادم</option>
            </select>
            <input
              type="date"
              name="startDate"
              placeholder="تاريخ البدء"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-2 mb-2 text-gray-800 rounded-md"
            />
            {formData.status === 'تمت قرائته' && (
              <input
                type="date"
                name="endDate"
                placeholder="تاريخ الانتهاء"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full p-2 mb-2 text-gray-800 rounded-md"
              />
            )}
            <textarea
              name="favoriteQuote"
              placeholder="اقتباس مفضل"
              value={formData.favoriteQuote}
              onChange={handleChange}
              className="w-full p-2 mb-2 text-gray-800 rounded-md"
              rows="3"
            ></textarea>
            <div className="items-center px-4 py-3">
              <button
                id="ok-btn"
                className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                type="submit"
              >
                حفظ
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Library;