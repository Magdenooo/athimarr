"use client";

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTachometerAlt, faBars, faInfoCircle, faBookOpen, faPuzzlePiece, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-md py-4 fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-6" dir="rtl">
        <div className="flex items-center space-x-reverse space-x-4">
          {/* <img src="/public/logo.svg" alt="Intaj Logo" className="h-12 w-12 transform hover:rotate-12 transition duration-300" /> */}
          <h1 className="text-3xl font-bold tracking-wide hover:text-gray-400 transition duration-300">اثمار</h1>
        </div>
        <nav className="hidden md:flex items-center space-x-reverse space-x-6 text-lg">
          <ul className="flex space-x-reverse space-x-6">
            <li>
              <Link href="/" legacyBehavior>
                <a className="flex items-center space-x-reverse space-x-2 transition duration-300 ease-in-out hover:text-gray-300">
                  <FontAwesomeIcon icon={faHome} />
                  <span>الرئيسية</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/dashboard" legacyBehavior>
                <a className="flex items-center space-x-reverse space-x-2 transition duration-300 ease-in-out hover:text-gray-300">
                  <FontAwesomeIcon icon={faTachometerAlt} />
                  <span>لوحة التحكم</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/About" legacyBehavior>
                <a className="flex items-center space-x-reverse space-x-2 transition duration-300 ease-in-out hover:text-gray-300">
                  <FontAwesomeIcon icon={faInfoCircle} />
                  <span>من نحن</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/para" legacyBehavior>
                <a className="flex items-center space-x-reverse space-x-2 transition duration-300 ease-in-out hover:text-gray-300">
                  <FontAwesomeIcon icon={faPuzzlePiece} />
                  <span>نظام بارا</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/Blog" legacyBehavior>
                <a className="flex items-center space-x-reverse space-x-2 transition duration-300 ease-in-out hover:text-gray-300">
                  <FontAwesomeIcon icon={faBookOpen} />
                  <span>مقالات</span>
                </a>
              </Link>
            </li>
          </ul>
          <Link href="/login" legacyBehavior>
            <a className="bg-gray-700 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-gray-600">
               ابدأ الانتاجيه
            </a>
          </Link>
        </nav>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu}>
            <FontAwesomeIcon icon={faBars} className="text-2xl" />
          </button>
        </div>
      </div>
      {isOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg py-4"
          dir="rtl"
        >
          <ul className="space-y-4 text-lg text-center">
            <li>
              <Link href="/" legacyBehavior>
                <a className="block py-2 transition duration-300 ease-in-out hover:text-gray-300">
                  <FontAwesomeIcon icon={faHome} className="mr-2" />
                  <span>الرئيسية</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/dashboard" legacyBehavior>
                <a className="block py-2 transition duration-300 ease-in-out hover:text-gray-300">
                  <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
                  <span>لوحة التحكم</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/about" legacyBehavior>
                <a className="block py-2 transition duration-300 ease-in-out hover:text-gray-300">
                  <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                  <span>من نحن</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/Blog" legacyBehavior>
                <a className="block py-2 transition duration-300 ease-in-out hover:text-gray-300">
                  <FontAwesomeIcon icon={faBookOpen} className="mr-2" />
                  <span>المقالات</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/para" legacyBehavior>
                <a className="block py-2 transition duration-300 ease-in-out hover:text-gray-300">
                  <FontAwesomeIcon icon={faPuzzlePiece} className="mr-2" />
                  <span>نظام بارا</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/login" legacyBehavior>
                <a className="bg-gray-700 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-gray-600">
                ابدأ الانتاجيه
                </a>
              </Link>
            </li>
          </ul>
        </motion.nav>
      )}
    </header>
  );
};

export default Header;