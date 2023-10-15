import React, { createContext, useState } from "react";

const TrackedAddressContext = createContext();

const TrackedAddressProvider = ({ children }) => {
  const [trackedAddress, setTrackedAddress] = useState("");

  return (
    <TrackedAddressContext.Provider
      value={{ trackedAddress, setTrackedAddress }}
    >
      {children}
    </TrackedAddressContext.Provider>
  );
};

export { TrackedAddressContext, TrackedAddressProvider };
