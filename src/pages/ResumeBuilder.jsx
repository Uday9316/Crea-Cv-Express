import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const ResumeBuilder = () => {
  const fadeIn = useAnimation();

  useEffect(() => {
    const animatePage = async () => {
      await fadeIn.start({ opacity: 1, y: 0 });
    };

    animatePage();
  }, [fadeIn]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={fadeIn}
      className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-#12372A via-#436850 to-#ADBC9F text-black"
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Resume Builder App</h1>
        <p className="text-lg mb-8">
          <span className="text-yellow-400">Exciting News!</span> Our Mobile App is Coming Soon.
        </p>
        <p className="text-base">
          Stay tuned for the launch of our mobile app, bringing the resume building experience to your fingertips.
        </p>
      </div>
    </motion.div>
  );
};

export default ResumeBuilder;
