import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { Blog } from "./Pages/Blog";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Blogs from "./Pages/Blogs";
import Publish from "./Pages/Publish";
import Home from "./Pages/Home";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/blog/:id" element={<Blog />}></Route>
          <Route path="/blogs" element={<Blogs />}></Route>
          <Route path="/publish" element={<Publish />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
