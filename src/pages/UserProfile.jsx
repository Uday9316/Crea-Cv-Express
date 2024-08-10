import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getSavedResumes } from "../api/index"; // Import the getSavedResumes function
import useTemplates from "../hooks/useTemplates"; // Import the useTemplates hook
import { MainSpinner, TemplateDesignPin } from "../components";
import { NoData } from "../assets";

const UserProfile = () => {
  const { data: user } = useUser();
  const [activeTab, setActiveTab] = useState("collections");

  const navigate = useNavigate();

  const {
    data: templates,
    isLoading: temp_isLoading,
    isError: temp_isError,
  } = useTemplates();

  const { data: savedResumes } = useQuery(["savedResumes"], () =>
    getSavedResumes(user?.uid)
  );
  // useEffect(() => {
  //   if (!user) {
  //     navigate("/auth", { replace: true });
  //   }
  // }, []);

  if (temp_isLoading) {
    return <MainSpinner />;
  }
  return (
    <div className="w-full flex flex-col items-center justify-start py-12 ">
      <div className="w--full h-72 bg-blue-50">
        <img
          src="https://_images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG9yaXpvbnRhbCUyMGJhY2tnb3J1bmQlMjBpbWFnZSUyMGZvciUyMHJlc3VtZSUyMHdlYnNpdGV8ZW58MHwwfDB8fHww"
          alt=""
          className="w-full h-full object-center"
        />

        <div className="flex items-center justify-center flex-col gap-4">
          {user?.photoURL ? (
            <React.Fragment>
              <img
                src={user?.photoURL}
                className="w-24 h-24 rounded-full border-2 border-white -mt-12 shadow-md"
                alt=""
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <img
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkya-1SmxkWbJO5UQoH3AMNssatmkk6xIZFA&usqp=CAU"
                }
                className="w-24 h-24 rounded-full border-2 border-white -mt-12 shadow-md"
                alt=""
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </React.Fragment>
          )}

          <p className="text-2xl text-txtDark">{user?.displayName}</p>
        </div>

        {/* tabs */}
        <div className="flex items-center justify-center mt-12">
          <div
            className={`px-4 py-2 rounded-md flex items-center justify-center gap-2 group cursor-pointer`}
            onClick={() => setActiveTab("collections")}
          >
            <p
              className={`text-base text-txtPrimary group-hover:text-blue-600 px-4 py-1 rounded-full ${
                activeTab === "collections" &&
                "bg-white shadow-md text-blue-600"
              }`}
            >
              Collections
            </p>
          </div>

          <div
            className={`px-4 py-2 rounded-md flex items-center justify-center gap-2 group cursor-pointer`}
            onClick={() => setActiveTab("resumes")}
          >
            <p
              className={`text-base text-txtPrimary group-hover:text-blue-600 px-4 py-1 rounded-full ${
                activeTab === "resumes" && "bg-white shadow-md text-blue-600"
              }`}
            >
              My Resumes
            </p>
          </div>
        </div>

        {/* tab content */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 px-4 py-6">
          <AnimatePresence>
            {activeTab === "collections" && (
              <React.Fragment>
                {user?.collections?.length > 0 && user.collections ? (
                  <RenderATemplate
                    templates={templates?.filter((temp) =>
                      user?.collections?.includes(temp?._id)
                    )}
                  />
                ) : (
                  <div className="col-span-12 w-full flex flex-col items-center justify-center gap-3">
                    <img
                      src={NoData}
                      className="w-32 h-auto object-contain"
                      alt=""
                    />
                    <p>No Data</p>
                  </div>
                )}
              </React.Fragment>
            )}

            {activeTab === "resumes" && (
              <React.Fragment>
                {savedResumes?.length > 0 && savedResumes ? (
                  <RenderATemplate templates={savedResumes} />
                ) : (
                  <div className="col-span-12 w-full flex flex-col items-center justify-center gap-3">
                    <img
                      src={NoData}
                      className="w-32 h-auto object-contain"
                      alt=""
                    />
                    <p>No Data</p>
                  </div>
                )}
              </React.Fragment>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const RenderATemplate = ({ templates }) => {
  return (
    <React.Fragment>
      {templates && templates.length > 0 && (
        <React.Fragment>
          <AnimatePresence>
            {templates.map((template, index) => (
              <TemplateDesignPin
                key={template?._id}
                data={template}
                index={index}
              />
            ))}
          </AnimatePresence>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default UserProfile;
