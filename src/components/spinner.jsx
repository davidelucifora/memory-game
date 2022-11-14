import React from "react";
import loading from "./../../public/loading.gif";
/** Loading Spinner to show until API data is fetched  */
export default function LoadingSpinner() {
  return (
    <div>
      <img src={loading} />
      <h2 className="green-accent-text">Loading...</h2>
    </div>
  );
}
