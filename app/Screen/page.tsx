"use client";

import { useContext } from "react";
import { ScreenContext } from "../page";

const Screen = () => {
  const { screenValue } = useContext(ScreenContext);

  return (
    <>
      <div className="h-20 bg-slate-300 rounded-lg p-4">{screenValue}</div>
    </>
  );
};

export default Screen;
