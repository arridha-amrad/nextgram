"use client";

import { Button, Input, Spacer } from "@nextui-org/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  username: z.string().min(1, { message: "username is required" }),
  password: z.string().min(1, { message: "password is required" }),
});

type LoginDto = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [loginError, setLoginError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
  } = useForm<LoginDto>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: LoginDto) => {
    try {
      setLoginError(null);
      await new Promise((res) => setTimeout(res, 3000));
      const result = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (result && result.status >= 400) {
        setLoginError(result.error);
      }
      if (result && result.status === 200) {
        router.replace("/home");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-4">
      <p className="text-center text-danger pb-2">{loginError}</p>
      <fieldset disabled={isSubmitting}>
        <Input
          {...register("username")}
          variant="flat"
          size="sm"
          type="text"
          label="username or email"
          isInvalid={!!errors.username?.message}
          errorMessage={errors.username?.message}
        />
        <Spacer y={2} />
        <Input
          {...register("password")}
          size="sm"
          variant="flat"
          label="password"
          errorMessage={errors.password?.message}
          isInvalid={!!errors.password?.message}
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
        />
        <Spacer y={4} />
        <Button
          type="submit"
          isDisabled={isLoading || isSubmitting}
          variant="solid"
          color="primary"
          fullWidth
        >
          Login
        </Button>
      </fieldset>
    </form>
  );
}
