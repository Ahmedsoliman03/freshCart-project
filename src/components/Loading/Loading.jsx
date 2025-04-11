import React from "react";
import { useState } from "react";
import { DotLoader } from "react-spinners";

export default function LoadingScreen() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("");
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "black",
  };

  return (
    <>
      <div className="sweet-loading text-red-900 dark:text-yellow-400">
        <button onClick={() => setLoading(!loading)}> </button>
        {/* <input
          value={color}
          onChange={(input) => setColor(input.target.value)}
        /> */}

        <DotLoader
          loading={loading}
          cssOverride={override}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
          color="green"
          className="dark:text-yellow-400"
        />
      </div>
    </>
  );
}
