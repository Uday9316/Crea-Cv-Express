//HomeContainer.jsx

import React, { useState } from "react";
import { PuffLoader } from "react-spinners";
import useTemplates from "../hooks/useTemplates";
import Filters from "../components/Filters"; // Adjust the import path
import { TemplateDesignPin } from "../components";
import MainSpinner from "../components/MainSpinner"; // Import MainSpinner component
import { AnimatePresence } from "framer-motion";

const HomeContainer = () => {
  const {
    data: templates,
    isError: temp_isError,
    isLoading: temp_isLoading,
    refetch: temp_refetch,
  } = useTemplates();

  if (temp_isLoading) {
    return <MainSpinner />;
  }

  return (
    <div className="w-full px-4 lg:px-12 py-6 flex flex-col  items-center justify-start">
      {/* filter section */}
      <Filters />

      {/* Render those template -Resume Pin */}
      {temp_isError ? (
        <React.Fragment>
          <p className="text-lg text-txtDark">
            Something went wrong...Please try again later
          </p>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="w-full grid grid-cols-1 ms:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2">
            <RenderATemplate templates={templates} />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

const RenderATemplate = ({ templates }) => {
  return (
    <React.Fragment>
      {templates && templates.length > 0 ? (
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
      ) : (
        <React.Fragment>
          <p>No Data Found</p>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};


export default HomeContainer;
