import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BiFolderPlus, BiHeart, BiSolidFolderPlus, BiSolidHeart } from "react-icons/bi";
import { saveToCollections, saveToFavourites, removeFromCollections } from "../api"; // Import removeFromCollections
import useUser from "../hooks/useUser";
import useTemplates from "../hooks/useTemplates";
import { useNavigate } from "react-router-dom";
import { FadeInOutWIthOpacity, scaleInOut } from "../animations";

const TemplateDesignPin = ({ data, index }) => {
  const { data: user, refetch: userRefetch } = useUser();
  const { refetch: temp_refetch } = useTemplates();
  const [isHoverred, setIsHoverred] = useState(false);
  const navigate = useNavigate();

  const addToCollection = async (e) => {
    e.stopPropagation();
    await saveToCollections(user, data);
    userRefetch();
  };

  const removeFromCollection = async (e) => { // Define removeFromCollection function
    e.stopPropagation();
    await removeFromCollections(user, data);
    userRefetch();
  };

  const addToFavourites = async (e) => {
    e.stopPropagation();
    await saveToFavourites(user, data);
    temp_refetch();
  };

  const handleRouteNavigation = () => {
    navigate(`resumeDetail/${data?._id}`, { replace: true });
  };

  return (
    <motion.div key={data?._id} {...scaleInOut(index)}>
      {/* Image container */}
      <div
        className="relative w-full h-[500px] 2xl:h-[740px] rounded-md bg-gray-200 overflow-hidden"
        onMouseEnter={() => setIsHoverred(true)}
        onMouseLeave={() => setIsHoverred(false)}
      >
        <img src={data?.imageURL} className="w-full h-full object-cover" alt="" />
        
        {/* Hover content */}
        <AnimatePresence>
          {isHoverred && (
            <motion.div
              {...FadeInOutWIthOpacity}
              onClick={handleRouteNavigation}
              className="absolute inset-0 bg-[rgba(0,0,0,0.4)] flex flex-col items-center justify-start px-4 py-3 z-50 cursor-pointer"
            >
              <div className="flex flex-col items-end justify-start w-full gap-7">
                <InnerBoxCard
                  label={
                    user?.collections?.includes(data?._id)
                      ? "Added in the collections"
                      : "Add to collections"
                  }
                  Icon={
                    user?.collections?.includes(data?._id)
                      ? BiSolidFolderPlus
                      : BiFolderPlus
                  }
                  onHandle={user?.collections?.includes(data?._id) ? removeFromCollection : addToCollection} // Use removeFromCollection if already in collections
                />

                <InnerBoxCard
                  label={
                    data?.favourites?.includes(user?.uid)
                      ? "Added in the favourites"
                      : "Add to favourites"
                  }
                  Icon={
                    data?.favourites?.includes(user?.uid)
                      ? BiSolidHeart
                      : BiHeart
                  }
                  onHandle={addToFavourites}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Title below the image container */}
      <div className="mt-4 text-center">
        <h2 className="text-lg font-bold">{data?.title}</h2>
      </div>
    </motion.div>
  );
};

const InnerBoxCard = ({ label, Icon, onHandle }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onHandle}
      className="w-10 h-10 rounded-md bg-gray-200 flex items-center justify-center hover:shadow-md relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Adjust outer layout size and increase inner icon size */}
      <Icon className="text-txtPrimary text-base w-6 h-6" />{" "}
      {/* Set icon size */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, x: 50 }} // Adjust the x value to move the message to the left
            animate={{ opacity: 1, scale: 1, x: 0 }} // Adjust the x value to position the message next to the button
            exit={{ opacity: 0, scale: 0.6, x: 50 }} // Adjust the x value to move the message to the left
            className="px-3 py-2 rounded-md bg-gray-200 absolute -left-44 after:w-2 after:h-2 after:bg-gray-200 after:absolute after:-right-1 after:top-[14px] after:rotate-45"
          >
            <p className="text-sm text-txtPrimary whitespace-nowrap">{label}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TemplateDesignPin;
