import React, { useState } from 'react';
import locationImage from '../assets/img/c/images/location.png';
import mailImage from '../assets/img/c/images/mail.png';
import callImage from '../assets/img/c/images/call.png';
import facebookImage from '../assets/img/c/images/1.png';
import instagramImage from '../assets/img/c/images/3.png';
import twitterImage from '../assets/img/c/images/2.png';
import linkedinImage from '../assets/img/c/images/5.png';

const ContactForm = () => {
  const [inputValues, setInputValues] = useState({
    firstName: { value: '', focused: false },
    lastName: { value: '', focused: false },
    emailAddress: { value: '', focused: false },
    mobileNumber: { value: '', focused: false },
    message: { value: '', focused: false },
  });

  const handleInputChange = (name, value) => {
    setInputValues({ ...inputValues, [name]: { value, focused: inputValues[name].focused } });
  };

  const handleInputFocus = (name) => {
    setInputValues({ ...inputValues, [name]: { ...inputValues[name], focused: true } });
  };

  const handleInputBlur = (name) => {
    setInputValues({
      ...inputValues,
      [name]: { ...inputValues[name], focused: inputValues[name].value.trim() !== '' },
    });
  };

  const imageStyles = {
    maxWidth: '100%',
    height: 'auto',
  };

  const submitButtonStyle = {
    position: 'relative',
    cursor: 'pointer',
    background: '#12372A',
    borderRadius: '20px',
    color: '#FBFADA',
    border: 'none',
    maxWidth: '150px',
    padding: '12px',
  };

  return (
    <section
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#12372A',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: '100%',
          background: '#FBFADA',
        }}
      ></div>
      <div
        style={{
          position: 'relative',
          minWidth: '1100px',
          minHeight: '550px',
          display: 'flex',
          zIndex: 1000,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '40px',
            width: '350px',
            height: 'calc(100% - 80px)',
            background: '#12372A',
            zIndex: 1,
            padding: '40px',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 20px 25px rgba(0,0,0,0.15)',
            borderRadius: '22px',
          }}
        >
          <div>
            <h2 style={{ color: '#FBFADA', fontSize: '24px', fontWeight: 500 }}>Contact Info</h2>
            <ul style={{ position: 'relative', margin: '20px 0' }}>
              <li
                style={{
                  position: 'relative',
                  listStyle: 'none',
                  display: 'flex',
                  margin: '20px 0',
                  cursor: 'pointer',
                  alignItems: 'flex-start',
                }}
              >
                <span style={{ width: '30px', minWidth: '30px' }}>
                  <img src={locationImage} alt="Location Icon" style={imageStyles} />
                </span>
                <span style={{ color: '#FBFADA', marginLeft: '10px', fontWeight: 300 }}>
                  India, Gr<br />395010
                </span>
              </li>
              <li
                style={{
                  position: 'relative',
                  listStyle: 'none',
                  display: 'flex',
                  margin: '20px 0',
                  cursor: 'pointer',
                  alignItems: 'flex-start',
                }}
              >
                <span style={{ width: '30px', minWidth: '30px' }}>
                  <img src={mailImage} alt="Mail Icon" style={imageStyles} />
                </span>
                <span style={{ color: '#FBFADA', marginLeft: '10px', fontWeight: 300 }}>
                  <a href="mailto:cvexpress@gmail.com">cvexpress@gmail.com</a>
                </span>
              </li>
              <li
                style={{
                  position: 'relative',
                  listStyle: 'none',
                  display: 'flex',
                  margin: '20px 0',
                  cursor: 'pointer',
                  alignItems: 'flex-start',
                }}
              >
                <span style={{ width: '30px', minWidth: '30px' }}>
                  <img src={callImage} alt="Call Icon" style={imageStyles} />
                </span>
                <span style={{ color: '#FBFADA', marginLeft: '10px', fontWeight: 300 }}>702-289-3488</span>
              </li>
            </ul>
          </div>
          <ul style={{ position: 'relative', display: 'flex' }}>
            <li style={{ listStyle: 'none', marginRight: '15px' }}>
              <a href="https://www.facebook.com">
                <img src={facebookImage} alt="Facebook Icon" style={imageStyles} />
              </a>
            </li>
            <li style={{ listStyle: 'none', marginRight: '15px' }}>
              <a href="https://www.instagram.com">
                <img src={instagramImage} alt="Instagram Icon" style={imageStyles} />
              </a>
            </li>
            <li style={{ listStyle: 'none', marginRight: '15px' }}>
              <a href="https://twitter.com">
                <img src={twitterImage} alt="Twitter Icon" style={imageStyles} />
              </a>
            </li>
            <li style={{ listStyle: 'none', marginRight: '15px' }}>
              <a href="https://www.linkedin.com">
                <img src={linkedinImage} alt="LinkedIn Icon" style={imageStyles} />
              </a>
            </li>
          </ul>
        </div>
        <div
          style={{
            position: 'absolute',
            padding: '70px 50px',
            paddingLeft: '250px',
            marginLeft: '150px',
            width: 'calc(100% - 150px)',
            height: '100%',
            background: '#FBFADA',
            boxShadow: '0 50px 50px rgba(0,0,0,0.25)',
            borderRadius: '22px',
          }}
        >
          <h2 style={{ color: '#12372A', fontSize: '24px', fontWeight: 500 }}>Send a Message</h2>
          <div
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              paddingTop: '30px',
            }}
          >
            <div style={{ position: 'relative', marginBottom: '35px', width: '47%' }}>
              <input
                type="text"
                name="firstName"
                required
                value={inputValues.firstName.value}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                onFocus={() => handleInputFocus('firstName')}
                onBlur={() => handleInputBlur('firstName')}
                style={{
                  background: '#ADBC9F',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '10px',
                  color: '#12372A',
                }}
              />
              <label
                style={{
                  position: 'absolute',
                  left: '10px',
                  padding: '5px 0',
                  pointerEvents: 'none',
                  fontSize: inputValues.firstName.focused ? '12px' : '18px',
                  top: inputValues.firstName.focused ? '-18px' : '5px',
                  fontWeight: inputValues.firstName.focused ? 300 : 'normal',
                  transition: '0.3s',
                  zIndex: 1,
                  color: '#12372A',
                }}
              >
                First Name
              </label>
            </div>
            <div style={{ position: 'relative', marginBottom: '35px', width: '47%' }}>
              <input
                type="text"
                name="lastName"
                required
                value={inputValues.lastName.value}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                onFocus={() => handleInputFocus('lastName')}
                onBlur={() => handleInputBlur('lastName')}
                style={{
                  background: '#ADBC9F',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '10px',
                  color: '#12372A',
                }}
              />
              <label
                style={{
                  position: 'absolute',
                  left: '10px',
                  padding: '5px 0',
                  pointerEvents: 'none',
                  fontSize: inputValues.lastName.focused ? '12px' : '18px',
                  top: inputValues.lastName.focused ? '-18px' : '5px',
                  fontWeight: inputValues.lastName.focused ? 300 : 'normal',
                  transition: '0.3s',
                  zIndex: 1,
                  color: '#12372A',
                }}
              >
                Last Name
              </label>
            </div>
            <div style={{ position: 'relative', marginBottom: '35px', width: '100%' }}>
              <input
                type="email"
                name="emailAddress"
                required
                value={inputValues.emailAddress.value}
                onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                onFocus={() => handleInputFocus('emailAddress')}
                onBlur={() => handleInputBlur('emailAddress')}
                style={{
                  background: '#ADBC9F',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '10px',
                  color: '#12372A',
                }}
              />
              <label
                style={{
                  position: 'absolute',
                  left: '10px',
                  padding: '5px 0',
                  pointerEvents: 'none',
                  fontSize: inputValues.emailAddress.focused ? '12px' : '18px',
                  top: inputValues.emailAddress.focused ? '-18px' : '5px',
                  fontWeight: inputValues.emailAddress.focused ? 300 : 'normal',
                  transition: '0.3s',
                  zIndex: 1,
                  color: '#12372A',
                }}
              >
                Email Address
              </label>
            </div>
            <div style={{ position: 'relative', marginBottom: '35px', width: '100%' }}>
              <input
                type="text"
                name="mobileNumber"
                required
                value={inputValues.mobileNumber.value}
                onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                onFocus={() => handleInputFocus('mobileNumber')}
                onBlur={() => handleInputBlur('mobileNumber')}
                style={{
                  background: '#ADBC9F',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '10px',
                  color: '#12372A',
                }}
              />
              <label
                style={{
                  position: 'absolute',
                  left: '10px',
                  padding: '5px 0',
                  pointerEvents: 'none',
                  fontSize: inputValues.mobileNumber.focused ? '12px' : '18px',
                  top: inputValues.mobileNumber.focused ? '-18px' : '5px',
                  fontWeight: inputValues.mobileNumber.focused ? 300 : 'normal',
                  transition: '0.3s',
                  zIndex: 1,
                  color: '#12372A',
                }}
              >
                Mobile Number
              </label>
            </div>
            <div style={{ position: 'relative', width: '100%' }}>
              <textarea
                name="message"
                required
                value={inputValues.message.value}
                onChange={(e) => handleInputChange('message', e.target.value)}
                onFocus={() => handleInputFocus('message')}
                onBlur={() => handleInputBlur('message')}
                style={{
                  background: '#ADBC9F',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '10px',
                  color: '#12372A',
                }}
              ></textarea>
              <label
                style={{
                  position: 'absolute',
                  left: '10px',
                  padding: '5px 0',
                  pointerEvents: 'none',
                  fontSize: inputValues.message.focused ? '12px' : '18px',
                  top: inputValues.message.focused ? '-18px' : '5px',
                  fontWeight: inputValues.message.focused ? 300 : 'normal',
                  transition: '0.3s',
                  zIndex: 1,
                  color: '#12372A',
                }}
              >
                Write your message here...
              </label>
            </div>
            <div style={{ position: 'relative', width: '100%' }}>
              <input type="submit" value="Send" style={submitButtonStyle} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
