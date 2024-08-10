import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useSpring, animated } from "react-spring";
import "./index.css";
import Footer from "./Footer";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleCreateResumeClick = () => {
    navigate("/auth");
  };

  const fadeIn = useAnimation();

  useEffect(() => {
    const animatePage = async () => {
      await fadeIn.start({ opacity: 1 });
    };

    animatePage();
  }, [fadeIn]);

  const navbarItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const navbarLinkHoverVariants = {
    hover: { scale: 1.1, color: "#E54A79", transition: { duration: 0.3 } },
  };

  const dancingTextAnimation = useSpring({
    loop: true,
    to: { y: 2 },
    from: { y: 0 },
  });

  return (
    <>
      
      <nav
        style={{ backgroundColor: "#D4D4A6" }}
        className="navbar fixed top-0 w-full z-10"
      >
        <div className="container flex justify-between items-center p-4">
          {/* Navbar Brand */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={navbarItemVariants}
          >
            <div className="navbar-brand">
              <Link
                to="/"
                className="flex items-center text-lg font-bold text-gray-800"
              >
                <img
                  src="/asset/imag/curriculum-vitae.png"
                  alt=""
                  className="navbar-brand-icon"
                />
                <span className="navbar-brand-text">
                  {" "}
                  Créa <span>CVExpress</span>
                </span>
              </Link>
            </div>
          </motion.div>

          {/* Navbar Links */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={navbarItemVariants}
          >
            <div className="flex items-center space-x-8">
              <motion.div whileHover="hover" variants={navbarLinkHoverVariants}>
                <Link to="/resume-builder" className="navbar-link">
                  Resume Builder App
                </Link>
              </motion.div>
              <motion.div whileHover="hover" variants={navbarLinkHoverVariants}>
                <Link to="/resume-templates" className="navbar-link">
                  Resume Templates
                </Link>
              </motion.div>
              <motion.div whileHover="hover" variants={navbarLinkHoverVariants}>
                <Link to="/contact" className="navbar-link">
                  Contact
                </Link>
              </motion.div>
              <motion.div whileHover="hover" variants={navbarLinkHoverVariants}>
                <Link to="/privacy" className="navbar-link">
                  Privacy Policy
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Login Button */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={navbarItemVariants}
          >
            <button
              className="btn btn-primary text-uppercase"
              onClick={handleCreateResumeClick}
            >
              Login
            </button>
          </motion.div>
        </div>
      </nav>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={fadeIn}
        className="header bg-bright"
        id="header"
      >
        <div className="container">
          <div className="header-content text-center">
            <animated.h6
              style={dancingTextAnimation}
              className="text-uppercase text-blue-dark fs-14 fw-6 ls-1 mt-40"
            >
              online resume builder
            </animated.h6>
            <h1 className="lg-title">
              Only 2% of resumes make it past the first round. Be in the top 2%
            </h1>
            <p className="text-dark fs-18">
              Use professional field-tested resume templates that follow the
              exact 'resume rules' employers look for. Easy to use and done
              within minutes - try now for free!
            </p>
            <button
              className="btn btn-primary text-uppercase"
              onClick={handleCreateResumeClick}
            >
              create my resume
            </button>
            <img src="/asset/imag/dublin-resume-templates.avif" alt="" />
          </div>
        </div>
      </motion.header>
      <div className="section-one">
        <div className="container">
          <div className="section-one-content">
            <div className="section-one-l">
              <img src="/asset/imag/visual1.svg" alt="" />
            </div>
            <div className="section-one-r text-center">
              <h2 className="lg-title">
                Use the best resume maker as your guide!
              </h2>
              <p className="text">
                Getting that dream job can seem like an impossible task. We're
                here to change that. Give yourself a real advantage with the
                best online resume maker: created by experts, improved by data,
                trusted by millions of professionals.
              </p>
              <div className="btn-group">
                <Link to="#" className="btn btn-secondary text-uppercase">
                  watch video
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-two bg-bright">
        <div className="container">
          <div
            className="section-two-content"
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <div
              className="section-items"
              style={{ display: "flex", gap: "20px" }}
            >
              <div
                className="section-item hover-effect"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <div className="section-item-icon">
                  <img src="/asset/imag/feature1.svg" alt="" />
                </div>
                <h5 className="section-item-title">
                  Make a resume that wins interviews!
                </h5>
                <p className="text">
                  Use our resume maker with its advanced creation tools to tell
                  a professional story that engages recruiters, hiring managers,
                  and even CEOs.
                </p>
              </div>

              <div
                className="section-item hover-effect"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <div className="section-item-icon">
                  <img src="/asset/imag/feature2.svg" alt="" />
                </div>
                <h5 className="section-item-title">
                  Resume writing made easy!
                </h5>
                <p className="text">
                  Resume writing has never been this effortless. Pre-generated
                  text, visual designs, and more - all already integrated into
                  the resume maker. Just fill in your details.
                </p>
              </div>

              <div
                className="section-item hover-effect"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <div className="section-item-icon">
                  <img src="/asset/imag/feature3.svg" alt="" />
                </div>
                <h5 className="section-item-title">
                  A recruiter-tested CV maker tool
                </h5>
                <p className="text">
                  Our resume builder and its pre-generated content are tested by
                  recruiters and IT experts. We help your CV become truly
                  competitive in the hiring process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
