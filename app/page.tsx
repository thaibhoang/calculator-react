"use client";
import { createContext } from "react";
import Numbers from "./numbers/page";
import Screen from "./Screen/page";
import { useState } from "react";

interface ScreenContextType {
  screenValue: string;
  setScreenValue: React.Dispatch<React.SetStateAction<string>>;
}

export const ScreenContext = createContext<ScreenContextType>(
  {} as ScreenContextType
);

export default function Home() {
  const [screenValue, setScreenValue] = useState<string>("");

  return (
    <div className="flex justify-center items-center md:min-h-[700px]">
      <div className="pt-4">
        <ScreenContext.Provider value={{ screenValue, setScreenValue }}>
          <Screen></Screen>
          <Numbers></Numbers>
        </ScreenContext.Provider>
      </div>
    </div>
  );
}
