"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Howl } from 'howler';
import QuantumConnection from './QuantumConnection';
import InfoPanel from './InfoPanel';
import QuantumNode from './QuantumNode';
import { categories } from './data';
import Header from '@/components/Header';

const sounds = {
  click: new Howl({ src: ['/sounds/click.mp3'] }),
  hover: new Howl({ src: ['/sounds/hover.mp3'] }),
  background: new Howl({ 
    src: ['/sounds/background.mp3'],
    loop: true,
    volume: 0.5
  })
};

const categoryData = {
    name: "اسم الفئة",
    description: "وصف الفئة باللغة العربية",
    keyAspects: [
      { title: "الجانب الرئيسي الأول", description: "وصف تفصيلي للجانب الأول باللغة العربية" },
      { title: "الجانب الرئيسي الثاني", description: "شرح للميزة الثانية الهامة باللغة العربية" },
    ]
  };

const ParaQuantumRealm = () => {
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    sounds.background.play();
    return () => sounds.background.stop();
  }, []);

  useEffect(() => {
    const newNodes = categories.map((cat, index) => ({
      ...cat,
      x: 20 + (index * 20),
      y: 50 + (Math.random() - 0.5) * 30,
    }));
    setNodes(newNodes);

    const newConnections = [];
    for (let i = 0; i < newNodes.length; i++) {
      for (let j = i + 1; j < newNodes.length; j++) {
        newConnections.push({
          start: newNodes[i],
          end: newNodes[j],
          color: newNodes[i].color,
        });
      }
    }
    setConnections(newConnections);

    setupCanvas();
  }, []);

  const setupCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`,
        velocity: { x: (Math.random() - 0.5) * 0.5, y: (Math.random() - 0.5) * 0.5 },
      });
    }

    let mouseX = 0, mouseY = 0;
    canvas.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        
        const activeColor = activeCategory ? 
          categories.find(cat => cat.name === activeCategory)?.color : 
          '#ffffff';
        particle.color = activeColor;
        
        ctx.fillStyle = particle.color;
        ctx.fill();

        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          particle.x -= dx * 0.05;
          particle.y -= dy * 0.05;
        }

        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;

        if (particle.x < 0 || particle.x > canvas.width) particle.velocity.x *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.velocity.y *= -1;
      });
      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  };

  const handleNodeClick = (name) => {
    sounds.click.play();
    setActiveCategory(name === activeCategory ? null : name);
  };

  return (
    <>
    <Header/>
    <div className="relative w-full h-screen bg-gray-900 overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

      {connections.map((conn, index) => (
        <QuantumConnection 
          key={index} 
          {...conn} 
          isActive={conn.start.name === activeCategory || conn.end.name === activeCategory}
        />
      ))}

      {nodes.map((node) => (
        <QuantumNode
          key={node.name}
          {...node}
          isActive={node.name === activeCategory}
          onNodeClick={handleNodeClick}
        />
      ))}

      <AnimatePresence>
        {activeCategory && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-90 text-white p-8"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <InfoPanel 
              category={categories.find(cat => cat.name === activeCategory)}
              onClose={() => setActiveCategory(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
};

export default ParaQuantumRealm;