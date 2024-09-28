"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBookOpen, FaClock, FaUser, FaTags, FaSearch } from 'react-icons/fa';
import Header from '@/components/Header';

const ArticlesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['الإنتاجية', 'النمو الشخصي', 'الصحة النفسية', 'التقنية', 'الإبداع'];

  const articles = [
    { id: 1, title: "كيف تزيد إنتاجيتك بنسبة 200% في 30 يومًا", category: "الإنتاجية", author: "أحمد محمد", readTime: 5, tags: ["تنظيم الوقت", "الإنتاجية"] },
    { id: 2, title: "7 عادات يومية للنمو الشخصي", category: "النمو الشخصي", author: "سارة أحمد", readTime: 8, tags: ["تطوير الذات", "العادات"] },
    { id: 3, title: "التأمل: مفتاحك للسلام الداخلي", category: "الصحة النفسية", author: "محمد علي", readTime: 6, tags: ["التأمل", "الاسترخاء"] },
    { id: 4, title: "كيف تستخدم الذكاء الاصطناعي لتحسين حياتك اليومية", category: "التقنية", author: "ليلى خالد", readTime: 10, tags: ["الذكاء الاصطناعي", "التكنولوجيا"] },
    { id: 5, title: "5 تمارين لتحفيز الإبداع", category: "الإبداع", author: "عمر فاروق", readTime: 7, tags: ["الإبداع", "الابتكار"] },
    // يمكنك إضافة المزيد من المقالات هنا
  ];

  const filteredArticles = articles.filter(article => 
    (selectedCategory === 'all' || article.category === selectedCategory) &&
    (article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
     article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return (
    <div>
      <Header/>
      <div className="min-h-screen bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-12"> {/* إضافة تباعد هنا */}
            <motion.h1 
              className="text-4xl font-bold mb-8 text-center"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
            </motion.h1>
          </div>

          <div className="mb-8 flex flex-wrap justify-center gap-4">
            <motion.button
              className={`px-4 py-2 rounded-full ${selectedCategory === 'all' ? 'bg-[#22d3ee] text-gray-900' : 'bg-gray-800'}`}
              onClick={() => setSelectedCategory('all')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              الكل
            </motion.button>
            {categories.map(category => (
              <motion.button
                key={category}
                className={`px-4 py-2 rounded-full ${selectedCategory === category ? 'bg-[#22d3ee] text-gray-900' : 'bg-gray-800'}`}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>

          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث عن مقالات..."
                className="w-full bg-gray-800 text-white border-2 border-gray-700 rounded-full py-2 px-4 pl-10 focus:outline-none focus:border-[#22d3ee]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AnimatePresence>
              {filteredArticles.map(article => (
                <motion.div
                  key={article.id}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                    <div className="flex items-center text-gray-400 text-sm mb-4">
                      <FaUser className="mr-2" />
                      <span>{article.author}</span>
                      <FaClock className="mr-4 ml-2" />
                      <span>{article.readTime} دقائق للقراءة</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.map(tag => (
                        <span key={tag} className="bg-gray-700 text-[#22d3ee] text-xs px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#22d3ee]">{article.category}</span>
                      <motion.button
                        className="flex items-center text-white bg-[#22d3ee] px-4 py-2 rounded-full"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaBookOpen className="mr-2" />
                        اقرأ المقال
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredArticles.length === 0 && (
            <motion.p
              className="text-center text-gray-400 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              لم يتم العثور على مقالات مطابقة لبحثك. جرب كلمات مفتاحية مختلفة.
            </motion.p>
          )}
        </div>
      </div>
    </div>

  );
};

export default ArticlesPage;
