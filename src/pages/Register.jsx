// Register.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import AuthButtonWithProvider from '../components/AuthButtonWithProvider';
import COVER_IMAGE from '../assets/img/login.avif';
import { auth, db } from '../config/firebase.config';

import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    // Use a placeholder instead of storing password in state
    password: '',
  });

  // **Do NOT store password in Firestore for security reasons**

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      // **Use Firebase Authentication for secure password registration**
      const { user } = await auth.createUserWithEmailAndPassword(
        formData.email,
        formData.password
      );

      // Store additional user details (excluding password) in Firestore
      await db.collection('users').doc(user.uid).set({
        username: formData.username,
        email: formData.email,
        // Do not include password here
      });

      // Clear password from state after successful registration
      setFormData({ username: '', email: '' });

      // Redirect user to login page or desired route
      navigate('/login');
    } catch (error) {
      console.error('Error registering user:', error.message);
      alert('Error registering user: ' + error.message);
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);

  return (
    <div className="w-full h-screen flex items-start">
      <div className="w-1/2">
        <img src={COVER_IMAGE} className="w-full h-screen object-cover" alt="" />
      </div>
      <div className="w-1/2 bg-gray-200 flex flex-col p-20">
        <h1 className="max-w-500 mx-auto text-xl text-gray-900 font-semibold">CréaCVExpress</h1>
        <div className="w-full flex flex-col max-w-500">
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-3xl font-semibold mb-2">Register Here! </h3>
            <p className="text-base mb-2">Create your account.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full text-black py-2 my-4 bg-transparent border-b border-black outline-none focus:outline-none"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full text-black py-2 my-4 bg-transparent border-b border-black outline-none focus:outline-none"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full text-black py-2 my-4 bg-transparent border-b border-black outline-none focus:outline-none"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full text-black py-2 my-4 bg-transparent border-b border-black outline-none focus:outline-none"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="w-full text-white my-2 bg-gray-900 rounded-md p-2 text-center flex items-center cursor-pointer"
            >
              Register
            </button>
          </form>
          <div className="w-full flex items-center justify-between mt-4">
            <hr className="w-full border-gray-600" /> {/* Line separator */}
            <p className="text-gray-600 text-center mx-2 mt-5">OR</p> {/* Text above the line */}
            <hr className="w-full border-gray-600" /> {/* Line separator */}
          </div>
          <div className="w-full flex items-center justify-between mt-5">
            <AuthButtonWithProvider
              Icon={FaGoogle}
              label={'Sign up with Google'}
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
              label={'Sign up with Github'}
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
          <div className="w-full flex items-center justify-center mt-5">
            <p className="text-sm font-normal text-gray-900">Already have an account?</p>
            <Link to="/login">
              <span className="font-semibold underline ml-2 cursor-pointer">Login here</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
