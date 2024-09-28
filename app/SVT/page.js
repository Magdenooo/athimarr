"use client"

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(true);
  const canvasRef = useRef(null);

  const contactInfo = [
    { icon: '📞', title: 'الهاتف', content: '+966 12 345 6789' },
    { icon: '✉️', title: 'البريد الإلكتروني', content: 'info@cvt-security.com' },
    { icon: '🏢', title: 'العنوان', content: 'الرياض، المملكة العربية السعودية' },
  ];

  useEffect(() => {
    if (!isAnimationEnabled) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let nodes = [];
    let edges = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNodes();
    };

    const initNodes = () => {
      nodes = [];
      edges = [];
      const nodeCount = Math.floor(canvas.width * canvas.height / 15000);
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          vx: Math.random() * 0.5 - 0.25,
          vy: Math.random() * 0.5 - 0.25,
        });
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (Math.random() > 0.99) {
            edges.push([i, j]);
          }
        }
      }
    };

    const drawNode = (node) => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(76, 175, 80, 0.6)';
      ctx.fill();
    };

    const drawEdge = (edge) => {
      const startNode = nodes[edge[0]];
      const endNode = nodes[edge[1]];
      ctx.beginPath();
      ctx.moveTo(startNode.x, startNode.y);
      ctx.lineTo(endNode.x, endNode.y);
      ctx.strokeStyle = 'rgba(76, 175, 80, 0.2)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        
        drawNode(node);
      });
      
      edges.forEach(drawEdge);

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isAnimationEnabled]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
      {isAnimationEnabled && <canvas ref={canvasRef} className="absolute inset-0" />}
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-4 py-12">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-6 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-300">
            تواصل معنا
          </span>
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl mb-10 text-center max-w-2xl text-gray-300"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          نحن هنا لمساعدتك. تواصل معنا لأي استفسارات أو لطلب خدماتنا
        </motion.p>

        <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8">
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">الاسم</label>
                <input type="text" id="name" name="name" className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">البريد الإلكتروني</label>
                <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">الرسالة</label>
                <textarea id="message" name="message" rows="4" className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"></textarea>
              </div>
              <div>
                <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
                  إرسال
                </button>
              </div>
            </form>
          </motion.div>

          <motion.div 
            className="flex-1 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {contactInfo.map((info, index) => (
              <div key={index} className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="text-4xl">{info.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-green-300">{info.title}</h3>
                  <p className="text-gray-300">{info.content}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;