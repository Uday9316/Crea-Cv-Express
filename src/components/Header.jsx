import React, { useState } from "react";
import useUser from "../hooks/useUser";
import { Link } from "react-router-dom";
import { Logo } from "../assets";
import { AnimatePresence, motion } from "framer-motion";
import { ScaleLoader } from "react-spinners";
import { HiLogout } from "react-icons/hi";
import { FadeInOutWIthOpacity, slideUpDownMenu } from "../animations/index";
import { useQueryClient } from "react-query";
import { auth } from "../config/firebase.config";
import { adminIds } from "../utils/helpers";
import useFilters from "../hooks/useFilters"; 

const Header = () => {
  const { data, isLoading, isError } = useUser();
  const [isMenu, setIsMenu] = useState(false);
  const queryClient = useQueryClient();

  const { data: filterData } = useFilters();

  const signOutUser = async () => {
    await auth.signOut().then(() => {
      queryClient.setQueryData("user", null);
    });
  };

  const handleSearchTerm = (e) => {
    queryClient.setQueryData("globalFilter", {
      ...queryClient.getQueryData("globalFilter"),
      searchTerm: e.target.value,
    });
  };

  const clearFilter = () => {
    queryClient.setQueryData("globalFilter", {
      ...queryClient.getQueryData("globalFilter"),
      searchTerm: "",
    });
  };

  return (
    <header className="w-full flex items-center justify-between px-4 py-3 lg:px-8 border-b border-gray-300 bg-bright z-50 gap-12 sticky top-0">
      <div className="flex items-center flex-grow">
        <Link to={""}>
          <img src={Logo} className="w-12 h-auto object-contain" alt="" />
        </Link>

        <div className="border border-gray-300 px-2 py-1 rounded-md flex items-center bg-gray-200 ml-4 flex-grow">
          <input
            value={filterData?.searchTerm ? filterData?.searchTerm: ""}
            onChange={handleSearchTerm}
            type="text"
            placeholder="Search..."
            className="flex-1 h-10 bg-transparent text-sm font-semibold outline-none border-none px-2 w-full"
          />
          <AnimatePresence>
            {filterData?.searchTerm && filterData.searchTerm.length > 0 && (
              <motion.div
                onClick={clearFilter}
                {...FadeInOutWIthOpacity}
                className="w-8 h-8 flex items-center justify-center bg-gray-300 rounded-md cursor-pointer active:scale-95 duration-150"
              >
                <p className="text-2xl text-black">x</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center">
        <AnimatePresence>
          {isLoading ? (
            <ScaleLoader color="#C4C3CF" size={40} />
          ) : (
            <React.Fragment>
              {data ? (
                <motion.div
                  className="relative"
                  onClick={() => setIsMenu(!isMenu)}
                >
                  {data?.photoURL ? (
                    <div className="w-12 h-12 rounded-md relative flex items-center justify-center cursor-pointer">
                      <img
                        src={data?.photoURL}
                        className="w-full h-full object-cover rounded-md"
                        referrerPolicy="no-referrer"
                        alt=""
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-md relative flex items-center justify-center bg-blue-700 shadow-md cursor-pointer">
                      <p className="text-lg text-white">{data?.email[0]}</p>
                    </div>
                  )}

                  {/* Drop down */}
                  <AnimatePresence>
                    {isMenu && (
                      <motion.div
                        {...slideUpDownMenu}
                        className="absolute px-4 py-3 rounded-md bg-white right-0 top-14
                                     flex flex-col items-center justify-start gap-3 w-64 pt-12"
                        onMouseLeave={() => setIsMenu(false)}
                      >
                        {data?.photoURL ? (
                          <div
                            className="w-20 h-20 rounded-full relative flex items-center flex-col
                                            justify-center cursor-pointer"
                          >
                            <img
                              src={data?.photoURL}
                              className="w-full h-full object-cover rounded-full"
                              referrerPolicy="no-referrer"
                              alt=""
                            />
                          </div>
                        ) : (
                          <div className="w-20 h-20 rounded-md relative flex items-center justify-center bg-blue-700 shadow-md cursor-pointer">
                            <p className="text-3xl text-white">
                              {data?.email[0]}
                            </p>
                          </div>
                        )}
                        {data?.displayName && (
                          <p className="text-lg text-txtDark">
                            {data.displayName}
                          </p>
                        )}

                        {/* Menu */}
                        <div className="w-full flex-col items-start flex gap-8 pt-6">
                          <Link
                            className="text-txtLight hover:text-txtDark text-base"
                            to={`/profile/${data?.uid}`}
                          >
                            My Account
                          </Link>
                          {adminIds.includes(data?.uid) && (
                            <Link
                              className="text-txtLight hover:text-txtDark text-base"
                              to={"/template/create"}
                            >
                              Add New Template
                            </Link>
                          )}
                          <div
                            className="w-full px-2 py-2 border-t border-gray-300 flex items-center justify-between group cursor-pointer "
                            onClick={signOutUser}
                          >
                            <motion.p
                              whileHover={{ scale: 1.1, color: "#1E40AF" }}
                              whileTap={{ scale: 0.9 }}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.5, ease: "easeInOut" }}
                              className="group-hover:text-txtDark text-txtLight"
                            >
                              Sign Out
                            </motion.p>
                            <HiLogout className="group-hover:text-txtDark text-txtLight" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <Link to={"/auth"}>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="login-button"
                  >
                    Login
                  </motion.button>
                </Link>
              )}
            </React.Fragment>
          )}
        </AnimatePresence>

        {data && (
          <div className="ml-4">
            {data?.displayName ? (
              <p className="text-sm text-txtDark">{data.displayName}</p>
            ) : (
              <p className="text-sm text-txtDark">{data.email}</p>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
