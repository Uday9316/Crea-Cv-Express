import React, { Suspense } from 'react'
import {Route,Routes} from "react-router-dom";
import {HomeScreen,Authentication}from "../pages";
import {QueryClient,QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import { default as LandingPage} from "../pages/LandingPage";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';
import ResumeBuilder from '../pages/ResumeBuilder';
import ResumeTemplates from '../pages/ResumeTemplates';
import Contact from '../pages/Contact';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import Register from '../pages/Register.jsx';

const App = () => {
  const queryClient=new QueryClient();
  return (
   <QueryClientProvider client={queryClient}>
     <Suspense fallback={<div>Loading...</div>}>
        
        <Routes>
         <Route path="/*" element={<HomeScreen/>}/>
          <Route path="/land" element={<LandingPage />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
        <Route path="/resume-templates" element={<ResumeTemplates />} />
        <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/register" element={<Register />} /> {/* New route for Register component */}

         </Routes>
      </Suspense>
      <ToastContainer position="top-right" theme="dark"/>
      <ReactQueryDevtools initialIsOpen={false}/>
   </QueryClientProvider>
);
};

export default App