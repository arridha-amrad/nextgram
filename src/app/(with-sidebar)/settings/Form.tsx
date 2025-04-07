"use client";

import AvatarEditable from "@/components/AvatarEditable";
import Button from "@/components/core/Button";
import TextInput from "@/components/core/TextInput";
import { TProfileDetail } from "@/lib/drizzle/queries/users/fetchUserProfileDetails";
import { showToast } from "@/lib/utils";
import { useAction } from "next-safe-action/hooks";
import { usePathname } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import { updateProfile } from "./action";
import { useUpdateSession } from "@/hooks/useUpdateSession";

type Props = {
  user: TProfileDetail;
  fullName: string;
};

const FormEditProfile = ({ user, fullName }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [state, setState] = useState({
    name: fullName,
    website: user?.website ?? "",
    occupation: user?.occupation ?? "",
    bio: user?.bio ?? "",
    gender: user?.bio ?? "",
  });

  const pathname = usePathname();

  const { execute, isPending, result, hasSucceeded } = useAction(
    updateProfile.bind(null, pathname),
    {
      async onSuccess({ data }) {
        if (data) {
          showToast("Update successful", "success");
        }
      },
    },
  );

  useUpdateSession(hasSucceeded, { name: result.data?.name });

  const bioError = result.validationErrors?.bio?._errors;
  const genderError = result.validationErrors?.gender?._errors;
  const nameError = result.validationErrors?.name?._errors;
  const occupationError = result.validationErrors?.occupation?._errors;
  const websiteError = result.validationErrors?.website?._errors;
  const actionError = result.serverError;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="relative w-full max-w-md space-y-6">
      <div className="flex items-center justify-center gap-6">
        <div className="">
          <AvatarEditable
            ref={inputRef}
            className="w-20 lg:w-20"
            avatar={user?.avatar}
          />
        </div>
        <button
          onClick={() => inputRef.current?.click()}
          className="text-skin-inverted font-semibold"
        >
          Change Avatar
        </button>
      </div>
      <form action={execute}>
        <fieldset className="flex flex-col gap-6" disabled={isPending}>
          {actionError && (
            <p className="text-sm text-red-500">{actionError[0]}</p>
          )}
          <TextInput
            errorMessage={nameError && nameError[0]}
            onChange={handleChange}
            value={state.name}
            label="Fullname"
            variant="normal"
            type="text"
            id="fullName"
            name="name"
          />
          <TextInput
            errorMessage={websiteError && websiteError[0]}
            onChange={handleChange}
            value={state.website}
            label="Website"
            variant="normal"
            type="text"
            id="website"
            name="website"
          />
          <TextInput
            errorMessage={occupationError && occupationError[0]}
            onChange={handleChange}
            value={state.occupation}
            label="Occupation"
            variant="normal"
            type="text"
            id="occupation"
            name="occupation"
          />
          <div className="space-y-1.5">
            <label
              htmlFor="bio"
              className="text-skin-base block text-sm font-medium"
            >
              Bio
            </label>
            <textarea
              name="bio"
              id="bio"
              rows={2}
              defaultValue={user?.bio ?? ""}
              className="border-skin-border bg-skin-input focus:ring-skin-primary ring-skin-primary w-full resize-none rounded-md border p-2 outline-hidden focus:ring-2"
            ></textarea>
            {bioError && (
              <div className="text-skin-error">
                <small>{bioError[0]}</small>
              </div>
            )}
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="gender"
              className="text-skin-base block text-sm font-medium"
            >
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              defaultValue={user?.gender ?? ""}
              className="border-skin-border bg-skin-input focus:ring-skin-primary w-full rounded-md border p-2 outline-hidden focus:ring-2"
            >
              <option value="">Please select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {genderError && (
              <div className="text-skin-error">
                <small>{genderError[0]}</small>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 self-end">
            <Button type="submit" className="w-24" isLoading={isPending}>
              Save
            </Button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default FormEditProfile;
