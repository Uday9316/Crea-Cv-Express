import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Header, MainSpinner } from '../components';
import { Route, Routes } from "react-router-dom";
import { HomeContainer } from '../containers';
import {  CreateResume, TemplateDesignPinDetails } from '../pages';
import UserProfile from './UserProfile'; 
import CreateTemplate from './CreateTemplate';

const HomeScreen = () => {
  
  const templates = [
    { title: 'Clean Code Resume', description: 'A sleek and professional resume template for software developers who value clean and efficient code.' },
    { title: 'Full Stack Developer CV', description: 'Highlight your expertise in both front-end and back-end development with this comprehensive CV template.' },
   
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className='w-full flex flex-col items-center justify-center bg-bright'>
      {/* Header */}
      <Header />

     

      {/* Routes */}
      <main className="w-full">
        <Suspense fallback={<MainSpinner />}>
          <Routes>
            <Route path="/" element={<HomeContainer/>} />
            <Route path="/template/create" element={<CreateTemplate/>} />
            <Route path="/profile/:uid" element={<UserProfile/>} />
            <Route path="/resume/*" element={<CreateResume />} />
            <Route path="/resumeDetail/:templateID" element={<TemplateDesignPinDetails />} />
          </Routes>
        </Suspense>
      </main>
    </motion.div>
  );
};

export default HomeScreen;
