import { Route, Routes } from "react-router-dom";

import React, { Suspense, lazy } from "react";
import Loader from "./components/Loader/Loader";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Compiler = lazy(() => import("./pages/Compiler"));
const AllCodes = lazy(() => import("./pages/AllCodes"));
const MyCodes = lazy(() => import("./pages/MyCodes"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AllRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="w-full h-[calc(100dvh-60px)] flex justify-center items-center">
          <Loader />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/all-codes" element={<AllCodes />} />
        <Route path="/my-codes" element={<MyCodes />} />
        <Route path="/compiler/:urlId?" element={<Compiler />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AllRoutes;
