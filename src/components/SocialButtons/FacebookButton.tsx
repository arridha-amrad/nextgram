"use client";

import SvgFacebook from "../svg/SvgFacebook";

const FacebookButton = () => {
  return (
    <button className="border-skin-border text-skin-muted inline-flex items-center gap-3 rounded-md border px-3 py-2">
      <SvgFacebook /> facebook
    </button>
  );
};

export default FacebookButton;
