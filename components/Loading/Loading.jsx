import React from "react";
import { useState } from "react";
import { DotLoader } from "react-spinners";

export default function LoadingScreen() {
  let [loading] = useState(true); // Removed unused setLoading
  const override = {
    display: "block",
    margin: "0 auto",
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <DotLoader
        loading={loading}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
        color="#FF9900" // Amazon orange color
        className="dark:text-yellow-400"
      />
    </div>
  );
}
