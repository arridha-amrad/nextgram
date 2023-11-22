"use client";

import { Button, Input, Spacer } from "@nextui-org/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import OtherLinks from "./OtherLinks";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const signUpSchema = z.object({
  email: z
    .string()
    .min(1, { message: "email is required" })
    .email({ message: "invalid email" }),
  fullName: z.string().min(1, { message: "full name is required" }),
  username: z
    .string()
    .trim()
    .min(1, { message: "username is required" })
    .min(5, { message: "username is too short" })
    .max(20, { message: "username is too long" })
    .refine((s) => !s.startsWith("_"), {
      message: "username cannot start with underscore",
    }),
  password: z.string().trim().min(1, { message: "password is required" }),
});

type SignUpDto = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting, isSubmitSuccessful },
  } = useForm<SignUpDto>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpDto) => {
    const { email, fullName, password, username } = data;
    console.log(data);
    try {
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {isSubmitSuccessful && (
        <div className="w-full my-2 bg-green-100 dark:bg-green-200 rounded-lg p-2">
          <p className="text-green-700 text-center">
            Registration is successful
          </p>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          errorMessage={errors.email?.message}
          isInvalid={!!errors.email?.message}
          {...register("email")}
          variant="flat"
          size="sm"
          type="text"
          label="Email"
        />
        <Spacer y={2} />
        <Input
          errorMessage={errors.fullName?.message}
          isInvalid={!!errors.fullName?.message}
          {...register("fullName")}
          variant="flat"
          size="sm"
          type="text"
          label="FullName"
        />
        <Spacer y={2} />
        <Input
          errorMessage={errors.username?.message}
          isInvalid={!!errors.username?.message}
          {...register("username")}
          variant="flat"
          size="sm"
          type="text"
          label="Username"
        />
        <Spacer y={2} />
        <Input
          errorMessage={errors.password?.message}
          isInvalid={!!errors.password?.message}
          {...register("password")}
          size="sm"
          variant="flat"
          label="Password"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashIcon className="h-6 w-6 pointer-events-none" />
              ) : (
                <EyeIcon className="h-6 w-6 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className="focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent"
        />{" "}
        <OtherLinks />
        <Button
          type="submit"
          isLoading={isLoading || isSubmitting}
          className="font-semibold"
          isDisabled={isLoading || isSubmitting}
          variant="solid"
          color="primary"
          fullWidth
        >
          Sign Up
        </Button>
      </form>
    </>
  );
}
