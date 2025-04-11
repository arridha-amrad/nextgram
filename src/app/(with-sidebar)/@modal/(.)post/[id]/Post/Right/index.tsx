"use client";

import SomeActions from "./Actions";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import PostDate from "./Date";
import Description from "./Description";
import Header from "./Header";
import Likes from "./TotalLikes";

const PostExpanded = () => {
  return (
    <div className="bg-background border-foreground/10 flex w-[500px] shrink-0 flex-col border-l">
      <Header />
      <hr className="border-foreground/10" />
      <section className="flex flex-1 basis-0 flex-col items-start overflow-y-auto p-4">
        <Description />
        <Comments />
      </section>
      <hr className="border-foreground/10" />
      <SomeActions />
      <Likes />
      <PostDate />
      <hr className="border-foreground/10" />
      <CommentForm />
    </div>
  );
};

export default PostExpanded;
