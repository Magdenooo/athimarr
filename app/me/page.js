"use client"
import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaDownload, FaCode, FaProjectDiagram, FaUser, FaMoon, FaSun } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeBlock = ({ code, language, isDarkTheme }) => (
  <SyntaxHighlighter
    language={language}
    style={isDarkTheme ? atomOneDark : atomOneLight}
    showLineNumbers={true}
    wrapLines={true}
    customStyle={{
      backgroundColor: 'transparent',
      padding: '1em',
      borderRadius: '0.5em',
      fontSize: '0.9em',
    }}
  >
    {code}
  </SyntaxHighlighter>
);

const SkillBar = ({ skill, level }) => (
  <div className="mb-2">
    <div className="flex justify-between mb-1">
      <span>{skill}</span>
      <span>{level}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${level}%` }}></div>
    </div>
  </div>
);

const ProjectCard = ({ project, isDarkTheme }) => (
  <motion.div 
    className={`${isDarkTheme ? 'bg-gray-800' : 'bg-white'} shadow-md rounded-lg overflow-hidden`}
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    <img src={project.image} alt={project.name} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className={`font-bold text-xl mb-2 ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>{project.name}</h3>
      <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} text-base`}>{project.description}</p>
      <div className="mt-4 flex space-x-2">
        {project.tech.map((tech, index) => (
          <span key={index} className={`text-xs px-2 py-1 rounded ${isDarkTheme ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-4">
        <a href={project.link} className="text-blue-500 hover:underline">مشاهدة المشروع</a>
      </div>
    </div>
  </motion.div>
);

