import React, { useState } from "react";
import { useParams, Link } from "react-router-dom"; // Import Link from react-router-dom
import { useQuery } from "react-query"; // Import useQuery from react-query
import {
  getTemplateDetails,
  saveToCollections,
  removeFromCollections,
  saveToFavourites,
} from "../api/index";
import MainSpinner from "../components/MainSpinner"; // Replace "../components/MainSpinner" with the actual path
import { FaHouse } from "react-icons/fa6";
import useUser from "../hooks/useUser";
import useTemplates from "../hooks/useTemplates";
import {
  BiHeart,
  BiSolidHeart,
  BiSolidFolderPlus,
  BiFolderPlus,
} from "react-icons/bi";
import { TemplateDesignPin } from "../components";
import { AnimatePresence } from "framer-motion";

const TemplateDesignPinDetails = () => {
  const { templateID } = useParams();

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const { data, isError, isLoading, refetch } = useQuery(
    ["template", templateID],
    () => getTemplateDetails(templateID)
  );

  const { data: user, refetch: userRefetch } = useUser();

  const {
    data: templates,
    refetch: temp_refetch,
    isLoading: temp_isLoading,
  } = useTemplates();

  const addToCollection = async (e) => {
    e.stopPropagation();
    if (!user?.collections?.includes(data?._id)) {
      await saveToCollections(user, data);
    } else {
      await removeFromCollections(user, data);
    }
    userRefetch();
    refetch();
  };

  const addToFavourites = async (e) => {
    e.stopPropagation();
    await saveToFavourites(user, data);
    temp_refetch();
    refetch();
  };

  if (isLoading) return <MainSpinner />; // Render MainSpinner while loading

  if (isError) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center">
        <p className="text-lg text-txtPrimary font-semibold">
          Error while fetching the data...Please Try Again Later
        </p>
      </div>
    );
  }

  const filteredTemplates = templates.filter((template) => {
    // Check if the search term matches with template title or any tag
    const titleMatch = template.title.toLowerCase().includes(searchTerm.toLowerCase());
    const tagMatch = template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return titleMatch || tagMatch;
  });

  return (
    <div className="w-full flex items-center justify-start flex-col px-4 py-12">
      {/*bread crumb */}
      <div className="w-full flex items-center pb-8 gap-2">
        <Link // Changed link to Link
          to={"/"}
          className="flex items-center justify-center gap-2 text-txtPrimary" // Fixed typo in className
        >
          <FaHouse /> Home
        </Link>
        <p>/</p>
        <p>{data?.name}</p>
      </div>

      {/* main section layout */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12">
        {/*left section */}
        <div className="col-span-1 lg:col-span-8 flex flex-col items-start justify-start gap-4">
          {/*load the template image */}
          <img
            className="w-full h-auto object-contain rounded-md"
            src={data?.imageURL}
            alt=""
          />

          {/**title and other options */}
          <div className="w-full flex flex-col items-start justify-start gap-2">
            {/**title section */}
            <div className="w-full flex  items-center justify-between">
              {/**title */}
              <p className="text-base text-txtPrimary font-semibold">
                {data?.title}
              </p>
              {/**likes */}
              {data?.favourites?.length >= 0 && (
                <div className="flex items-center justify-center gap-1">
                  <BiSolidHeart className="text-base text-red-500" />
                  <p className="text-base text-txtPrimary font-semibold">
                    {data?.favourites?.length} likes
                  </p>
                </div>
              )}
            </div>

            {/**collection favourite options */}
            <div className="flex items-center justify-center gap-3">
              {user && (
                <>
                  {user?.collections?.includes(data?._id) ? (
                    <div
                      onClick={addToCollection}
                      className=" flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 gap-2 hover:bg-gray-200 cursor-pointer"
                    >
                      <BiSolidFolderPlus className="text-base text-txtPrimary" />
                      <p className="text-sm text-txtPrimary whitespace-nowrap">
                        Remove From Collections
                      </p>
                    </div>
                  ) : (
                    <div
                      onClick={addToCollection}
                      className=" flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 gap-2 hover:bg-gray-200 cursor-pointer"
                    >
                      <BiFolderPlus className="text-base text-txtPrimary" />
                      <p className="text-sm text-txtPrimary whitespace-nowrap">
                        Add To Collections
                      </p>
                    </div>
                  )}

                  {data?.favourites?.includes(user?.uid) ? (
                    <div
                      onClick={addToFavourites}
                      className=" flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 gap-2 hover:bg-gray-200 cursor-pointer"
                    >
                      <BiSolidHeart className="text-base text-txtPrimary" />
                      <p className="text-sm text-txtPrimary whitespace-nowrap">
                        Remove From Favourites
                      </p>
                    </div>
                  ) : (
                    <div
                      onClick={addToFavourites}
                      className=" flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 gap-2 hover:bg-gray-200 cursor-pointer"
                    >
                      <BiHeart className="text-base text-txtPrimary" />
                      <p className="text-sm text-txtPrimary whitespace-nowrap">
                        Add To Favourites
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/*right section */}
        <div className="col-span-1 lg:col-span-4 w-full flex flex-col items-center justify-start px-3 gap-6">
          {/**discover more section */}
          <div
            className="w-full h-72 bg-blue-200 rounded-md overflow-hidden relative"
            style={{
              background:
                "url(https://cdn.pixabay.com/photo/2023/10/04/03/04/ai-generated-8292699_1280.jpg)",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.4)]">
              <Link
                to={"/"}
                className="px-4 py-2 rounded-md border-2 border-gray-50 text-white"
              >
                Discover More
              </Link>
            </div>
          </div>
          <div>
            {user ? (
              <Link
                className="w-full px-4 py-3 rounded-md flex items-center justify-center bg-emerald-500 cursor-pointer"
                to={`/resume/${data?.name}?templateId=${templateID}`}
              >
                <p className="text-white font-semibold text-lg">
                  Edit this Template
                </p>
              </Link>
            ) : (
              <Link
                className="w-full px-4 py-3 rounded-md flex items-center justify-center bg-emerald-500 cursor-pointer"
                to="/auth"
              >
                <p className="text-white font-semibold text-lg">
                  Login to Edit this Template
                </p>
              </Link>
            )}
          </div>

          {/* tags */}
          <div className="w-full flex item-center justify-start flex-wrap gap-2">
            {data.tags?.map((tag, index) => (
              <p
                className="text-xs border border-gray-300 px-2 py-1 rounded-md whitespace-nowrap"
                key={index}
              >
                {tag}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* similar templates */}
      {templates?.filter((temp) => temp._id !== data?._id)?.length > 0 && (
        <div className="w-full py-8 flex-col items-start justify-start gap-4">
          <p className="text-lg font-semibold text-txtDark">
            You might also like
          </p>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2">
            <AnimatePresence>
              {templates
                ?.filter((temp) => temp._id !== data?._id)
                .map((template, index) => (
                  <TemplateDesignPin
                    key={template?._id}
                    data={template}
                    index={index}
                  />
                ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateDesignPinDetails;
