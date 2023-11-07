"use client";

import { useState } from "react";
import { useWindowSize } from "./useWindowSize";

export default function ProfileData() {
  useWindowSize();
  const [state, setState] = useState(0);
  return (
    <div>
      <h1>Profile data</h1>
    </div>
  );
}