const TabContent = ({ content, isVisible, isDarkTheme }) => {
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    if (isVisible && content.code) {
      setLines(content.code.split('\n'));
      setCurrentLine(0);
    }
  }, [content, isVisible]);

  useEffect(() => {
    if (currentLine < lines.length) {
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [currentLine, lines]);

  if (content.type === 'code') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="overflow-auto h-[60vh] p-4"
      >
        <CodeBlock
          code={lines.slice(0, currentLine).join('\n')}
          language={content.language}
          isDarkTheme={isDarkTheme}
        />
        {content.explanation && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`mt-4 p-4 ${isDarkTheme ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-800'} rounded-lg shadow-lg`}
          >
            <h3 className="text-lg font-semibold mb-2">شرح:</h3>
            <p>{content.explanation}</p>
          </motion.div>
        )}
      </motion.div>
    );
  } else if (content.type === 'skills') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="overflow-auto h-[60vh] p-4"
      >
        {Object.entries(content.skills).map(([category, skills]) => (
          <div key={category} className="mb-6">
            <h3 className={`text-lg font-semibold mb-2 ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>{category}</h3>
            {skills.map((skill, index) => (
              <SkillBar key={index} skill={skill.name} level={skill.level} />
            ))}
          </div>
        ))}
      </motion.div>
    );
  } else if (content.type === 'projects') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="overflow-auto h-[60vh] p-4 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {content.projects.map((project, index) => (
          <ProjectCard key={index} project={project} isDarkTheme={isDarkTheme} />
        ))}
      </motion.div>
    );
  }

  return null;
};

const ThemeToggle = ({ isDark, toggleTheme }) => (
  <motion.button
    className={`p-2 rounded-full ${isDark ? 'bg-yellow-400' : 'bg-blue-600'}`}
    onClick={toggleTheme}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    {isDark ? <FaSun className="text-gray-800" /> : <FaMoon className="text-white" />}
  </motion.button>
);

export default function Hero() {
  const [selectedTab, setSelectedTab] = useState('about');
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);

  const tabContent = {
    about: {
      type: 'code',
      code: `
class MagdiAtef extends Developer {
  constructor() {
    this.name = "مجدي عاطف زهران";
    this.title = "مطور ويب Full Stack";
    this.experience = 5; // سنوات
    this.passion = "بناء تطبيقات ويب مبتكرة";
    this.hobbies = [
      "قراءة الكتب التقنية",
      "التصوير الفوتوغرافي",
      "العزف على الجيتار"
    ];
  }

  introduce() {
    return \`مرحبًا! أنا \${this.name},
\${this.title} بخبرة \${this.experience} سنوات.
شغفي هو \${this.passion}.
في وقت فراغي، أستمتع بـ \${this.hobbies.join(", ")}\`;
  }

  getSkills() {
    return {
      frontend: ["React", "Next.js", "Vue.js"],
      backend: ["Node.js", "Express", "Django"],
      databases: ["MongoDB", "PostgreSQL", "Redis"],
      other: ["Docker", "AWS", "GraphQL"]
    };
  }
}

const magdi = new MagdiAtef();
console.log(magdi.introduce());
console.log("المهارات:", JSON.stringify(magdi.getSkills(), null, 2));
      `,
      language: 'javascript',
      explanation: 'هذا الكود يُعرّف فئة `MagdiAtef` التي تمثل ملف تعريف المطور. يتضمن معلومات شخصية ومهنية، بالإضافة إلى دالة `introduce()` التي تقدم نبذة مختصرة، ودالة `getSkills()` التي تعرض المهارات التقنية.'
    },
    skills: {
      type: 'skills',
      skills: {
        frontend: [
          { name: "React", level: 90 },
          { name: "Next.js", level: 85 },
          { name: "Vue.js", level: 80 },
          { name: "Tailwind CSS", level: 85 },
          { name: "TypeScript", level: 80 },
        ],
        backend: [
          { name: "Node.js", level: 85 },
          { name: "Express", level: 80 },
          { name: "Django", level: 75 },
          { name: "FastAPI", level: 70 },
          { name: "GraphQL", level: 75 },
        ],
        databases: [
          { name: "MongoDB", level: 85 },
          { name: "PostgreSQL", level: 80 },
          { name: "Redis", level: 75 },
          { name: "Firebase", level: 70 },
        ],
        cloud: [
          { name: "AWS", level: 75 },
          { name: "Google Cloud", level: 70 },
          { name: "Azure", level: 65 },
        ],
        other: [
          { name: "Docker", level: 80 },
          { name: "Kubernetes", level: 70 },
          { name: "CI/CD", level: 75 },
          { name: "Jest", level: 80 },
        ],
      }
    },
    projects: {
      type: 'projects',
      projects: [
        {
          name: "نظام إدارة المهام الذكي",
          tech: ["React", "Node.js", "MongoDB", "Machine Learning"],
          description: "تطبيق ويب لإدارة المهام مع ميزات الذكاء الاصطناعي لتحسين الإنتاجية",
          link: "https://smart-task-manager.com",
          image: "https://via.placeholder.com/300x200?text=Smart+Task+Manager"
        },
        {
          name: "منصة التعلم التفاعلي",
          tech: ["Vue.js", "Django", "PostgreSQL", "WebRTC"],
          description: "منصة تعليمية مع دورات فيديو تفاعلية ومنتديات نقاش في الوقت الفعلي",
          link: "https://interactive-learning-platform.com",
          image: "https://via.placeholder.com/300x200?text=Interactive+Learning+Platform"
        },
        {
          name: "محفظة العملات الرقمية",
          tech: ["React Native", "Blockchain", "Cryptography"],
          description: "تطبيق جوال آمن لإدارة وتداول العملات الرقمية",
          link: "https://crypto-wallet-app.com",
          image: "https://via.placeholder.com/300x200?text=Crypto+Wallet+App"
        }
      ]
    }
  };

  const tabIcons = {
    about: FaUser,
    skills: FaCode,
    projects: FaProjectDiagram
  };

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-100'} flex items-center justify-center p-4 transition-colors duration-300`}>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]" aria-hidden="true">
          <defs>
            <pattern id="e813992c-7d03-4cc4-a2bd-151760b470a0" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y="-1" className="overflow-visible fill-gray-50">
            <path d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z" strokeWidth="0" />
          </svg>
          <rect width="100%" height="100%" strokeWidth="0" fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
        </svg>
      </div>
      <motion.div
        className={`w-full max-w-4xl ${isDarkTheme ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-2xl overflow-hidden`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={`p-4 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'} text-gray-300 flex justify-between items-center`}>
          <div className="flex space-x-2">
            <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-red-500"></motion.div>
            <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-yellow-500"></motion.div>
            <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-green-500"></motion.div>
          </div>
          <span className={`text-sm font-mono ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>magdi-atef-portfolio.js</span>
          <ThemeToggle isDark={isDarkTheme} toggleTheme={toggleTheme} />
        </div>
        <div className="flex justify-center my-4">
          <img src="/avatar.jpg" alt="Magdi Atef" className="w-32 h-32 rounded-full border-4 border-green-500" />
        </div>
        <div className="flex border-b border-gray-700">
          {Object.keys(tabContent).map(tab => {
            const Icon = tabIcons[tab];
            return (
              <motion.button
                key={tab}
                className={`px-4 py-2 font-mono text-sm flex items-center ${
                  selectedTab === tab 
                    ? isDarkTheme ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-800'
                    : isDarkTheme ? 'text-gray-400 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                }`}
                onClick={() => setSelectedTab(tab)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="mr-2" />
                {tab}.js
              </motion.button>
            );
          })}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TabContent content={tabContent[selectedTab]} isVisible={true} isDarkTheme={isDarkTheme} />
          </motion.div>
        </AnimatePresence>
        <motion.div
          className={`p-4 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'} flex justify-between items-center`}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="flex space-x-6">
            {[FaGithub, FaLinkedin, FaTwitter, FaEnvelope].map((Icon, index) => (
              <motion.a
                key={index}
                href="#"
                className={`${isDarkTheme ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'} transition-colors duration-200`}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon size={24} />
              </motion.a>
            ))}
          </div>
          <motion.button
            className={`flex items-center space-x-2 px-4 py-2 rounded ${
              isDarkTheme ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
            } text-white font-semibold transition-colors duration-200`}
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(255,255,255)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
          >
            <FaDownload />
            <span>تحميل السيرة الذاتية</span>
          </motion.button>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} p-6 rounded-lg shadow-xl`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h2 className="text-2xl font-bold mb-4">تحميل السيرة الذاتية</h2>
              <p className="mb-4">شكرًا لاهتمامك! سيتم تحميل السيرة الذاتية قريبًا.</p>
              <motion.button
                className={`px-4 py-2 rounded ${
                  isDarkTheme ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
                onClick={() => setShowModal(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                إغلاق
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}