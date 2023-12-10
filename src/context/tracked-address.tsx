import React, {
  ReactNode,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface TrackedAddressContextProps {
  trackedAddress: string;
  setTrackedAddress: Dispatch<SetStateAction<string>>;
}

interface TrackedAddressProviderProps {
  children: ReactNode;
}

const TrackedAddressContext = createContext<TrackedAddressContextProps>(
  {} as TrackedAddressContextProps
);

const TrackedAddressProvider: React.FC<TrackedAddressProviderProps> = ({
  children,
}: TrackedAddressProviderProps) => {
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
