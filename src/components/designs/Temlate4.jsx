import React, { useEffect, useRef, useState } from "react";
import MainSpinner from "../MainSpinner";
import { useQuery } from "react-query";
import useUser from "../../hooks/useUser";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../config/firebase.config";
import { getTemplateDetailEditByUser } from "../../api";
import jsPDF from "jspdf";
import * as htmlToImage from "html-to-image";


import { TemplateFour } from "../../assets";
import {
  FaHouse,
  FaTrash,
  FaPenToSquare,
  FaPencil,
  FaPlus,
} from "react-icons/fa6";
import { BiSolidBookmarks } from "react-icons/bi";
import {
  BsFiletypePdf,
  BsFiletypePng,
  BsFiletypeJpg,
  BsFiletypeSvg,
} from "react-icons/bs";

import { AnimatePresence, motion } from "framer-motion";
import { FadeInOutWIthOpacity, opacityINOut } from "../../animations";

const Template4 = () => {
  const { pathname } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();
  const templateName = pathname?.split("/")?.slice(-1);
  const searchParams = new URLSearchParams(location.search);
  const loadedTemplateId = searchParams.get("templateId");

  const [isEdit, setIsEdit] = useState(false);
  const { data: user } = useUser();

  const resumeRef = useRef(null);

  const [imageAsset, setImageAsset] = useState({
    isImageLoading: false,
    imageURL: null,
  });

  const {
    data: resumeData,
    isLoading: resume_isLoading,
    isError: resume_isError,
    refetch: refetch_resumeData,
  } = useQuery(["templateEditedByUser", `${templateName}-${user?.uid}`], () =>
    getTemplateDetailEditByUser(user?.uid, `${templateName}-${user?.uid}`)
  );

  const [formData, setFormData] = useState({
    fullname: "Mathew Smith",
    professionalTitle: "UI DESIGNER",
    personalDescription: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alia minus est culpa id corrupti nobis ullam harum, porro veniam facilis, obcaecati nulla magnam beatae quae at eos! Qui, similique laboriosam?`,
    refererName: "Sara Taylore",
    refererRole: "Director | Company Name",
    mobile: "+91 0000-0000",
    email: "urname@gmail.com",
    website: "urwebsite.com",
    address: "your street address, ss, street, city/zip code - 1234",
  });

  const [experiences, setExperiences] = useState([
    {
      year: "2012 - 2014",
      title: "Job Position Here",
      companyAndLocation: "Company Name / Location here",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis voluptatibus minima tenetur nostrum quo aliquam dolorum incidunt.",
    },
    {
      year: "2012 - 2014",
      title: "Job Position Here",
      companyAndLocation: "Company Name / Location here",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis voluptatibus minima tenetur nostrum quo aliquam dolorum incidunt.",
    },
    {
      year: "2012 - 2014",
      title: "Job Position Here",
      companyAndLocation: "Company Name / Location here",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis voluptatibus minima tenetur nostrum quo aliquam dolorum incidunt.",
    },
  ]);

  const [skills, setSkills] = useState([
    {
      title: "skill1",
      percentage: "75",
    },
    {
      title: "skill2",
      percentage: "75",
    },
    {
      title: "skill3",
      percentage: "75",
    },
    {
      title: "skill4",
      percentage: "75",
    },
    {
      title: "skill5",
      percentage: "75",
    },
  ]);

  const [education, setEducation] = useState([
    {
      major: "ENTER YOUR MAJOR",
      university: "Name of your university / college 2005-2009",
    },
  ]);

  useEffect(() => {
    if (resumeData?.formData) {
      setFormData({ ...resumeData?.formData });
    }
    if (resumeData?.experiences) {
      setExperiences(resumeData?.experiences);
    }
    if (resumeData?.skills) {
      setSkills(resumeData?.skills);
    }
    if (resumeData?.education) {
      setEducation(resumeData?.education);
    }
    if (resumeData?.userProfilePic) {
      setImageAsset((prevAsset) => ({
        ...prevAsset,
        imageURL: resumeData?.userProfilePic,
      }));
    }
  }, [resumeData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleEditable = () => {
    setIsEdit(!isEdit);
    var inputs = document.querySelectorAll("input");
    var textarea = document.querySelectorAll("textarea");

    for (var i = 0; i < inputs.length; i++) {
      inputs[i].readOnly = !inputs[i].readOnly;
    }

    for (var i = 0; i < textarea.length; i++) {
      textarea[i].readOnly = !textarea[i].readOnly;
    }
  };

  // image upload to the cloud
  const handleFileSelect = async (event) => {
    setImageAsset((prevAsset) => ({ ...prevAsset, isImageLoading: true }));
    // console.log(event.target.files[0]);
    const file = event.target.files[0];
    if (file && isAllowed(file)) {
      const reader = new FileReader();

      reader.onload = function (event) {
        const dataURL = event.target.result;
        console.log("Data URL:", dataURL);

        // You can now use the dataURL as needed, e.g., to display an image.
        setImageAsset((prevAsset) => ({
          ...prevAsset,
          imageURL: dataURL,
        }));
      };

      // Read the file as a Data URL
      reader.readAsDataURL(file);
    } else {
      toast.error("Invalid File Format");
    }
  };

  const isAllowed = (file) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    return allowedTypes.includes(file.type);
  };

  // delete an image
  const deleteImageObject = () => {
    setImageAsset((prevAsset) => ({
      ...prevAsset,
      imageURL: null,
    }));
  };

  // uploader finshed

  const handleExpChange = (index, e) => {
    const { name, value } = e.target;
    // Create a copy of the workExperiences array
    const updatedExperiences = [...experiences];
    // Update the specific field for the experience at the given index
    updatedExperiences[index][name] = value;
    // Update the state with the modified array
    setExperiences(updatedExperiences);
  };

  const removeExperience = (index) => {
    // Create a copy of the workExperiences array and remove the experience at the given index
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(index, 1);
    // Update the state with the modified array
    setExperiences(updatedExperiences);
  };

  const addExperience = () => {
    // Create a copy of the workExperiences array and add a new experience
    const updatedExperiences = [
      ...experiences,
      {
        year: "2012 - 2014",
        title: "Job Position Here",
        companyAndLocation: "Company Name / Location here",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis voluptatibus minima tenetur nostrum quo aliquam dolorum incidunt.",
      },
    ];
    // Update the state with the modified array
    setExperiences(updatedExperiences);
  };

  const handleSkillsChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSkills = [...skills];
    updatedSkills[index][name] = value;
    setSkills(updatedSkills);
  };

  const removeSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const addSkill = () => {
    const updatedSkills = [
      ...skills,
      {
        title: "skill1",
        percentage: "75",
      },
    ];
    setSkills(updatedSkills);
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEdu = [...education];
    updatedEdu[index][name] = value;
    setEducation(updatedEdu);
  };

  const removeEducation = (index) => {
    const updatedEdu = [...education];
    updatedEdu.splice(index, 1);
    setEducation(updatedEdu);
  };

  const addEducation = () => {
    const updatedEdu = [
      ...education,
      {
        major: "ENTER YOUR MAJOR",
        university: "Name of your university / college 2005-2009",
      },
    ];
    setEducation(updatedEdu);
  };

  const saveFormData = async () => {
    const timeStamp = serverTimestamp();
    const resume_id = `${templateName}-${user?.uid}`;
    const imageURL = await getImage();
    const _doc = {
      _id: loadedTemplateId,
      resume_id,
      formData,
      education,
      experiences,
      skills,
      timeStamp,
      userProfilePic: imageAsset.imageURL,
      imageURL,
    };
    console.log(_doc);
    setDoc(doc(db, "users", user?.uid, "resumes", resume_id), _doc)
      .then(() => {
        toast.success(`Data Saved`);
        refetch_resumeData();
      })
      .catch((err) => {
        toast.error(`Error : ${err.message}`);
      });
  };

  const getImage = async () => {
    const element = resumeRef.current;
    element.onload = async () => {
      // Call the image capture code here
    };
    element.onerror = (error) => {
      console.error("Image loading error:", error);
    };
    if (!element) {
      console.error("Unable to capture content. The DOM element is null.");
      return;
    }
    try {
      const dataUrl = await htmlToImage.toJpeg(element);
      console.log(dataUrl);
      return dataUrl;
    } catch (error) {
      console.error("Oops, something went wrong!", error.message);
      return null; 
    }
  };
  const filename = `${formData.fullname.split(" ")[0]}.pdf`;

  const generatePDF = async () => {
    const element = resumeRef.current;
    if (!element) {
      toast.info("Unable to capture the content at a moment");
      return;
    }

    htmlToImage.toPng(element).then((dataURL) => {
      const a4Width = 210;
      const a4Height = 297;

      var pdf = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: [a4Width, a4Height],
      });

      const aspectRatio = a4Width / a4Height;
      const imgWidth = a4Width;
      const imgHeight = a4Width / aspectRatio;

      const verticalMargin = (a4Height - imgHeight) / 2;

      pdf.addImage(dataURL, "PNG", 0, verticalMargin, imgWidth, imgHeight);
      pdf.save(filename);
    })

    .catch((err) => {
      toast.error(`Error : ${err.message}`);
    });
  };

  const generateImage = async () => {
    const element = resumeRef.current;
    if (!element) {
      toast.info("Unable to capture the content at a moment");
      return;
    }

    const filename = `${formData.fullname.split(" ")[0]}.png`; 
  htmlToImage.toPng(element).then((dataURL) => {
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = filename; // Set the filename
    a.click();
  })
  .catch((err) => {
    toast.error(`Error : ${err.message}`);
  });
  };

  const generatePng = async () => {
    const element = resumeRef.current;
    if (!element) {
      toast.info("Unable to capture the content at a moment");
      return;
    }

    const filename = `${formData.fullname.split(" ")[0]}.png`; 
  htmlToImage.toPng(element).then((dataURL) => {
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = filename; // Set the filename
    a.click();
  })
  .catch((err) => {
    toast.error(`Error : ${err.message}`);
  });
  };

  const generateSvg = async () => {
    const element = resumeRef.current;
    if (!element) {
      toast.info("Unable to capture the content at a moment");
      return;
    }

    const filename = `${formData.fullname.split(" ")[0]}.svg`; 
    htmlToImage.toSvg(element).then((dataURL) => {
      const a = document.createElement("a");
      a.href = dataURL;
      a.download = filename; 
      a.click();
    })
    .catch((err) => {
      toast.error(`Error : ${err.message}`);
    });
  };

  if (resume_isLoading) return <MainSpinner />;

  if (resume_isError) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center">
        <p className="text-lg text-txtPrimary font-semibold">
          Error While fetching the data
        </p>
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col items-center justify-start gap-4">
      {/* bread crumb */}
      <div className="w-full flex items-center gap-2 px-4">
        <Link to={"/"} className="flex items-center justify-center gap-2 text-black">
          <FaHouse />
          Home
        </Link>
        <p className="text-black cursor-pointer" onClick={() => navigate(-1)}>
          / Template2 /
        </p>
        <p>Edit</p>
      </div>

      <div className="w-full lg:w-[1200px] grid grid-cols-1 lg:grid-cols-12 px-6 lg:px-32">
        {/* template design */}
        <div className="col-span-12 px-4 py-6">
          <div className="flex items-center justify-end w-full gap-12 mb-4">
            <div className="flex items-center justify-center gap-1 px-3 py-1 rounded-md bg-gray-200 cursor-pointer" onClick={toggleEditable}>
              {isEdit ? (
                <FaPenToSquare className="text-sm text-black" />
              ) : (
                <FaPencil className="text-sm text-black" />
              )}
              <p className="text-sm text-black">Edit</p>
            </div>

            <div className="flex items-center justify-center gap-1 px-3 py-1 rounded-md bg-gray-200 cursor-pointer" onClick={saveFormData}>
              <BiSolidBookmarks className="text-sm text-black" />
              <p className="text-sm text-black">Save</p>
            </div>

            <div className="flex items-center justify-center gap-2">
              <p className="text-sm text-black">Download : </p>
              <BsFiletypePdf className="text-2xl text-black cursor-pointer" onClick={generatePDF} />
              <BsFiletypePng className="text-2xl text-black cursor-pointer" onClick={generatePng} />
              <BsFiletypeJpg className="text-2xl text-black cursor-pointer" onClick={generateImage} />
              <BsFiletypeSvg className="text-2xl text-black cursor-pointer" onClick={generateSvg} />
            </div>
          </div>

          <div className="w-full h-auto grid grid-cols-12">

            <div className="col-span-12 bg-white p-4">
            <div className="w-full">
  <p className="uppercase text-lg font-semibold text-black">Name</p>
  <div className="w-full h-[2px] bg-gray-400 mt-2"></div>
  <input
    value={formData.fullname}
    onChange={handleChange}
    name="adName"
    type="text"
    readOnly="true"
    className={`bg-transparent outline-none border-none text-base tracking-widest capitalize text-black w-full ${isEdit && "bg-gray-200"}`}
  />
</div>

              <div className="w-full">
                <p className="uppercase text-lg font-semibold text-black">Phone</p>
                <div className="w-full h-[2px] bg-gray-400 mt-2"></div>
                <input
                  value={formData.mobile}
                  onChange={handleChange}
                  name="mobile"
                  type="text"
                  readOnly="true"
                  className={`bg-transparent outline-none border-none text-base tracking-widest capitalize text-black w-full ${isEdit && "bg-gray-200"}`}
                />
              </div>

              <div className="w-full mt-4">
                <p className="uppercase text-lg font-semibold text-black">Email</p>
                <div className="w-full h-[2px] bg-gray-400 mt-2"></div>
                <input
                  value={formData.email}
                  onChange={handleChange}
                  name="email"
                  type="text"
                  readOnly="true"
                  className={`bg-transparent outline-none border-none text-base tracking-widest capitalize text-black w-full ${isEdit && "bg-gray-200"}`}
                />
              </div>

              <div className="w-full mt-4">
                <p className="uppercase text-lg font-semibold text-black">Website</p>
                <div className="w-full h-[2px] bg-gray-400 mt-2"></div>
                <input
                  value={formData.website}
                  onChange={handleChange}
                  name="website"
                  type="text"
                  readOnly="true"
                  className={`bg-transparent outline-none border-none text-base tracking-widest capitalize text-black w-full ${isEdit && "bg-gray-200"}`}
                />
              </div>

              <div className="w-full mt-4">
                <p className="uppercase text-lg font-semibold text-black">Address</p>
                <div className="w-full h-[2px] bg-gray-400 mt-2"></div>
                <textarea
                  readOnly="true"
                  className={`text-base text-black mt-2 w-full outline-none border-none ${isEdit ? "bg-gray-200" : "bg-transparent"}`}
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="2"
                  style={{ maxHeight: "auto", minHeight: "40px", resize: "none" }}
                />
              </div>

              <div className="w-full mt-6">
                <p className="uppercase text-lg font-semibold text-black">About Me</p>
                <div className="w-full h-[2px] bg-gray-400 mt-2"></div>
                <textarea
                  readOnly="true"
                  className={`text-base text-black mt-2 w-full outline-none border-none ${isEdit ? "bg-gray-200" : "bg-transparent"}`}
                  name="personalDescription"
                  value={formData.personalDescription}
                  onChange={handleChange}
                  rows="4"
                  style={{ minHeight: "100px", width: "100%", height: "100px", resize: "none" }}
                />
              </div>

              <div className="w-full mt-6">
                <p className="uppercase text-lg font-semibold text-black">Work Experience</p>
                <div className="w-full h-[2px] bg-gray-400 mt-2"></div>
                <div className="w-full flex flex-col items-center justify-start gap-4">
                  <AnimatePresence>
                    {experiences &&
                      experiences?.map((exp, i) => (
                        <motion.div key={i} {...opacityINOut(i)} className="w-full grid grid-cols-12">
                          <div className="col-span-4">
                            <input
                              value={exp.year}
                              onChange={(e) => handleExpChange(i, e)}
                              name="year"
                              type="text"
                              readOnly="true"
                              className={`outline-none border-none text-base tracking-widest uppercase text-black w-full ${isEdit ? "bg-gray-200" : "bg-transparent"}`}
                            />
                          </div>
                          <div className="col-span-8 relative">
                            <AnimatePresence>
                              {isEdit && (
                                <motion.div {...FadeInOutWIthOpacity} onClick={() => removeExperience(i)} className="cursor-pointer absolute right-0 top-2">
                                  <FaTrash className="text-base text-black" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                            <input
                              value={exp.title}
                              onChange={(e) => handleExpChange(i, e)}
                              name="title"
                              type="text"
                              readOnly="true"
                              className={`outline-none border-none font-sans text-lg tracking-wide capitalize text-black w-full ${isEdit ? "bg-gray-200" : "bg-transparent"}`}
                            />
                            <input
                              value={exp.companyAndLocation}
                              onChange={(e) => handleExpChange(i, e)}
                              name="companyAndLocation"
                              type="text"
                              readOnly="true"
                              className={`outline-none border-none text-sm tracking-wide capitalize text-black w-full ${isEdit ? "bg-gray-200" : "bg-transparent"}`}
                            />
                            <textarea
                              readOnly="true"
                              className={`text-xs mt-4 text-black tracking-wider w-full outline-none border-none ${isEdit ? "bg-gray-200" : "bg-transparent"}`}
                              name="description"
                              value={exp.description}
                              onChange={(e) => handleExpChange(i, e)}
                              rows="3"
                              style={{ maxHeight: "auto", minHeight: "60px", resize: "none" }}
                            />
                          </div>
                        </motion.div>
                      ))}
                  </AnimatePresence>
                </div>
                <AnimatePresence>
                  {isEdit && (
                    <motion.div {...FadeInOutWIthOpacity} onClick={addExperience} className="cursor-pointer">
                      <FaPlus className="text-base text-black" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="w-full mt-6">
                <p className="uppercase text-lg font-semibold text-black">Skills</p>
                <div className="w-full h-[2px] bg-gray-400 mt-2"></div>
                <div className="w-full flex flex-wrap items-center justify-start gap-4">
                  <AnimatePresence>
                    {skills &&
                      skills?.map((skill, i) => (
                        <motion.div key={i} {...opacityINOut(i)} className="flex-1" style={{ minWidth: 225 }}>
                          <div className="w-full flex items-center justify-between">
                            <div className="flex items-center justify-center">
                              <input
                                value={skill.title}
                                onChange={(e) => handleSkillsChange(i, e)}
                                name="title"
                                type="text"
                                readOnly="true"
                                className={`outline-none border-none text-base tracking-wide capitalize font-semibold text-black w-full ${isEdit ? "bg-gray-200" : "bg-transparent"}`}
                              />

                              <AnimatePresence>
                                {isEdit && (
                                  <motion.input
                                    {...FadeInOutWIthOpacity}
                                    value={skill.percentage}
                                    onChange={(e) => handleSkillsChange(i, e)}
                                    name="percentage"
                                    type="text"
                                    className={`outline-none border-none text-base tracking-wide capitalize font-semibold text-black w-full ${isEdit ? "bg-gray-200" : "bg-transparent"}`}
                                  />
                                )}
                              </AnimatePresence>
                            </div>

                            <AnimatePresence>
                              {isEdit && (
                                <motion.div {...FadeInOutWIthOpacity} onClick={() => removeSkill(i)} className="cursor-pointer">
                                  <FaTrash className="text-base text-black" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                          <div className="relative mt-2 w-full h-1 rounded-md bg-gray-400">
                            <div className="h-full rounded-md bg-black" style={{ width: `${skill.percentage}%`, transition: "width 0.3s ease" }}></div>
                          </div>
                        </motion.div>
                      ))}
                  </AnimatePresence>
                </div>
                <AnimatePresence>
                  {isEdit && (
                    <div className="w-full  flex items-center justify-center py-4">
                      <motion.div {...FadeInOutWIthOpacity} onClick={addSkill} className="cursor-pointer">
                        <FaPlus className="text-base text-black" />
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template4;