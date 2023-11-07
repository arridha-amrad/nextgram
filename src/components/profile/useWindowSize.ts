"use client";

import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const [state, setState] = useState(0);

  useEffect(() => {
    const width = window.innerWidth;
    console.log({ width });
  }, []);
};
