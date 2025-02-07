"use client";

import { FeedPost, useFeedPosts } from "@/app/(auth)/(home)/store";
import Button from "@/components/core/Button";
import { cn, showToast } from "@/lib/utils";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { useCreatePost } from "./CreatePostContext";
import { useUserPosts } from "@/app/(auth)/[username]/store";
import { useParams } from "next/navigation";
import { Session } from "next-auth";
import { createPostActionRevalidate } from "./action";

type Props = {
  user: Session["user"];
};

const FormCreatePost = ({ user }: Props) => {
  const { step, files, setSubmitSuccessful, isSubmitSuccessful } =
    useCreatePost();
  const { addPost } = useFeedPosts();
  const { addPost: addUserPost } = useUserPosts();

  const params = useParams();

  const [state, setState] = useState({
    location: "",
    description: "",
  });

  const [isLoading, startTransition] = useTransition();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const formData = new FormData();
      formData.append("description", state.description);
      formData.append("location", state.location);
      files.forEach((file) => formData.append("images", file));
      const response = await fetch("/api/post", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const data = await response.json();
        if (data.message) {
          showToast(data.message, "error");
        }
      } else {
        const data = await response.json();
        showToast(data.message, "success");
        const newPost = data.post as FeedPost;
        addPost(newPost);
        if (params.username && params.username === user.username) {
          addUserPost({
            id: newPost.id,
            createdAt: newPost.createdAt,
            sumComments: 0,
            sumLikes: 0,
            urls: newPost.urls,
          });
        }
        setSubmitSuccessful(true);
      }
    });
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      createPostActionRevalidate();
    }
  }, [isSubmitSuccessful]);

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex w-full max-w-sm flex-col p-2", step < 1 && "hidden")}
    >
      <fieldset disabled={isLoading} className="flex-1 space-y-3">
        <textarea
          value={state.description}
          onChange={(e) =>
            setState({
              ...state,
              description: e.target.value,
            })
          }
          name="description"
          placeholder="how you describe this post?"
          className="bg-skin-input focus:ring-skin-primary mt-2 w-full resize-none rounded-lg border-transparent p-4 align-top shadow-xs outline-0 focus:border-transparent focus:ring-2"
          rows={5}
        ></textarea>

        <input
          value={state.location}
          onChange={(e) =>
            setState({
              ...state,
              location: e.target.value,
            })
          }
          name="location"
          placeholder="location"
          className="bg-skin-input focus:ring-skin-primary w-full rounded-md border-transparent p-4 outline-0 focus:border-transparent focus:ring-2"
        />
      </fieldset>
      <Button
        isLoading={isLoading}
        className="inline-flex w-full justify-center"
        type="submit"
      >
        Create Post
      </Button>
    </form>
  );
};

export default FormCreatePost;
