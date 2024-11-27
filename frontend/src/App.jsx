import React from "react";
import "./App.css";
import Home from "./Pages/Home";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="">
      <Toaster position="top-center" reverseOrder={false} />
      <Home />
    </div>
  );
}

export default App;
