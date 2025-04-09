"use client";

import ButtonLink from "../ButtonLink";
import { useSidebarContext } from "../Context";
import { NewPostIcon } from "../Icons";

function NewPost() {
  const { setSmallSidebar } = useSidebarContext();
  return (
    <ButtonLink
      activeIcon={<NewPostIcon />}
      icon={<NewPostIcon />}
      callback={() => setSmallSidebar((val) => !val)}
      label="New Post"
    />
  );
}

export default NewPost;
