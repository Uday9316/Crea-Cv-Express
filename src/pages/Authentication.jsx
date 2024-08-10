import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';
import AuthButtonWithProvider from '../components/AuthButtonWithProvider';
import { FaGoogle, FaGithub } from 'react-icons/fa'; // Import Google and Github icons
import COVER_IMAGE from '../assets/img/login.avif';

const Authentication = () => {
  const { data, isLoading } = useUser();
  const navigate = useNavigate();
  const mainSectionControls = useAnimation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Check if the entered username and password match the predefined credentials
    if (email === 'uday' && password === 'uday123') {
      // Redirect to the home screen upon successful login
      navigate('/', { replace: true });
    } else {
      // Display an error message or toast indicating invalid credentials
      // You can use a toast library or set a state variable to show an error message
      alert('Invalid username or password');
    }
  };

  useEffect(() => {
    const animateMainSection = async () => {
      await mainSectionControls.start({ opacity: 1, y: 0 });
    };

    if (!isLoading && data) {
      navigate('/', { replace: true });
    } else {
      animateMainSection();
    }
    // Disable scroll on mount
    document.body.style.overflow = 'hidden';

    // Re-enable scroll on unmount
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isLoading, data, mainSectionControls, navigate]);

  return (
    <div className="w-full h-screen flex items-start">
      <div className="w-">
        <img src={COVER_IMAGE} className="w-full h-screen object-cover" alt="" />
      </div>
      <div className="w-1/2 bg-gray-200 flex flex-col p-20">
        <h1 className="max-w-500 mx-auto text-xl text-gray-900 font-semibold">CréaCVExpress</h1>
        <div className="w-full flex flex-col max-w-500">
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-3xl font-semibold mb-2">Login</h3>
            <p className="text-base mb-2">Welcome Back! Enter your Details.</p>
          </div>
          <div className="w-full flex flex-col">
            <input
              type="text"
              placeholder="Username"
              className="w-full text-black py-2 my-4 bg-transparent border-b border-black outline-none focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full text-black py-2 my-4 bg-transparent border-b border-black outline-none focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="w-full flex items-center justify-between">
            <div className="w-full flex items-center">
              <input type="checkbox" className="w-4 h-4 mr-2" />
              <p className="text-sm">Remember Me</p>
            </div>
            <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline-offset-2">Forgot Password?</p>
          </div>
          <div className="w-full flex flex-col mt-6">
            <button className="w-full text-white my-2 bg-gray-900 rounded-md p-2 text-center flex items-center cursor-pointer" onClick={handleLogin}>
              Log in
            </button>
            <Link to="/register">
              <button className="w-full text-gray-900 my-2 bg-white border-2 border-black rounded-md p-2 text-center flex items-center">Register</button>
            </Link>
          </div>
          <div className="w-full flex items-center justify-between mt-4">
            <hr className="w-full border-gray-600" /> {/* Line separator */}
            <p className="text-gray-600 text-center mx-2 mt-5">OR</p> {/* Text above the line */}
            <hr className="w-full border-gray-600" /> {/* Line separator */}
          </div>
          <div className="w-full flex items-center justify-between mt-5">
            <AuthButtonWithProvider
              Icon={FaGoogle}
              label={'Sign in with Google'}
              provider={'GoogleAuthProvider'}
              buttonStyle={{
                backgroundColor: '#4CAF50',
                color: '#fff',
                border: 'none',
                padding: '6px 12px', // smaller padding
                borderRadius: '8px', // smaller radius
                cursor: 'pointer',
              }}
              hoverStyle={{ backgroundColor: '#45A049' }}
            />
            <AuthButtonWithProvider
              Icon={FaGithub}
              label={'Sign in with Github'}
              provider={'GithubAuthProvider'}
              buttonStyle={{
                backgroundColor: '#4CAF50',
                color: '#fff',
                border: 'none',
                padding: '6px 12px', // smaller padding
                borderRadius: '8px', // smaller radius
                cursor: 'pointer',
              }}
              hoverStyle={{ backgroundColor: '#45A049' }}
            />
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <p className="text-sm font-normal text-gray-900 mt-5">Don't have account?</p>
          <Link to="/register">
            <span className="font-semibold underline mt-5 ml-5 cursor-pointer">Register now</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Authentication;