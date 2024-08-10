import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import r1Image from '../assets/img/r1.png';
import r2Image from '../assets/img/r2.jpg';

const ResumeTemplates = () => {
  const fadeIn = useAnimation();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [visibleTemplates, setVisibleTemplates] = useState(2);

  useEffect(() => {
    const animatePage = async () => {
      await fadeIn.start({ opacity: 1, y: 0 });
    };

    animatePage();
  }, [fadeIn]);

  const templateList = [
    { id: 1, name: 'Classic Template', image: r1Image },
    { id: 2, name: 'Modern Template', image: r2Image },
  ];

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
  };

  const handleTemplateClose = () => {
    setSelectedTemplate(null);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setVisibleTemplates((prevVisible) => Math.min(prevVisible + 2, templateList.length));
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={fadeIn}
      className="flex flex-col items-center h-screen overflow-hidden bg-gradient-to-r from-purple-800 via-blue-600 to-teal-500 text-white"
    >
      <h1 className="text-4xl font-bold mb-6">Resume Templates</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {templateList.slice(0, visibleTemplates).map((template) => (
          <motion.div
            key={template.id}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleTemplateClick(template)}
            className="relative bg-white rounded-lg overflow-hidden shadow-md cursor-pointer h-full"
          >
            <img src={template.image} alt={template.name} className="w-full h-full object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{template.name}</h2>
            </div>
          </motion.div>
        ))}
      </div>
      {selectedTemplate && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center overflow-hidden"
    onClick={handleTemplateClose}
  >
    <img
      src={selectedTemplate.image}
      alt={selectedTemplate.name}
      className="max-w-full max-h-full object-contain"
    />
  </motion.div>
)}



    </motion.div>
  );
};

export default ResumeTemplates;
